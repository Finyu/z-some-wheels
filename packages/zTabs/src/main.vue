<script>
import pane from './tab-pane.vue'
export default {
  name: 'z-tabs',
  props: {
  },
  data(){
    return {
      name: 'first',
      attrs: [],
      shouldStretch: false,
      contents: [],
      soltContent: null
    }
  },
  watch:{
    '$attrs.value' (nv){
      this.name = nv
    }
  },
  components: {
    pane
  },
  methods: {
    tabClick(item){
      this.name = item.name
      this.$emit('tabClick', item.name)
      this.$emit('input', item.name)
      this.$nextTick(this.setBottom)
    },
    // 计算底部active线条位置 
    setBottom() {
      let el = this.$el
      el = el.getElementsByClassName('z-tabs-title-name active')[0]
      let solid = this.$el.getElementsByClassName('z-tabs-title-bottom')[0]
      solid.setAttribute('style', `width: ${el.offsetWidth}px; left: ${el.offsetLeft}px`)
    },
    // 检查标签宽度总和是否超过父元素的宽度
    checkWidth(){
      this.shouldStretch = false
      let boxFather = this.$el.getElementsByClassName('z-tabs-title')[0]
      let box = this.$el.getElementsByClassName('z-tabs-title-box')[0]
      if (boxFather.offsetWidth < box.offsetWidth) {
        this.shouldStretch = true
      }
      this.setBottom()
    },
    init(){
      let contents = []
      let attrs = this.$slots.default.filter(
        item => item.tag && item.tag.indexOf('z-tab-pane') > -1
      )
      this.soltContent = attrs.find(item => item.data.attrs.name === this.name)

      if (attrs.length === this.attrs.length &&
        attrs.every((item, index) => item.key === this.attrs[index].key)
      ) {
        // 防止进入updata的死循环
        return
      }
      this.attrs = attrs.map(item => { return {name: item.data.attrs.name, label: item.data.attrs.label, key: item.key} })
      this.$nextTick(this.checkWidth)
    }
  },
  created() {
    this.name = this.$attrs.value
    this.init()
  },
  updated(){
    this.init()
  },
  render(h) {
    let that = this
    return h(
      'div',{
        class: 'z-tabs'
      },
      [
        h(
          'div',
          {
            class: 'z-tabs-title'
          },
          [
            h(
              'div',
              {
                class: 'z-tabs-title-box'
              },
              that.attrs.map(item => h(
                'span',
                {
                  on: { 
                    click: () => { that.tabClick(item) }
                  },
                  class: { 'active':  item.name  === that.name, 'z-tabs-title-name': true},
                  key: item.key
                },
                item.label
              ))
            ),
            h(
              'div',
              {
                class: 'z-tabs-title-bottom'
              }
              
            )
          ]
        ),
        h(
          'div',
          {
            class: 'z-tabs-content',
          },
          [ ...that.$slots.default.filter(item => !item.tag || item.tag.indexOf('z-tab-pane') === -1), that.soltContent]
        )
      ]
    )
  }
}
</script>