<template>
  <ui-button 
    @click.prevent.native="handleClick"
    :class="classObj" 
    :disabled="disabled"
    :type="currentChecked ? 'primary' : 'default'">
    <slot></slot>
  </ui-button>
</template>

<script>
import uiButton from '../Button/uiButton'
import events from '../utils/events'
import valMixin from '../Mixin/valMixin'

export default {
  name: 'uiRadioBtn',
  mixins: [valMixin, events],
  props: {
    value: {
      type: String
    },
    label: {
      type: [String, Number]
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    prefixCls: {
      type: String,
      default: 'ui'
    }
  },
  watch: {
    value (val) {
      this.currentChecked = val
    },
    checked (val) {
      this.currentChecked = val
    },
    currentChecked (val) {
      this.$emit('input', val)
    }
  },
  data () {
    let checked = this.checked
    if (checked !== undefined) {
      this.$emit('input', checked)
    } else {
      checked = !!this.value
    }

    return {
      currentChecked: checked
    }
  },
  computed: {
    classObj () {
      let {prefixCls} = this
      let klass = {}
      klass[prefixCls + '-radio-btn'] = true

      return klass
    }
  },
  created () {
    this.$on('ui@radiogroupChange', (val) => {
      this.currentChecked = val === this.label
    })
  },
  methods: {
    handleClick () {
      if (this.currentChecked) return
      this.currentChecked = true
      this.dispatch('uiRadioGroup', 'ui@radioChange', this.label)
      this.$emit('change', this.currentChecked)
    }
  },
  components: {
    uiButton
  }
}
</script>