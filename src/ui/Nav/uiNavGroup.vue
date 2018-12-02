<template>
  <li :class="`${prefixCls}-nav-item-group`">
    <div :class="`${prefixCls}-nav-item-group__title`" :style="{paddingLeft: levelPadding + 'px'}">
      <template v-if="!$slots.title">{{title}}</template>
      <slot v-else name="title"></slot>
    </div>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>
<script>
  export default {
    name: 'uiNavGroup',
    componentName: 'uiNavGroup',
    props: {
      title: {
        type: String
      },
      prefixCls: {
        type: String,
        default: 'ui'
      }
    },
    data() {
      return {
        paddingLeft: 20
      }
    },
    computed: {
      levelPadding() {
        let padding = 10
        let parent = this.$parent
        while (parent && parent.$options.componentName !== 'uiNav') {
          if (parent.$options.componentName === 'uiSubNav') {
            padding += 20
          }
          parent = parent.$parent
        }
        padding === 10 && (padding = 20)
        return padding
      }
    }
  }
</script>