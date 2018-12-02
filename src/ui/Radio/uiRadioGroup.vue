<template>
<div :class="`${prefixCls}-btn-group ${prefixCls}-radio-group`">
    <slot></slot>

    <validate
      :name="name"
      :rules="rules"
      :custom-validate="customValidate" 
      :current="value">
    </validate>

  </div>
</template>

<script>
import uiRadio from './uiRadio'
import uiRadioBtn from './uiRadioBtn'
import valMixin from '../Mixin/valMixin'
import events from '../utils/events'
import validate from '../validate'
import type from '../utils/type'

export default {
  name: 'uiRadioGroup',
  mixins: [valMixin, events],
  props: {
    value: {
      type: String
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
      currentValue: ''
    }
  },
  methods: {
    init (val) {
      if (!type.isUndefined(val)) {
        this.currentValue = val
      } else {
        let children = this.$children
        let ret
        children.forEach((item) => {
          item.currentChecked ? ret = item.label : ''
        })
        this.currentValue = ret
      }
    }
  },

  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.broadcast('uiRadio', 'ui@radiogroupChange', val)
      this.broadcast('uiRadioBtn', 'ui@radiogroupChange', val)
      this.$emit('input', val)
      this.$emit('change', val)
    }
  },

  created () {
    this.$on('ui@radioChange', (val) => {
      this.init(val)
    })
  },

  mounted () {
    this.currentValue = this.value
    this.$nextTick(() => {
      this.init()
    })
  },

  components: {
    uiRadio,
    uiRadioBtn,
    validate
  }
}
</script>
