<template>
  <div :value="value" :class="`${prefixCls}-option`">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'uiOption',
  props: {
    value: {
      type: String
    },
    prefixCls: {
      type: String,
      default: 'ui'
    }
  }
}
</script>