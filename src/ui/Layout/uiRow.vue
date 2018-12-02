<template>
  <div :class="`${prefixCls}-row`">
  	<slot></slot>		
  </div>
</template>
<script>
export default {
	name: 'uiRow',
  props: {
    prefixCls: {
      type: String,
      default: 'ui'
    }
  }
}
</script>
