
export default {
  name: 'zPiechart',
  props: {
    'value': {
      ype: Number,
      required: true,
    },
    'total': {
      type: Number,
      default: 100,
    },
    'firstAnimate': {
      type: Boolean,
      default: false,
    },
    'animated': {
      type: Boolean,
      default: false,
    }
  },
  render: function(h) {
    return h(
      'div', {
        class: {
          'z-piechart': true,
          'z-piechart-animated': CSS.registerProperty && this.animated && this.animateState,
          'z-piechart-firstAnimate': CSS.registerProperty && this.firstAnimate,
        },
        style: {
          '--gauge-value': this.value,
          '--gauge-max-value': this.total,
        },
        on: { click: this.click }
      }
    )
  },
  data (){
    return {  animateState: false  }    
  },
  watch: {
    value(){
      clearTimeout(window.zPiecharttimer)
      this.animateState = true
      window.zPiecharttimer = setTimeout(() => {
        this.animateState = false
      }, 500)
    }
  },
  methods: {
    click(){
      this.$emit('onClick')
    }
  },
  mounted () {
  }
}