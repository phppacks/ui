<template>
  <div :class="`${prefixCls}-carousel-item`">
    <slot></slot>
  </div>
</template>

<script>
import element from '../utils/element'

export default {
  name: 'uiSlide',
  props: {
    prefixCls: {
      type: String,
      default: 'ui'
    }
  },
  data () {
    return {
      index: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      for (let c in this.$parent.$children) {
        if (this.$parent.$children[c].$el == this.$el) {
          this.index = c
          break
        }
      }

      this.$parent.indicator.push(this.index)
      if (this.index == 1) {
        element.addClass(this.$el, this.prefixCls + '-carousel-active')
      }
    })
  }
}
</script>
