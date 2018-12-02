<template>
  <span :class="`${prefixCls}-badge`">
		<slot></slot>	
	</span>
</template>
<script>
	export default {
		name: 'uiBadge',
	  props: {
	    prefixCls: {
	      type: String,
	      default: 'ui'
	    }
	  }
	}
</script>