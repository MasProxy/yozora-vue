<!--
 * Component: Table Data
 * Version: 1.2.1
 * Author: MasProxy
 * Date Created: 2024-02-11
 * Last Modified: 2026-04-30
 * Description: This is a component for render a table data.
-->

<script setup lang="ts">
import { computed } from 'vue'

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

const finalClass = computed(() => {
  let cls = 'px-4 py-2'

  if (props.width !== '') {
    cls += ` w-[${props.width}]`
  }

  if (!props.borderless) {
    cls += ' border-l border-b last:border-r border-gray-700 dark:border-dark-border'
  }

  return cls
})
</script>

<template>
  <td v-bind="$attrs" :class="finalClass">
    <slot></slot>
  </td>
</template>
