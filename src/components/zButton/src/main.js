const zButtonTypes = {
  '1': function (h) {
    return h(
    'button', {
      class: 'z-btn-1 z-btn-1-primary z-btn-1-ghost z-btn-1-shine',
      on: { click: this.click }
    },this.$slots.default)},
  '2': function (h) {
    return h(
    'button', {
      class: 'z-btn-2 z-btn-2-primary z-btn-2-ghost z-btn-2-border-stroke  z-btn-2-text-float-up',
      on: { click: this.click }
    }, [
      h('div', {class: 'z-btn-borders'}, [
        h('div', {class: 'z-btn-border-top'}),
        h('div', {class: 'z-btn-border-left'}),
        h('div', {class: 'z-btn-border-right'}),
        h('div', {class: 'z-btn-border-bottom'}),
      ]),
      h('span', {class: 'z-btn-text'}, this.$slots.default),
    ])},
  '3': function (h) {
    return h(
    'button', {
      class: 'z-btn-3 z-btn-3-pink z-btn-3-bubbles',
      on: { click: this.click }
    },this.$slots.default)},
}

export default {
  name: 'zButton',
  props: ['type'],
  render: function(h) {
    return zButtonTypes[this.type].call(this, h)
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