<template>
	<ui-popover
    ref="popover" 
    :effect="effect"
    :header="false" 
    :placement="placement" 
    trigger="click">
    <div slot="content">
        <p>{{content}}</p>
        <div style="float:right; margin:10px;">
          <ui-button size="sm" @click.native="$refs.popover.isShow = false">{{cancelText}}</ui-button>
          <ui-button size="sm" type="primary" @click.native="confirm">{{okText}}</ui-button>
        </div>
    </div> 
    <slot></slot>
  </ui-popover>
</template>

<script>
import uiPopover from '../Popover/uiPopover'
import uiButton from '../Button/uiButton'
import type from '../utils/type'

export default {
  name: 'uiPopConfirm',
  props: {
    effect: {
      type: String,
      default: 'scale'
    },
    content: {
      type: String
    },
    placement: {
      type: String,
      default: 'top'
    },
    onConfirm: {
      type: Function
    },
    okText: {
      type: String,
      default: 'ok'
    },
    cancelText: {
      type: String,
      default: 'cancel'
    }
  },

  methods: {
    confirm () {
      let self = this
      if (type.isFunction(this.onConfirm)) {
        let promise = this.onConfirm()
        if (type.isPromise(promise)) {
          promise.then((...args) => {
            self.$refs.popover.isShow = false
            return args
          }).catch((...args) => {
            self.$refs.popover.isShow = false
            return Promise.reject(args)
          })
        } else {
          self.$refs.popover.isShow = false
        }
      }
    }
  },

  components: {
    uiPopover,
    uiButton
  }
}
</script>