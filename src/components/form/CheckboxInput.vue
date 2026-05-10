<!--
 * Component: CheckboxInput
 * Version: 1.0.0
 * Author: MasProxy
 * Date Created: 2026-05-10
 * Last Modified: 2026-05-10
 * Description: This is a component for a checkbox input field.
-->

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false,
})

/**
 * Props for the CheckboxInput component.
 * @prop {boolean} modelValue - The model value of the checkbox. Default is false.
 * @prop {boolean} disabled - If true, the checkbox is disabled. Default is false.
 * @prop {string} errorMessage - The error message to display.
 * @prop {string} size - The size of the checkbox. Default is 'md'.
 */

interface CheckboxInputProps {
  modelValue?: boolean
  disabled?: boolean
  errorMessage?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<CheckboxInputProps>(), {
  modelValue: false,
  disabled: false,
  errorMessage: '',
  size: 'md',
})

const emit = defineEmits(['update:modelValue'])

function handleChange(event: Event): void {
  const el = event.target as HTMLInputElement | null
  if (!el) return
  emit('update:modelValue', el.checked)
}

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-3.5 h-3.5 text-sm'
    case 'lg':
      return 'w-5 h-5 text-lg'
    default:
      return 'w-4 h-4 text-base'
  }
})
</script>

<template>
  <div>
    <label class="inline-flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        v-bind="$attrs"
        :checked="modelValue"
        :disabled="disabled"
        :class="[sizeClass, 'accent-primary rounded']"
        @change="handleChange" />
      <slot />
    </label>
    <template v-if="errorMessage">
      <div class="text-xs text-danger font-medium mt-1">
        {{ errorMessage }}
      </div>
    </template>
  </div>
</template>
