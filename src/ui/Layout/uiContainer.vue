<template>
  <div :class="classObj" >
  	<slot></slot>		
  </div>
</template>
<script>
export default{
  name: 'uiContainer',
  props: {
    fluid: {
      type: Boolean
    },
    prefixCls: {
      type: String,
      default: 'ui'
    }
  },
  computed: {
    classObj () {
      let {prefixCls, fluid} = this
      let klass = {}

      klass[prefixCls + '-container-fluid'] = fluid
      klass[prefixCls + '-container'] = !fluid
      klass['clearfix'] = true

      return klass
    }
  }
}
</script>