import Vue from 'vue'
import Modal from './uiModal.vue'
import localeMixin from '../Mixin/localeMixin'



const createNode = () => {
  const $body = document.querySelector('body')
  const $node = document.createElement('div')
  $body.appendChild($node)
  return $node
} 

const removeNode = $node => {
  const $body = document.querySelector('body')
  $body.removeChild($node)
}

const typeMap = {
  success: {
    name: 'check-circle-o',
    color: '#19d567'
  },
  danger: {
    name: 'times-circle-o',
    color: '#f50'
  },
  warning: {
    name: 'exclamation-circle',
    color: '#fa0'
  },
  info: {
    name: 'info-circle',
    color: '#2db7f5'
  }
}

const confirm = (options) => {
  const {title, message, effect, type, width, onConfirm, onHide, onShow} = options
  const confirm = new Vue({
    el: createNode(),
    data () {
      return {
        show: false
      }
    },
    components: {
      Modal
    },
    template: `<Modal ref="modal" title="${title}"
      effect="${effect || 'fade'}"
      ${width ? 'width="' + width + '"' : ''}
      :backdrop="false"
      @confirm="handleConfirm"
      @hide="handleHide"
      @show="handleShow"
      @closed="destroy">
      <div slot="header" v-if="${!title}"></div>
      <div slot="body">
        <ui-icon :style="{color: iconType.color,fontSize:'40px',marginRight:'20px'}" :type="iconType.name"></ui-icon>
        ${message}
      </div>
    </Modal>`,
    mounted () {
      this.$nextTick(() => {
        this.$refs.modal.open()
      })
    },
    destroyed () {
      removeNode(this.$el)
    },
    computed: {
      iconType () {
        return typeMap[type]
      },
    },
    methods: {
      handleShow () {
        onShow && onShow()
      },
      handleConfirm () {
        onConfirm && onConfirm()
        this.$refs.modal.close()
      },
      handleHide () {
        onHide && onHide()
      },
      destroy () {
        this.$destroy()
      }
    }
  })
}

const alert = (options) => {
  const {title, message, effect, type, width, onConfirm, onHide, onShow} = options
  const alert = new Vue({
    el: createNode(),
    mixins: [localeMixin('uiModal')],
    data () {
      return {
        show: false
      }
    },
    components: {
      Modal
    },
    template: `<Modal title="${title}"
      effect="${effect || 'fade'}"
      ref="modal"
      ${width ? 'width="' + width + '"' : ''}
      :backdrop="false"
      @hide="handleHide"
      @show="handleShow"
      @closed="destroy">
      <div slot="body">
        <ui-icon :style="{color: iconType.color,fontSize:'40px',marginRight:'20px'}" :type="iconType.name"></ui-icon>
        ${message}
      </div>
      <div slot="header" v-if="${!title}"></div>
      <div slot="footer">
        <ui-button @click.native="handleConfirm">{{getL('confirm')}}</ui-button>
      </div>
    </Modal>`,
    mounted () {
      this.$nextTick(() => {
        this.$refs.modal.open()
      })
    },
    destroyed () {
      removeNode(this.$el)
    },
    computed: {
      iconType () {
        return typeMap[type]
      },
    },
    methods: {
      handleShow () {
        onShow && onShow()
      },
      handleConfirm () {
        onConfirm && onConfirm()
        this.$refs.modal.close()
      },
      handleHide () {
        onHide && onHide()
      },
      destroy () {
        this.$destroy()
      }
    }
  })
}

export default {
  alert,
  confirm
}
