<template>
  <li :class="liClass">
    <div  ref="subnav-title" :style="paddingStyle" :class="`${prefixCls}-subnav__title`">
      <slot name="title"></slot>
      <ui-icon type="angle-right" :class="iClass"></ui-icon>
    </div>
    <template v-if="rootMenu.mode === 'horizontal'">
      <transition name="fadeDown">
        <ul class="ui-nav" v-show="opened"><slot></slot></ul>
      </transition>
    </template>
    <ui-collapse-transition v-else group>
      <ul :class="`${prefixCls}-nav`" v-show="opened"><slot></slot></ul>
    </ui-collapse-transition>
  </li>
</template>
<script>
  import uiIcon from '../Icon/uiIcon'
  import navMixin from '../Mixin/navMixin'
  import eventMixin from '../Mixin/eventMixin'
  import uiCollapseTransition from '../uiCollapseTransition'
  export default {
    name: 'uiSubNav',
    componentName: 'uiSubNav',
    mixins: [navMixin, eventMixin],
    components: {
      uiCollapseTransition,
      uiIcon
    },
    props: {
      index: {
        type: [String,Number],
        required: true
      },
      prefixCls: {
        type: String,
        default: 'ui'
      }
    },
    data() {
      return {
        timeout: null,
        items: {},
        submenus: {}
      }
    },
    computed: {
      opened() {
        return this.rootMenu.openedMenus.indexOf(this.index) > -1
      },
      active: {
        cache: false,
        get() {
          let isActive = false
          const submenus = this.submenus
          const items = this.items
          Object.keys(items).forEach(index => {
            if (items[index].active) {
              isActive = true
            }
          })
          Object.keys(submenus).forEach(index => {
            if (submenus[index].active) {
              isActive = true
            }
          })
          return isActive
        }
      },
      liClass() {
        let { prefixCls,active,opened } = this
        let obj = {}
        obj[`${prefixCls}-subnav`] = true
        obj['is-active'] = active
        obj['is-opened'] = opened
        return obj
      },
      iClass() {
        let { prefixCls,rootMenu } = this
        let obj = {}
        obj[`${prefixCls}-subnav__icon-arrow`] = true
        obj[`${prefixCls}-icon-arrow-down`] = rootMenu.mode === 'vertical'
        obj[`${prefixCls}-icon-caret-bottom`] = rootMenu.mode === 'horizontal'
        return obj
      }
    },
    methods: {
      addItem(item) {
        this.$set(this.items, item.index, item)
      },
      removeItem(item) {
        delete this.items[item.index]
      },
      addSubmenu(item) {
        this.$set(this.submenus, item.index, item)
      },
      removeSubmenu(item) {
        delete this.submenus[item.index]
      },
      handleClick() {
        this.dispatch('uiNav', 'submenu-click', this)
      },
      handleMouseenter() {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.rootMenu.openMenu(this.index, this.indexPath)
        }, 300)
      },
      handleMouseleave() {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.rootMenu.closeMenu(this.index, this.indexPath)
        }, 300)
      },
      initEvents() {
        let {
          rootMenu,
          handleMouseenter,
          handleMouseleave,
          handleClick
        } = this
        let triggerElm
        if (rootMenu.mode === 'horizontal' && rootMenu.menuTrigger === 'hover') {
          triggerElm = this.$el
          triggerElm.addEventListener('mouseenter', handleMouseenter)
          triggerElm.addEventListener('mouseleave', handleMouseleave)
        } else {
          triggerElm = this.$refs['subnav-title']
          triggerElm.addEventListener('click', handleClick)
        }
      }
    },
    created() {
      this.parentMenu.addSubmenu(this)
      this.rootMenu.addSubmenu(this)
    },
    beforeDestroy() {
      this.parentMenu.removeSubmenu(this)
      this.rootMenu.removeSubmenu(this)
    },
    mounted() {
      this.$nextTick(()=>{
       this.initEvents()
      })
    }
  }
</script>