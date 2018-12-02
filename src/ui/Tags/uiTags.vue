<template>
  <div :class="classObj">
    <label v-for="i in currentValue" :class="tagClass(i)">
	 {{i.label}}
	<a name="remove" v-if="removable" @click="del(i)"><ui-icon type="times"></ui-icon></a>
	</label>
  </div>
</template>

<script>
import uiIcon from '../Icon/uiIcon'

export default{
  name: 'uiTags',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    value: {
      type: Array
    },
    size: {
      type: String,
      default: ''
    },
    removable: {
      type: Boolean,
      default: false
    },
    prefixCls: {
      type: String,
      default: 'ui'
    }
  },
  components: {
    uiIcon
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    currentValue (val) {
      this.$emit('input', val)
    }
  },
  computed: {
    classObj () {
      let {prefixCls, size, type} = this
      let klass = {}

      klass[prefixCls + '-tag-group'] = true
      size ? klass[prefixCls + '-tag-' + size] = true : ''
      type ? klass[prefixCls + '-tag-' + type] = true : ''

      return klass
    },
    active () {
      return this.type === 'default' ? 'tag-primary' : 'tag-' + this.type
    }
  },
  methods: {
    tagClass (i) {
      let {prefixCls} = this
      let klass = {}

      klass[prefixCls + '-tag'] = true
      klass[prefixCls + '-tag-disabled'] = i.disabled

      return klass
    },
    find (i, target) {
      let ret = -1
      target.forEach((e, index) => {
        if (e.value === i.value) {
          ret = index
        }
      })
      return ret
    },
    del (i) {
      if (i.disabled) return
      let index = this.find(i, this.currentValue)

      if (index > -1) {
        this.currentValue.splice(index, 1)
        this.$emit('remove')
      }
    }
  }
}
</script>