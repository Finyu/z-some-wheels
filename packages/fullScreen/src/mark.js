export default {
  data(){
    return {
      fullScreen: false,
    }
  },
  watch: {
  },
  render:function(creatElement){
    
    return creatElement(
      'div',
      {
        class: {
          'fullScreen-mark': true,
          'fullScreen-open': this.fullScreen
        },
        on: {
          click: (event, v) => {
            if (event.target.classList.contains('fullScreen-open')) {
              this.fullScreen = false
              this.$refs.fullScreenContent.fullScreen = false
            }
          }
        }
      },
      this.el
    )
  },
  methods: {
  },
  mounted () {

  }
}