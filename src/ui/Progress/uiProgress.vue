<template>
  <div :class="`${prefixCls}-progress`">
    <slot></slot>
  </div>
</template>
<script>
export default {
	name: 'uiProgress',
  props: {
    prefixCls: {
      type: String,
      default: 'ui'
    }
  }
}
</script>