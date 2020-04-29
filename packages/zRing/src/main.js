

export default {
  name: 'zRing',
  props: {
    bkColor: {
      type: String,
      default: 'red',
    }
  },
  render: function(h) {
    return h(
      'div', {
        class: 'z-ring',
        style: {
          'box-shadow': `inset 0.5em -0.5em ${this.bkColor}`
        },
        on: { click: this.click }
      },this.$slots.default)
  },
  methods: {
    click(){
      this.$emit('onClick')
    }
  },
  mounted () {
    console.log(this)
  }
}