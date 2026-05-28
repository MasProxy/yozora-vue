<!--
 * Component: TextInput
 * Version: 1.1.0
 * Author: MasProxy
 * Date Created: 2024-06-10
 * Last Modified: 2026-01-30
 * Description: This is a component for input field.
-->

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false,
})

/**
 * Props for the TextInput component.
 * @prop {string} modelValue - The model value of the input field.
 * @prop {string} errorMessage - The error message to display.
 * @prop {boolean} isCurrency - If true, the input field will format the value as currency. Default is false.
 * @prop {boolean} isNumber - If true, the input field will format the value as number. Default is false.
 * @prop {boolean} hasIcon - If true, the input field will have an icon. Default is false.
 * @prop {string} iconPosition - The position of the icon. Default is 'right'.
 * @prop {string} size - The size of the input field. Default is 'md'.
 */

interface TextInputProps {
  modelValue?: string
  errorMessage?: string
  isCurrency?: boolean
  isNumber?: boolean
  hasIcon?: boolean
  iconPosition?: 'left' | 'right'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<TextInputProps>(), {
  modelValue: '',
  errorMessage: '',
  isCurrency: false,
  isNumber: false,
  hasIcon: false,
  iconPosition: 'right',
  size: 'md',
})

const emit = defineEmits(['update:modelValue', 'iconClick'])

function stripNonDigits(value: string): string {
  return value.replaceAll(/\D/g, '').replace(/^0+(?!$)/, '')
}

function toCurrency(value: string): string {
  const digits = stripNonDigits(value)
  if (!digits) return ''
  return digits.replaceAll(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function handleInput(event: Event): void {
  const el = event.target as HTMLInputElement | null
  if (!el) return

  const raw = el.value
  let formatted: string

  if (props.isCurrency) {
    formatted = toCurrency(raw)
  } else if (props.isNumber) {
    formatted = stripNonDigits(raw)
  } else {
    formatted = raw
  }

  if (formatted !== raw) el.value = formatted
  emit('update:modelValue', formatted)
}

const paddingClass = computed(() => {
  if (!props.hasIcon) return ''
  return props.iconPosition === 'left' ? 'pl-9' : 'pr-9'
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm h-[40px] sm:h-[36px]'
    case 'lg':
      return 'text-lg h-[48px]'
    default:
      return 'text-base h-[44px]'
  }
})
</script>

<template>
  <div class="relative">
    <input
      v-bind="$attrs"
      :value="modelValue"
      :class="[
        paddingClass,
        sizeClass,
        'py-2 px-3 bg-white border border-gray-300 focus:ring-primary! focus:outline-primary! font-normal rounded-md shadow-sm block w-full disabled:bg-gray-50 disabled:text-gray-500 dark:bg-dark-surface dark:border-dark-border dark:text-dark-text dark:placeholder:text-dark-muted dark:disabled:bg-dark-surface2 dark:disabled:text-dark-muted',
      ]"
      @input="handleInput" />
    <template v-if="hasIcon">
      <div
        class="absolute inset-y-0 flex items-center text-black dark:text-dark-text"
        :class="iconPosition === 'left' ? 'left-0 ps-3' : 'right-0 pe-3'"
        @click="$emit('iconClick')">
        <slot />
      </div>
    </template>
    <template v-if="errorMessage">
      <div class="text-xs text-danger font-medium mt-1">
        {{ errorMessage }}
      </div>
    </template>
  </div>
</template>
