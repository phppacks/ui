<template>
  <div :class="`${prefixCls}-btn-group`">
    <slot></slot>  
  </div>
</template>

<script>
export default {
  name: 'uiButtonGroup',
  props: {
    prefixCls: {
      type: String,
      default: 'ui'
    }
  }
}
</script>
