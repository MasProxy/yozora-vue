<!--
 * Component: Table Header
 * Version: 1.1.0
 * Author: MasProxy
 * Date Created: 2024-02-11
 * Last Modified: 2025-02-12
 * Description: This is a component for render a table header.
-->

<script setup lang="ts">
import { onBeforeMount, Ref, ref, computed, CSSProperties } from 'vue'

/**
 * Props for the TableHeader component.
 *
 * @prop {string} width - The width of the table header. Default is ''.
 * @prop {boolean} borderless - The borderless state of the table header. Default is false.
 * @prop {string} bgColor - The background color of the table header. Default is 'secondary'.
 * @prop {string} textColor - The text color of the table header. Default is ''.
 * @prop {string} textPosition - The text position of the table header. Default is 'center'.
 * @prop {void} onSort - The function to handle sorting. Default is an empty function.
 */
interface TableHeaderProps {
  width?: string
  borderless?: boolean
  bgColor?: string
  textColor?: string
  textPosition?: string
  onSort?: (column: string) => void
}

const props = withDefaults(defineProps<TableHeaderProps>(), {
  width: '',
  bgColor: 'secondary',
  borderless: false,
  textColor: '',
  textPosition: 'center',
  onSort: () => {},
})

const finalClass: Ref<string> = ref('px-4 py-1')
const finalStyle: Ref<CSSProperties> = ref({})

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

  return yiq >= 128 ? 'black' : 'white'
})

/**
 * ANCHOR - function for generate color
 */
const generateColor = () => {
  const textColor = headerTextColor.value

  finalStyle.value.color = textColor
  finalStyle.value.background = props.bgColor
}

/**
 * ANCHOR - function for generate border
 */
const generateBorder = () => {
  if (props.borderless) {
    finalClass.value = finalClass.value + ' border-b border-gray-700'
  } else {
    finalClass.value =
      finalClass.value +
      ' border-l border-t border-gray-700 text-center last:border-r'
  }
}

onBeforeMount(() => {
  if (props.width !== '') {
    finalClass.value = finalClass.value + ` w-[${props.width}]`
  }

  if (props.textPosition !== '') {
    finalStyle.value.textAlign =
      (props.textPosition as CSSProperties['textAlign']) ?? 'center'
  }

  generateColor()
  generateBorder()
})
</script>
<template>
  <th v-bind="$attrs" :class="finalClass" :style="{ ...finalStyle }">
    <slot></slot>
  </th>
</template>
