<template>
    <label :class="wrapClass">
        <span>
    <span :class="`${prefixCls}-checkbox-inner`">
      <ui-icon type="check" color="#fff" :class="`${prefixCls}-checkbox-inner-check`"></ui-icon>
    </span>
        <input type="checkbox" :class="`${prefixCls}-checkbox-input`" :disabled="disabled" :checked="currentChecked" @click="handleClick" />
        </span>
        <span><slot></slot></span>
        <validate :name="name" :rules="rules" :custom-validate="customValidate" :current="currentChecked">
        </validate>
    </label>
</template>
<script>
import uiIcon from '../Icon/uiIcon'
import events from '../utils/events'
import valMixin from '../Mixin/valMixin'
import validate from '../validate'

export default {
    name: 'uiCheckbox',
    mixins: [valMixin, events],
    props: {
        value: {
            type: [String, Boolean]
        },
        checked: {
            type: Boolean,
            default: false
        },
        label: {
            type: [String, Number]
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
    components: {
        validate,
        uiIcon
    },
    data() {
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
    watch: {
        value(val) {
            this.currentChecked = val
        },
        checked(val) {
            this.currentChecked = val
        },
        currentChecked(val) {
            this.$emit('input', val)
        }
    },
    computed: {
        wrapClass() {
            let klass = {}
            let { prefixCls, currentChecked, disabled } = this

            klass[prefixCls + '-checkbox-label'] = true
            klass[prefixCls + '-checkbox-checked'] = currentChecked
            klass[prefixCls + '-checkbox-disabled'] = disabled

            return klass
        }
    },
    created() {
        this.$on('ui@checkboxgroupChange', (val) => {
            this.currentChecked = val.indexOf(this.label) > -1
        })
    },
    methods: {
        handleClick() {
            this.currentChecked = !this.currentChecked
            this.dispatch('uiCheckboxGroup', 'ui@checkboxChange', this)
            this.$emit('change', this.currentChecked)
        }
    }
}
</script>