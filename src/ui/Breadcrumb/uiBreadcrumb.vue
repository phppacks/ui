<template>
	<ol :class="`${prefixCls}-breadcrumb`">
		<slot></slot>
	</ol>
</template>
<script>
	export default {
		name: 'uiBreadcrumb',
	  props: {
	    prefixCls: {
	      type: String,
	      default: 'ui'
	    }
	  }
	}
</script>