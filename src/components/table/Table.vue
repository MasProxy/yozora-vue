<!--
 * Component: Table
 * Version: 1.1.0
 * Author: MasProxy
 * Date Created: 2024-02-11
 * Last Modified: 2026-01-30
 * Description: This is a component for render a table.
-->
<script setup lang="ts">
import { onBeforeMount, Ref, ref } from 'vue'

interface TableProps {
  fixed?: boolean
}

const props = withDefaults(defineProps<TableProps>(), {
  fixed: false,
})

const finalClass: Ref<string> = ref('')

onBeforeMount(() => {
  if (props.fixed) {
    finalClass.value = 'table-fixed'
  }
})
</script>
<template>
  <table v-bind="$attrs" :class="finalClass">
    <slot></slot>
  </table>
</template>
