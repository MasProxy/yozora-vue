<!--
 * Component: InputLabel
 * Version: 1.0.0
 * Author: MasProxy
 * Date Created: 2024-06-10
 * Last Modified: 2025-01-19
 * Description: This is a component for render a input label.
-->

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

interface InputLabelProps {
  value?: string
  required?: boolean
}

withDefaults(defineProps<InputLabelProps>(), {
  value: '',
  required: false,
})
</script>

<template>
  <label class="block font-medium text-sm text-gray-700">
    <span v-if="value">{{ value }}</span>
    <span v-else><slot></slot></span>
    <template v-if="required">
      <span class="text-red-500">*</span>
    </template>
  </label>
</template>
