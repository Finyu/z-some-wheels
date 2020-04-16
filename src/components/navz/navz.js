export default {
  data(){
    return {
    }
  },
  props: ['routerData'],
  render:function(creatElement){
    let that = this
    // 渲染子路由导航
    function itemRenter(route){
      return route.map(item => {
        return creatElement(
          'section',
          {
            class: 'Z-nav-section'
          },
          [
            creatElement(
              'p',
              {
                class: 'Z-nav-title'
              },
              item.label
            ),
            item.children && item.children.length 
            && item.children.map(todo => {
              return creatElement(
                'p',
                {
                  class: 'Z-nav-common',
                  style: {
                    'width': '220px',
                  },
                  on: {
                    click: () => {that.handleSelect(todo.path)}
                  }
                },
                todo.label
              )
            })
          ]
        )
      })
    }
    // 渲染路由父组件容器
    return creatElement(
      'div',
      {
        class: 'Z-leftTree',
        style: {
          'width': '220px',
        },
      },
      [
        itemRenter(this.routerData)
      ]
    )
  },
  methods: {
    handleSelect(key, v){
      this.$router.push(key)
    }
  },
  mounted () {

  }
}