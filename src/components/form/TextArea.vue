<!--
 * Component: TextArea
 * Version: 1.0.1
 * Author: MasProxy
 * Date Created: 2025-02-19
 * Last Modified: 2025-04-03
 * Description: This is a component for text area field.
-->

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

/**
 * Props for the TextArea component.
 * @prop {string} modelValue - The model value of the text area field.
 */

interface TextAreaProps {
  modelValue?: string
}

withDefaults(defineProps<TextAreaProps>(), {
  modelValue: '',
})

/**
 * Emits the following events:
 *
 * - `update:modelValue`: Emitted when the model value is updated.
 */
defineEmits(['update:modelValue'])
</script>

<template>
  <textarea
    class="py-2 px-3 border border-gray-300 bg-white focus:!ring-primary focus:!outline-primary font-normal rounded-md shadow-sm block w-full disabled:bg-gray-50 disabled:text-gray-500"
    v-bind="$attrs"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
    :value="modelValue"></textarea>
</template>
