
export default {
  name: 'zPiechart',
  props: {
    'value': {
      ype: Number,
      required: true,
    },
    'total': {
      ype: Number,
      default: 100,
    }
  },
  render: function(h) {
    return h(
      'div', {
        class: {
          'z-piechart': true,
          'z-piechart-animated': this.animated,
          'z-piechart-firstAnimate': this.firstAnimate,
        },
        style: {
          '--gauge-value': this.value,
          '--gauge-max-value': this.total,
        },
        on: { click: this.click }
      }
    )
  },
  methods: {
    click(){
      this.$emit('onClick')
    }
  },
  mounted () {
    console.log(this.firstAnimate)
  }
}