<template>
  <el-dialog
    title="抓住神经猫"
    :visible.sync="visible.game_gridCat"
    width="600px"
    height="600px"
    :modal='false'
    modal-append-to-body>
    <p style='color:red'>通过点击它周围的格子来创建障碍。 抓住它！</p>
    难度: &nbsp;&nbsp;&nbsp;
    <el-radio :disabled="!canChancediffi" v-model="difficulty" label="1">简单</el-radio>
    <el-radio :disabled="!canChancediffi" v-model="difficulty" label="2">普通</el-radio>
    <el-radio :disabled="!canChancediffi" v-model="difficulty" label="3">困难</el-radio>
    &nbsp;&nbsp;&nbsp;
    <el-button type='text' @click='clearScene'>重新开始</el-button>
    <div id="gridCat" style='cursor: pointer;'>

    </div>
  </el-dialog>
</template>

<script>

import * as THREE from 'three'
export default {
  props: ['visible'],
  data(){
    return {
      scene: null, // 场景
      ground: null, // 底板
      renderer: null, // 渲染器
      camera: null, // 相机
      cat: null, // 神经猫
      catIndex: 0.2, // 神经猫和障碍在场景中的层级， 底板层级为0， 格子grid层级为0.1
      gridNum: 11, // 格子数 n*n
      initObsNum: 4, // 初始障碍数量
      obsS: [], // 障碍集合
      canChancediffi: true,
      obsPositionS: [], // 已经有障碍的坐标的集合
      catImg: require('@/assets/images/cat.png'), // 神经猫的头像
      obsImg: require('@/assets/images/obs.png'), // 障碍的图像
      obsImgTexture: null,
      difficulty: '2',
      // 不同难度下神经猫的行动逻辑
      difficultyFn:{
        '1': this.simpleRules,
        '2': this.difficultRules,
        '3': this.trappedRules
      },
      raycaster: null, // 点击事件用，点击线
      mouse: null, // 点击事件用，点击对象
      canClick: true, // 不能频繁点击
    }
  },
  watch: {
    difficulty(nv, ov) {
      if (nv === '3') { 
        this.initObsNum = 20
        this.clearScene()
      } else { 
        this.initObsNum = 4
        this.clearScene()
      }
    }
  },
  methods: {
    // 创建画布和场景，添加游戏底板
    initCanvas(){
      // 创建场景
      var scene = this.scene = new THREE.Scene()
      // 创建一个相机, 相机的视锥体的垂直视野角,相机视锥体的长宽比,相机视锥体的近平面,相机视锥体的远平面
      var camera = this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)   
      // 创建渲染器
      var renderer = this.renderer = new THREE.WebGLRenderer()

      renderer.setSize(560, 500) //画布宽高
      
      document.querySelector('#gridCat').appendChild(renderer.domElement)

      var ground = this.ground = new THREE.Mesh(new THREE.PlaneGeometry(this.gridNum,this.gridNum), new THREE.MeshBasicMaterial({color: 0x088080})) // 添加底板
      ground.name = 'ground'
      scene.add(ground) // 把底板加到场景中
      
      camera.position.set(0, 0, Math.floor(this.gridNum / 1.3)) // 相机高度为7
      camera.lookAt(new THREE.Vector3(0,0,0))
      // 创建格子
      this.initGrid()
      // 创建神经猫
      this.initCat()
      // 初始化障碍
      this.initObs()
      this.reRender()
      // 监听点击事件
      this.raycaster = new THREE.Raycaster() //光线投射，用于确定鼠标点击位置
      this.mouse = new THREE.Vector2() //创建二维平面
      renderer.domElement.addEventListener('mousedown', this.onDocumentMouseDown, false)
    },
    // 画布会不停的渲染，就不用去操心更新视图了
    reRender(){
      requestAnimationFrame(this.reRender) // 浏览器刷新，1s刷新60次
      // this.camera.rotation.x += 0.01
      // this.camera.rotation.y += 0.01
      this.renderer.render(this.scene, this.camera)
    },
    // 创建格子
    initGrid(){
      // 创建几何体
      let GridPropPlane = new THREE.PlaneGeometry(0.9,0.9)
      // 创建材质
      let GridPropBasic = new THREE.MeshBasicMaterial({color: 0xffffff})
      // 循环给底板铺上格子
      for (let i = (-this.gridNum + 1) / 2; i < (this.gridNum + 1) / 2; i += 1) {
        for (let j = (-this.gridNum + 1) / 2; j < (this.gridNum + 1) / 2; j += 1) {
          // 创建单个格子
          let grid = new THREE.Mesh(GridPropPlane, GridPropBasic)
          grid.name = 'grid'
          grid.position.set(i, j, 0.1)
          this.scene.add(grid)
        }
      }
    },
    // 创建神经猫
    initCat(){
      var geometry = new THREE.CircleGeometry(0.4)
      new THREE.TextureLoader().load(this.catImg, texture => {
        var cat = this.cat =  new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture }))
        cat.position.set(0, 0, this.catIndex)
        this.scene.add(cat) // 把神经猫加到场景中
      })
    },
    // 初始化障碍
    initObs(){
      this.obsS = []
      let that = this
      
      // 加载障碍图标
      for(let i = 0; i < that.initObsNum; i ++) {
        let geometry = new THREE.CircleGeometry(0.4)
        // 创建障碍
        let obs  =  new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: that.obsImgTexture }))
        this.obsS.push(obs)
        // 随机坐标
        getPosition(obs)
        obs.position.set(...obs.positionZ)
        that.scene.add(obs) // 把障碍加到场景中
      }
      // 获取随机坐标
      function getPosition(obs){
        let position = Math.ceil(
          Math.random() * that.gridNum - Math.ceil(that.gridNum / 2)) 
          + '~' 
          + Math.ceil(Math.random() * that.gridNum - Math.ceil(that.gridNum / 2)
        )
        if(that.obsPositionS.indexOf(position) === -1 && position !== '0~0') {
          that.obsPositionS.push(position)
          obs.positionZ = [...position.split('~').map(item => item), that.catIndex]
        } else {
          getPosition(obs)
        }
      }
    },
    // 清除场景，重新开始
    clearScene(){
      this.cat.position.set(0,0,this.catIndex)
      this.canClick = true
      this.canChancediffi = true
      this.obsPositionS = []
      this.obsS.forEach(item => {
        this.scene.remove(item)
      })
      this.initObs()
      // 有可能初始化之后直接获胜
      if(
        this.isGameOver()
      ) {
        this.$emit('showMessage', ' 天..天..天..天胡？？？', 4000, 9)
        this.$message.success('获胜！')
        this.canClick = false
      }
    },
    // 监听点击事件
    onDocumentMouseDown(event){
      let that = this
      if ( that.canClick === false) return
      that.canClick = false
      // 阻止冒泡
      event.preventDefault()
      // 将html坐标转换成webgl坐标系
      this.mouse.x = event.offsetX / this.renderer.domElement.clientWidth * 2 - 1
      this.mouse.y = - (event.offsetY / this.renderer.domElement.clientHeight * 2) + 1
      // 修改射线的位置和方向，重新发射，得到经过的对象，即点击的场景对象
      this.raycaster.setFromCamera(this.mouse, this.camera)
      var intersects = this.raycaster.intersectObjects(this.scene.children)
      // 如果射线只经过了两个对象，就代表只经过了空格子和底板
      if (intersects.length == 2 && isHasPosition(intersects[0].object.position)) {
        // 不可以修改难度了
        that.canChancediffi = false
        let position = intersects[0].object.position
        let geometry = new THREE.CircleGeometry(0.4)
        let obs  =  new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: that.obsImgTexture }))
        obs.position.set(position.x, position.y, this.catIndex)
        that.obsPositionS.push(position.x + '~' + position.y)
        that.obsS.push(obs)
        that.scene.add(obs)
        // 是否获胜
        if(
          that.isGameOver()
        ) {
          this.$emit('showMessage', ' 恭喜恭喜~', 4000, 9)
          this.$message.success('获胜！')
          that.canClick = false
          return 
        }
        that.canClick = true
        // 执行逻辑
        this.difficultyFn[this.difficulty]()
      } else {
        that.canClick = true
      }
      
      // 检索该坐标是否可以添加障碍
      function isHasPosition(position){
        // 不能和神经猫的位置重合
        if (that.cat.position.x === position.x && that.cat.position.y === position.y)  return false
        position = position.x + '~' + position.y
        // 是否已经有障碍了
        if (that.obsPositionS.indexOf(position) > -1) return false
        return true
      }
    },
    // 简单模式下的神经猫逻辑: 周围随机选一格走
    simpleRules(){
      let that = this
      let {x,y} = that.cat.position
      let [x1,x2,y1,y2] = [x - 1, x + 1, y - 1 ,y + 1]
      // 四周的坐标
      let possiblePositionS = [[x1, y], [x2, y], [x, y1], [x, y2]]
      let possiblePositionStr = possiblePositionS.map(item => item.join('~'))
      // 没有障碍的坐标
      let canPositons = possiblePositionStr.filter(item => that.obsPositionS.indexOf(item) === -1).map(item => item.split('~'))
      // 随机选择一个坐标走
      let nextPosition = canPositons[Math.floor(Math.random() * canPositons.length)]
      that.cat.position.set(nextPosition[0] - 0, nextPosition[1] - 0, this.catIndex)
      this.islose()
    },
    // 普通模式下的神经猫逻辑： bfs广度搜索，走最短路径
    difficultRules(){
      let that = this
      let {x,y} = that.cat.position
      let obsPositionS = [...this.obsPositionS, x + '~' + y] // 已经搜索过或者不用搜索的坐标
      let visite = [x + '~' + y] // 搜索过程储存
      let results = [] // 最后得出神经猫可以走的最短路径的集合
      let states = false // 是否结束搜索
      let quene = [[x,y]] // 搜索队列
      // bfs逻辑
      while (quene.length && !states) {
        let len = quene.length
        for (let i = 0; i < len; i++) {
          let position = quene.shift()
          let path = visite.shift()
          let [x,y] = [...position]
          if (Math.abs(x) === Math.floor(this.gridNum / 2) || Math.abs(y) === Math.floor(this.gridNum / 2)) {
            // 如果已经到了边界，那么后面级别的坐标就不用搜索了，就搜索到这级为止
            states = true
            results.push(path)
            continue
          }
          let [x1,x2,y1,y2] = [x - 1, x + 1, y - 1 ,y + 1]
          let possiblePositionS = [[x1, y], [x, y1], [x2, y], [x, y2]]
          // 四周的坐标
          for (let i = 0; i < possiblePositionS.length; i ++) {
            let item = possiblePositionS[i]
            let itemArr = item.join('~')
            if (obsPositionS.indexOf(itemArr) === -1) {
              quene.push(item) // 把周围没有搜索过的坐标加入搜索队列
              visite.push(path + '=>' + itemArr)
              obsPositionS.push(itemArr)
            }
          }
        }
      }
      if(results.length) {
        // 从搜索结果随机选一条路往下走
        let nextPosition = results[Math.floor(Math.random() * results.length)].split('=>')[1].split('~')
        this.cat.position.set(nextPosition[0] - 0, nextPosition[1] - 0, this.catIndex)
        this.islose()
      } else {
        this.$emit('showMessage', ' 恭喜恭喜~', 4000, 9)
        this.$message.success('获胜！')
        this.canClick = false
      }
    },
    // 困难模式下的神经猫逻辑： 神经猫会向斜角的格子走了
    trappedRules(){
      let that = this
      let {x,y} = that.cat.position
      let obsPositionS = [...this.obsPositionS, x + '~' + y] // 已经搜索过或者不用搜索的坐标
      let visite = [x + '~' + y] // 搜索过程储存
      let results = [] // 最后得出神经猫可以走的最短路径的集合
      let states = false // 是否结束搜索
      let quene = [[x,y]] // 搜索队列
      // bfs逻辑
      while (quene.length && !states) {
        let len = quene.length
        for (let i = 0; i < len; i++) {
          let position = quene.shift()
          let path = visite.shift()
          let [x,y] = [...position]
          if (Math.abs(x) === Math.floor(this.gridNum / 2) || Math.abs(y) === Math.floor(this.gridNum / 2)) {
            // 如果已经到了边界，那么后面级别的坐标就不用搜索了，就搜索到这级为止
            states = true
            results.push(path)
            continue
          }
          let [x1,x2,y1,y2] = [x - 1, x + 1, y - 1 ,y + 1]
          let possiblePositionS = [[x1, y], [x1, y1],  [x, y1], [x2, y1], [x2, y], [x2, y2], [x, y2], [x1, y2]]
          // 四周的坐标
          for (let i = 0; i < possiblePositionS.length; i ++) {
            let item = possiblePositionS[i]
            let itemArr = item.join('~')
            if (obsPositionS.indexOf(itemArr) === -1) {
              quene.push(item) // 把周围没有搜索过的坐标加入搜索队列
              visite.push(path + '=>' + itemArr)
              obsPositionS.push(itemArr)
            }
          }
        }
      }
      if(results.length) {
        // 从搜索结果随机选一条路往下走
        let nextPosition = results[Math.floor(Math.random() * results.length)].split('=>')[1].split('~')
        this.cat.position.set(nextPosition[0] - 0, nextPosition[1] - 0, this.catIndex)
        this.islose()
      } else {
        this.$emit('showMessage', ' 恭喜恭喜~', 4000, 9)
        this.$message.success('获胜！')
        this.canClick = false
      }
    },
    // 是否获胜
    isGameOver(){
      let that = this
      let {x,y} = that.cat.position
      let [x1,x2,y1,y2] = [x - 1, x + 1, y - 1 ,y + 1]
      let aroundPosition = this.difficulty != '3' ?
        [[x1, y], [x, y1], [x2, y], [x, y2]] : [[x1, y], [x1, y1],  [x, y1], [x2, y1], [x2, y], [x2, y2], [x, y2], [x1, y2]]
      if(aroundPosition.find(
          item => that.obsPositionS.indexOf(item.join('~')) === -1
        ) === undefined
      ) {
        return true
      }
    },
    // 是否失败
    islose(){
      let x = this.cat.position.x
      let y = this.cat.position.y
      if (Math.abs(x) === Math.floor(this.gridNum / 2) || Math.abs(y) === Math.floor(this.gridNum / 2)) {
        this.$emit('showMessage', '再来一次吧，加油~', 4000, 9)
        this.$message.info('失败！')
        this.canClick = false
        return 
      }
    }
  },
  mounted(){
    new THREE.TextureLoader().load(this.obsImg, texture => {
      this.obsImgTexture = texture
      this.$nextTick(this.initCanvas)
    })
  }
}
</script>

<style lang='stylus' scoped>


</style>