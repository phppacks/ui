<template>
  <div :class="classObj" >
  	<slot></slot>		
  </div>
</template>
<script>
export default{
  name: 'uiColumn',
  props: {
    col: {
      type: Number
    },
    mode: {
      type: String,
      default: 'md'
    },
    offset: {
      type: Number
    },
    prefixCls: {
      type: String,
      default: 'ui'
    }
  },
  computed: {
    classObj () {
      let {prefixCls, mode, offset, col} = this
      let klass = {}

      klass[prefixCls + '-col-' + mode + '-' + col] = true
      offset ? klass[prefixCls + '-col-' + mode + '-offset-' + offset] = true : ''

      return klass
    }
  }
}
</script>
