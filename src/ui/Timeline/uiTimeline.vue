<template>
 	<ul :class="`${prefixCls}-timeline-con`">
 		<template v-if="value">
 			<ui-timeline-item v-for="i in value" :color="i.color" :icon="i.icon" :key="index">
 				<render :context="context || $parent._self" :template="i.content"></render>
 			</ui-timeline-item>
 		</template>
 		<template v-else>
 			<slot></slot>
 		</template>
 	</ul>
</template>
<script>
import uiTimelineItem from './uiTimelineItem'
import render from '../render'

export default{
  name: 'uiTimeline',
  props: {
    value: {
      type: Array
    },
    context: {},
    prefixCls: {
      type: String,
      default: 'ui'
    }
  },
  components: {
    uiTimelineItem,
    render
  }
}
</script>