<!--
 * Component: Table Data
 * Version: 1.2.0
 * Author: MasProxy
 * Date Created: 2024-02-11
 * Last Modified: 2026-01-30
 * Description: This is a component for render a table data.
-->

<script setup lang="ts">
import { onBeforeMount, Ref, ref } from 'vue'

/**
 * Props for the TableData component.
 * @prop {string} width - The width of the table data. Default is ''.
 * @prop {boolean} borderless - The borderless state of the table data. Default is false.
 */
interface TableDataProps {
  width?: string
  borderless?: boolean
}

const props = withDefaults(defineProps<TableDataProps>(), {
  width: '',
  borderless: false,
})

/**
 * ANCHOR - function to generate border
 */
const generateBorder = () => {
  return props.borderless
    ? ''
    : ' border-l border-b last:border-r border-gray-700 dark:border-dark-border'
}

const finalClass: Ref<string> = ref('px-4 py-2')

onBeforeMount(() => {
  if (props.width === '') {
    finalClass.value = finalClass.value + ` w-[${props.width}]`
  }

  finalClass.value = finalClass.value + generateBorder()
})
</script>

<template>
  <td v-bind="$attrs" :class="finalClass">
    <slot></slot>
  </td>
</template>
