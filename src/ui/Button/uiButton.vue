<template>
    <a :class="classObj" @click="event">
    <slot></slot> 
    <ui-loading v-if="loading" size="xs" style="position:relative;top:2px"></ui-loading>
    <ui-badge  v-if="badge">{{badge}}</ui-badge>
  </a>
</template>
<script>
import uiLoading from '../Loading/uiLoading'
import uiBadge from '../Badge/uiBadge'

export default {
    name: 'uiButton',
    props: {
        size: {
            type: String
        },
        type: {
            type: String,
            default: 'default'
        },
        badge: {
            type: [String, Number]
        },
        active: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        prefixCls: {
            type: String,
            default: 'ui'
        },
        value: {
            default: ''
        }
    },
    computed: {
        classObj() {
            let { prefixCls, type, size, block, active, disabled } = this
            let klass = {}

            klass[prefixCls + '-btn'] = true
            klass[prefixCls + '-btn-block'] = block
            klass[prefixCls + '-btn-active'] = active
            klass[prefixCls + '-btn-disabled'] = disabled
            size ? klass[prefixCls + '-btn-' + size] = true : ''
            type ? klass[prefixCls + '-btn-' + type] = true : ''

            return klass
        }
    },
    methods: {
        event: function() {
            this.$emit('click', this.value);
        }
    },
    components: {
        uiLoading,
        uiBadge
    }
}
</script>