<template>
  <li
    :key="index"
    :style="paddingStyle"
    @click="handleClick"
    :class="classObJ">
    <slot></slot>
  </li>
</template>
<script>
  import navMixin from '../Mixin/navMixin'
  import eventMixin from '../Mixin/eventMixin'

  export default {
    name: 'uiNavItem',
    componentName: 'uiNavItem',
    mixins: [navMixin, eventMixin],
    props: {
      index: {
        type: [String,Number],
        required: true
      },
      route: {
        type: Object,
        required: false
      },
      disabled: {
        type: Boolean,
        required: false
      },
      prefixCls: {
        type: String,
        default: 'ui'
      }
    },
    computed: {
      active() {
        return this.index === this.rootMenu.activedIndex
      },
      classObJ(){
        let {prefixCls,active,disabled} = this
        let obj = {}
        obj[`${prefixCls}-nav-item`] = true
        obj['is-active'] = active
        obj['is-disabled'] = disabled
        return obj
      }
    },
    methods: {
      handleClick() {
        this.dispatch('uiNav', 'item-click', this)
        this.$emit('click', this)
      }
    },
    created() {
      this.parentMenu.addItem(this)
      this.rootMenu.addItem(this)
    },
    beforeDestroy() {
      this.parentMenu.removeItem(this)
      this.rootMenu.removeItem(this)
    }
  }
</script>