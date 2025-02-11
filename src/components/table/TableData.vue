<!--
 * Component: Table Data
 * Version: 1.0.0
 * Author: MasProxy
 * Date Created: 2024-02-11
 * Last Modified: 2025-02-11
 * Description: This is a component for render a table data.
-->
<script setup lang="ts">
import { onBeforeMount, Ref, ref } from 'vue'

/**
 * Props for the TableData component.
 * @prop {string} width - The width of the table data. Default is ''.
 */
interface TableDataProps {
  width?: string
  last?: boolean
}

const props = withDefaults(defineProps<TableDataProps>(), {
  width: '',
  last: false,
})

const finalClass: Ref<string> = ref(
  'px-6 border-l border-b border-gray-700 py-2'
)

onBeforeMount(() => {
  if (props.width === '') {
    finalClass.value = finalClass.value + ` w-[${props.width}]`
  }

  if (props.last) {
    finalClass.value = finalClass.value + ' border-r'
  }
})
</script>

<template>
  <td v-bind="$attrs" :class="finalClass">
    <slot></slot>
  </td>
</template>
