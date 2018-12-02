<template>
<div :class="classObj"  :style="{'width':width}">
  <input
    ref="input"
    auto-complete="off"
    :class="`${prefixCls}-form-control`"
    :style="{'width':width}"
    :readonly="readonly"
    :disabled="disabled"
    :placeholder="placeholder"
		:type="type"
    @blur="blur"
    @focus="focus"
    @input="update($event.target.value)"
    v-focus="focused" 
    :value="value" />

  <ui-icon 
    type="times-circle" 
    v-if="showClean"  
    :class="`${prefixCls}-input-show-clean`" 
    @click.native.stop="clean">
  </ui-icon>

  <ui-icon
    :class="`${prefixCls}-input-show-icon`"  
    :type="icon">
  </ui-icon>

  <validate
    :name="name"
    v-model="validStatus"
    :rules="rules"
    :custom-validate="customValidate"
    :current="value">
  </validate>

</div>
</template>
<script>
import uiIcon from '../Icon/uiIcon'
import inputMixin from '../Mixin/inputMixin'
import validate from '../validate'
import { focus } from '../utils/vue-focus'

export default {
  name: 'uiInput',
  mixins: [inputMixin],
  props: {
    value: {
      type: [String, Number]
    },
    onChange: {
      type: Function
    },
    prefixCls: {
      type: String,
      default: 'ui'
    },
    type: {
      type: String,
      default: 'text'
    },
    icon: {
      type: String
    },
    showClean: {
      type: Boolean,
      default: false
    }
  },
  components: {
    uiIcon,
    validate
  },
  data () {
    return {
      focused: false
    }
  },
  computed: {
    classObj () {
      let {prefixCls, validStatus, showClean,icon} = this
      let klass = {}

      klass[prefixCls + '-has-error'] = validStatus === 'error'
      klass[prefixCls + '-has-success'] = validStatus === 'success'
      klass[prefixCls + '-has-warn'] = validStatus === 'warn'
      klass[prefixCls + '-input-con'] = true
      klass[prefixCls + '-show-clean'] = showClean
      klass[prefixCls + '-show-icon'] = icon ? true : false
      klass['inline'] = true

      return klass
    }
  },
  directives: { focus: focus },
  methods: {
    clean () {
      this.$emit('input', '')
      this.$emit('clean')
    },
    update (val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
    blur () {
      this.focused = false
      this.$emit('blur', this.value)
    },
    focus () {
      this.focused = true
      this.$emit('focus', this.value)
    }
  }
}
</script>
