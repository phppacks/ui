<template>
	<div :class="classObj">
		<slot></slot>
	</div>
</template>

<script>
export default{
  name: 'uiCard',
  props: {
    prefixCls: {
      type: String,
      default: 'ui'
    },
    hover: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classObj () {
      let {prefixCls, hover} = this
      let klass = {}

      klass[prefixCls + '-card'] = true
      klass[prefixCls + '-card-hover'] = hover

      return klass
    }
  }
}
</script>