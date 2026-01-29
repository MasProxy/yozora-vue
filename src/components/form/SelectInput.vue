<!--
 * Component: Select
 * Author: MasProxy
 * Version: 1.1.0
 * Date Created: 2025-02-12
 * Last Modified: 2026-01-30
 * Description: This is a component for select.
-->

<script setup lang="ts">
/**
 * Props for the SelectInput component.
 * @prop {string} modelValue - The model value of the select input. Default is undefined.
 * @prop {boolean} small - The small state of the select input. Default is false.
 */
interface SelectInputProps {
  modelValue: string | undefined | number
  small?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<SelectInputProps>(), {
  modelValue: undefined,
  small: false,
  disabled: false,
})

defineEmits(['update:modelValue'])
</script>

<template>
  <select
    v-bind="$attrs"
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLSelectElement)?.value)
    "
    :disabled="disabled"
    :class="[
      'yozora-select appearance-none pr-7 px-2 bg-white text-sm font-normal border border-gray-300 focus:border-primary focus-visible:outline-primary rounded-md block min-w-fit disabled:bg-gray-50 disabled:text-gray-500 dark:bg-dark-surface dark:border-dark-border dark:text-dark-text dark:disabled:bg-dark-surface2 dark:disabled:text-dark-muted',
      small ? 'h-[36px]' : 'h-[42px]',
    ]">
    <slot></slot>
  </select>
</template>

<style scoped>
.yozora-select {
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" stroke="%234B5563" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 9l-7 7-7-7"></path></svg>');
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1rem;
}

.yozora-select:disabled {
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" stroke="%239CA3AF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 9l-7 7-7-7"></path></svg>');
}

:global(.dark) .yozora-select {
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" stroke="%23E2E8F0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 9l-7 7-7-7"></path></svg>');
}

:global(.dark) .yozora-select:disabled {
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" stroke="%2394A3B8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 9l-7 7-7-7"></path></svg>');
}
</style>
