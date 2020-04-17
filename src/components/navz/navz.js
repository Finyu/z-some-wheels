export default {
  data(){
    return {
      routePath: null
    }
  },
  props: ['routerData'],
  watch: {
    $route(nv, ov) {
      this.routePath = nv.path
    }
  },
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
                  class: {
                    'Z-nav-common': true,
                    'is-route': that.routePath == todo.path
                  },
                  style: {
                    'width': '220px',
                  },
                  on: {
                    click: () => {that.handleSelect(todo.path)}
                  }
                },
                todo.label.split('').map( (nape, index) => {
                  return creatElement(
                    'span',
                    {
                      class: 'transformDelay',
                      attrs: {
                        'data-text': nape
                      },
                      style: {
                        'transition-delay': index * 0.05 + 's',
                      }
                    },
                    nape
                  )
                })
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