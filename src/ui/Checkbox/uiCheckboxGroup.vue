<template>
  <div :class="`${prefixCls}-btn-group ${prefixCls}-checkbox-group`">
    <slot></slot>
    <validate
      :name="name"
      :rules="rules"
      :custom-validate="customValidate" 
      :current="currentValue">
    </validate>
  </div>
</template>

<script>
import valMixin from '../Mixin/valMixin'
import validate from '../validate'
import events from '../utils/events'

export default {
  name: 'uiCheckboxGroup',
  mixins: [valMixin, events],
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    type: {
      type: String,
      default: 'checkbox'
    },
    prefixCls: {
      type: String,
      default: 'ui'
    }
  },

  data () {
    return {
      currentValue: []
    }
  },

  methods: {
    init () {
      let children = this.$children
      let ret = []
      children.forEach((item) => {
        item.currentChecked ? ret.push(item.label) : ''
      })
      this.currentValue = ret
    }
  },

  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      let value = val || this.value
      this.broadcast('uiCheckbox', 'ui@checkboxgroupChange', value)
      this.broadcast('uiCheckboxBtn', 'ui@checkboxgroupChange', value)
      this.$emit('input', value)
      this.$emit('change', value)
    }
  },

  created () {
    this.$on('ui@checkboxChange', () => {
      this.init()
    })
  },

  mounted () {
    this.currentValue = this.value
    this.$nextTick(() => {
      this.init()
    })
  },

  components: {
    validate
  }

}
</script>