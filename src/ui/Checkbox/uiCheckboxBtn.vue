<template>
  <ui-button 
    @click.prevent.native="handleClick"
    :class="classObj" 
    :disabled="disabled"
    :type="currentChecked ? 'primary' : 'default'">
    <slot></slot>
  </ui-button>
<!--   <validate
    :name="name"
    :rules="rules"
    :valid-status.sync="validStatus"
    :custom-validate="customValidate" 
    :value="currentChecked"
    :results.sync="validateResults">
  </validate> -->
</template>

<script>
import uiButton from '../Button/uiButton'
import events from '../utils/events'
import valMixin from '../Mixin/valMixin'
import validate from '../validate'

export default {
  name: 'uiCheckboxBtn',
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
      default: false
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
  computed: {
    classObj () {
      let {prefixCls} = this
      let klass = {}
      klass[prefixCls + '-checked-btn'] = true

      return klass
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
  methods: {
    handleClick () {
      this.currentChecked = !this.currentChecked
      this.dispatch('uiCheckboxGroup', 'ui@checkboxChange', this)
      this.$emit('change', this.currentChecked)
    }
  },
  created () {
    this.$on('ui@checkboxgroupChange', (val) => {
      this.currentChecked = val.indexOf(this.label) > -1
    })
  },
  components: {
    uiButton,
    validate
  }
}
</script>
