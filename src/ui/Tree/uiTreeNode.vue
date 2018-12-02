<template>
  <div :class="`${prefixCls}-tree-node`">
    <div @click.stop="handleClick" v-show="node.visible" :class="[ `${prefixCls}-tree-data`, tree.store.currentNode === node ? `${prefixCls}-tree-active` : '']">
      <div :class="`${prefixCls}-tree-node__content`" :style="{ 'padding-left': (node.level - 1) * 20 + 'px' }">
        <span @click.stop="handleExpandIconClick">
          <ui-icon
            v-show="!node.isLeaf"
            :class="`${prefixCls}-tree-select-icon`"
            :type="(!node.isLeaf && expanded) ? tree.openedIcon : tree.closedIcon"
          >
          </ui-icon>
        </span>
        <span @click.stop="handleUserClick">
          <ui-checkbox
            v-if="showCheckbox"
            :checked="node.checked"
            @change="handleCheckChange"
          >
          </ui-checkbox>
        </span>
        <span :class="`${prefixCls}-tree-loading-box`" v-if="node.loading">
          <ui-loading color="primary" size="xs"></ui-loading>
        </span>
        <ui-icon :type="node.isLeaf ? tree.leafIcon : tree.childIcon"></ui-icon>
        <node-content :node="node"></node-content>
      </div>
      <ui-collapse-transition>
        <div v-show="expanded">
          <div :class="`${prefixCls}-tree-children`">
            <ui-tree-node :render-content="renderContent" v-for="child in node.childNodes" :key="getNodeKey(child)" :node="child">
            </ui-tree-node>
          </div>
        </div>
      </ui-collapse-transition>
    </div>
  </div>
</template>

<script>
  import uiCollapseTransition from '../uiCollapseTransition'
  import uiCheckbox from '../Checkbox/uiCheckbox'

  export default {
    name: 'uiTreeNode',
    props: {
      node: {
        default() {
          return {}
        }
      },
      prefixCls: {
        type: String,
        default: 'ui'
      },
      props: {},
      renderContent: Function
    },
    components: {
      uiCheckbox,
      uiCollapseTransition,
      NodeContent: {
        props: {
          node: {
            required: true
          }
        },
        render(h) {
          const parent = this.$parent
          const node = this.node
          const data = node.data
          const store = node.store
          return (
            parent.renderContent
              ? parent.renderContent.call(parent._renderProxy, h, { _self: parent.tree.$vnode.context, node, data, store })
              : h('span', this.node.label)
          )
        }
      }
    },

    data() {
      return {
        tree: null,
        expanded: false,
        childNodeRendered: false,
        showCheckbox: false,
        oldChecked: null,
        oldIndeterminate: null
      }
    },

    watch: {
      'node.indeterminate'(val) {
        this.handleSelectChange(this.node.checked, val)
      },

      'node.checked'(val) {
        this.handleSelectChange(val, this.node.indeterminate)
      },

      'node.expanded'(val) {
        this.expanded = val
        if (val) {
          this.childNodeRendered = true
        }
      }
    },

    methods: {
      getNodeKey(node, index) {
        const nodeKey = this.tree.nodeKey
        if (nodeKey && node) {
          return node.data[nodeKey]
        }
        return index
      },

      handleSelectChange(checked, indeterminate) {
        if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
          this.tree.$emit('check-change', this.node.data, checked, indeterminate)
        }
        this.oldChecked = checked
        this.indeterminate = indeterminate
      },

      handleClick() {
        const store = this.tree.store
        store.setCurrentNode(this.node)
        this.tree.$emit('current-change', store.currentNode ? store.currentNode.data : null, store.currentNode)
        this.tree.currentNode = this
        if (this.tree.expandOnClickNode) {
          this.handleExpandIconClick()
        }
        this.tree.$emit('node-click', this.node.data, this.node, this)
      },

      handleExpandIconClick() {
        if (this.expanded) {
          this.node.collapse()
        } else {
          this.node.expand()
        }
      },

      handleUserClick() {
        if (this.node.indeterminate) {
          this.node.setChecked(this.node.checked, !this.tree.checkStrictly)
        }
      },

      handleCheckChange(checked) {
        if (!this.node.indeterminate) {
          this.node.setChecked(checked, !this.tree.checkStrictly)
        }
      }
    },

    created() {
      const parent = this.$parent

      if (parent.isTree) {
        this.tree = parent
      } else {
        this.tree = parent.$parent.tree
      }

      const tree = this.tree
      if (!tree) {
        console.warn('Can not find node\'s tree.')
      }

      const props = tree.props || {}
      this.prefixCls = tree.prefixCls
      
      const childrenKey = props['children'] || 'children'

      this.$watch(`node.data.${childrenKey}`, () => {
        this.node.updateChildren()
      })

      this.showCheckbox = tree.showCheckbox

      if (this.node.expanded) {
        this.expanded = true
        this.childNodeRendered = true
      }
    }
  }
</script>