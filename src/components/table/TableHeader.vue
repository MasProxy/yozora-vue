<!--
 * Component: Table Header
 * Version: 1.2.1
 * Author: MasProxy
 * Date Created: 2024-02-11
 * Last Modified: 2026-04-30
 * Description: This is a component for render a table header.
-->

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

/**
 * Props for the TableHeader component.
 *
 * @prop {string} width - The width of the table header. Default is ''.
 * @prop {boolean} borderless - The borderless state of the table header. Default is false.
 * @prop {string} bgColor - The background color of the table header. Default is 'secondary'.
 * @prop {string} textColor - The text color of the table header. Default is ''.
 * @prop {string} textPosition - The text position of the table header. Default is 'center'.
 */

interface TableHeaderProps {
  width?: string
  borderless?: boolean
  bgColor?: string
  textColor?: string
  textPosition?: string
}

const props = withDefaults(defineProps<TableHeaderProps>(), {
  width: '',
  bgColor: 'secondary',
  borderless: false,
  textColor: '',
  textPosition: 'center',
})

defineEmits(['sort'])

function contrastText(bg: string): string {
  const hex = bg.replace('#', '').trim()
  let r = 0, g = 0, b = 0

  if (hex.length === 3) {
    r = Number.parseInt(hex[0] + hex[0], 16)
    g = Number.parseInt(hex[1] + hex[1], 16)
    b = Number.parseInt(hex[2] + hex[2], 16)
  } else if (hex.length === 6) {
    r = Number.parseInt(hex.substring(0, 2), 16)
    g = Number.parseInt(hex.substring(2, 4), 16)
    b = Number.parseInt(hex.substring(4, 6), 16)
  }

  if ([r, g, b].some(isNaN)) return 'white'
  return (r * 299 + g * 587 + b * 114) / 1000 >= 128 ? 'black' : 'white'
}

const headerTextColor = computed(() => {
  if (props.textColor) return props.textColor
  return contrastText(props.bgColor)
})

const finalClass = computed(() => {
  let cls = 'px-4 py-1'

  if (props.width !== '') {
    cls += ` w-[${props.width}]`
  }

  if (!props.borderless) {
    cls += ' border-l border-t border-gray-700 text-center last:border-r dark:border-dark-border'
  }

  return cls
})

const finalStyle = computed((): CSSProperties => ({
  background: props.bgColor,
  color: headerTextColor.value,
  textAlign: (props.textPosition || 'center') as CSSProperties['textAlign'],
}))


</script>

<template>
  <th
    scope="col"
    @click="$emit('sort')"
    v-bind="$attrs"
    :class="finalClass"
    :style="finalStyle">
    <slot></slot>
  </th>
</template>
