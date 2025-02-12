<!--
 * Component: Select
 * Author: MasProxy
 * Date Created: 2025-02-12
 * Last Modified: 2025-02-12
 * Description: This is a component for select.
-->

<script setup lang="ts">
/**
 * Props for the SelectInput component.
 * @prop {string} modelValue - The model value of the select input. Default is undefined.
 * @prop {boolean} small - The small state of the select input. Default is false.
 */
interface SelectInputProps {
  modelValue: string | undefined
  small?: boolean
}

withDefaults(defineProps<SelectInputProps>(), {
  modelValue: undefined,
  small: false,
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
    :class="small ? 'h-[36px]' : 'h-[42px]'"
    class="text-sm font-normal border-gray-300 focus:ring-primary focus:border-primary rounded-md shadow-sm block w-full disabled:bg-gray-50 disabled:text-gray-500">
    <slot></slot>
  </select>
</template>
