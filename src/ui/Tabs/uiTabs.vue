<template>
  <div>
    <ul :class="classObj" >
      <li
          v-for="(r,index) in renderData"
          :class="liclassObj(index,r)"
          @click.prevent="handleTabListClick(index, r)"
          :disabled="r.disabled">
          <a href="#">
            {{r.header}}
            <ui-badge v-if="r.badge">{{r.badge}}</ui-badge>
          </a>
      </li>
    </ul>
    <div :class="`${prefixCls}-tab-content`">
      <div v-if="list">
          <span v-html='renderData[activeIndex].content'></span>
      </div>
      <slot v-else></slot>
    </div>
  </div>
</template>

<script>
import uiBadge from '../Badge/uiBadge'

export default {
  name: 'uiTabs',
  props: {
    pills: {
      type: Boolean
    },
    stacked: {
      type: Boolean
    },
    primary: {
      type: Boolean
    },
    justified: {
      type: Boolean
    },
    value: {
      type: Number,
      default: 0
    },
    list: {
      type: Array
    },
    prefixCls: {
      type: String,
      default: 'ui'
    }
  },
  data () {
    let activeIndex = this.value
    return {
      renderData: [],
      activeIndex: activeIndex
    }
  },
  components: {
    uiBadge
  },
  computed: {
    classObj () {
      let {prefixCls, pills, stacked, primary, justified} = this
      let klass = {}

      klass[prefixCls + '-nav'] = true
      klass['clearfix'] = true
      klass[prefixCls + '-nav-tabs'] = true
      klass[prefixCls + '-nav-tabs-pills'] = pills
      klass[prefixCls + '-nav-tabs-stacked'] = stacked
      klass[prefixCls + '-nav-tabs-primary'] = primary
      klass[prefixCls + '-nav-tabs-justified'] = justified

      return klass
    }
  },
  watch: {
    list: {
      handler () {
        if (this.list) {
          this.renderData = this.list
        }
      },
      immediate: true
    },
    value(val){
      this.activeIndex = val
    }
  },
  methods: {
    liclassObj (index, r) {
      let {prefixCls, activeIndex} = this
      let klass = {}

      klass[prefixCls + '-nav-tabs-active'] = index === activeIndex
      klass[prefixCls + '-nav-tabs-disabled'] = r.disabled

      return klass
    },
    handleTabListClick (index, el) {
      if (!el.disabled) {
        this.activeIndex = index
      } else {
        return
      }
      this.$emit('change', index, el)
    }
  }
}
</script>