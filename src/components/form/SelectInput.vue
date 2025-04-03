<!--
 * Component: Select
 * Author: MasProxy
 * Version: 1.0.3
 * Date Created: 2025-02-12
 * Last Modified: 2025-04-03
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

const arrowStyle = {
  backgroundImage: props.disabled
    ? 'url(\'data:image/svg+xml;utf8,<svg fill="none" stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 9l-7 7-7-7"></path></svg>\')'
    : 'url(\'data:image/svg+xml;utf8,<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 9l-7 7-7-7"></path></svg>\')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.5rem center',
  backgroundSize: '1rem',
}

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
    :style="arrowStyle"
    :class="[
      'appearance-none pr-7 px-2 bg-white text-sm font-normal border border-gray-300 focus:border-primary focus-visible:outline-primary rounded-md block min-w-fit disabled:bg-gray-50 disabled:text-gray-500',
      small ? 'h-[36px]' : 'h-[42px]',
    ]">
    <slot></slot>
  </select>
</template>
