<!--
 * Component: Table Header
 * Version: 1.0.0
 * Author: MasProxy
 * Date Created: 2024-02-11
 * Last Modified: 2025-02-11
 * Description: This is a component for render a table header.
-->

<script setup lang="ts">
import { onBeforeMount, Ref, ref, computed } from 'vue'

/**
 * Props for the TableHeader component.
 *
 * @prop {string} width - The width of the table header. Default is ''.
 * @prop {void} onSort - The function to handle sorting. Default is an empty function.
 */
interface TableHeaderProps {
  width?: string
  last?: boolean
  bgColor?: string
  textColor?: string
  onSort?: (column: string) => void
}

const props = withDefaults(defineProps<TableHeaderProps>(), {
  width: '',
  bgColor: 'secondary',
  last: false,
  textColor: '',
  onSort: () => {},
})

const finalClass: Ref<string> = ref(
  'border-l border-t border-b border-gray-700 text-center px-6 py-2'
)

/**
 * ANCHOR - function to convert color names to hex
 * @param {string} color - The color name or hex value.
 * @returns {string} - The hex value of the color.
 */
const colorToHex = (color: string): string => {
  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) return '#000000'
  ctx.fillStyle = color
  return ctx.fillStyle
}

/**
 * ANCHOR - a text color variable
 * @returns {string}
 */
const headerTextColor = computed(() => {
  if (props.textColor) {
    return props.textColor
  }

  const hex = colorToHex(props.bgColor).replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000

  return yiq >= 128 ? 'white' : 'black'
})

onBeforeMount(() => {
  if (props.width === '') {
    finalClass.value = finalClass.value + ` w-[${props.width}]`
  }

  if (props.last) {
    finalClass.value = finalClass.value + ' border-r'
  }

  if (props.bgColor.includes('#')) {
    finalClass.value = finalClass.value + ` bg-[${props.bgColor}]`
  } else {
    finalClass.value = finalClass.value + ` bg-${props.bgColor}`
  }

  const textColor = headerTextColor.value
  finalClass.value = finalClass.value + ` text-${textColor}`
})
</script>
<template>
  <th v-bind="$attrs" :class="finalClass">
    <slot></slot>
  </th>
</template>
