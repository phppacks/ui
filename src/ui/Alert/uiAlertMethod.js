import Vue from 'vue'
import Alert from './uiAlert.vue'

const createNode = () => {
  const $body = document.querySelector('body')
  const $node = document.createElement('div')
  $body.appendChild($node)
  return $node
}

const removeNode = $node => {
  $node.parentNode.removeChild($node)
}

const alert = (options) => {
  const {description, type, dismissable, duration, width, small, placement, message, content, icon} = options
  let containerClass = 'ui-alert-container-' + (placement || 'top')
  let container = document.querySelector('.' + containerClass)

  if (!container) {
    container = createNode()
    container.classList.add(containerClass)
    container.classList.add('ui-alert-' + (placement || 'top'))
  }

  let dom = document.createElement('div')
  container.appendChild(dom)

  const instance = new Vue({
    el: dom,
    data () {
      return {
        show: false
      }
    },
    components: {
      Alert
    },
    template: `<alert 
      ref="alert" 
      :method="true"
      ${icon ? 'icon="' + icon + '"' : ''}
      :description="${description || false}"
      ${width ? 'width="' + width + '"' : ''}
      type="${type || 'default'}"
      :dismissable="${dismissable || true}"
      :duration="${duration}"
      :small="${small || false}"
      ${placement ? 'placement="' + placement + '"' : 'top'}
      ${message ? 'message="' + message + '"' : 'top'}
      message="${message}"
      @hide="destroy"
      @close="destroy">
        ${content}
    </alert>`,
    mounted () {
      this.$nextTick(() => {
        this.$refs.alert.open()
      })
    },
    destroyed () {
      removeNode(this.$el)
    },
    methods: {
      destroy () {
        this.$destroy()
      }
    }
  })
}

export default alert