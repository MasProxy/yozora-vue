<!--
 * Component: TextInput
 * Version: 1.0.0
 * Author: MasProxy
 * Date Created: 2024-06-10
 * Last Modified: 2025-01-19
 * Description: This is a component for input field.
-->

<script setup lang="ts">
import { computed, watch } from 'vue'

defineOptions({
  inheritAttrs: false,
})

interface TextInputProps {
  modelValue?: string
  errorMessage?: string
  isCurrency?: boolean
  isNumber?: boolean
  hasIcon?: boolean
  iconPosition?: string
  size?: string
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

/**
 * Emits the following events:
 *
 * - `update:modelValue`: Emitted when the model value is updated.
 * - `iconClick`: Emitted when the icon is clicked.
 * - `useDebounce`: Emitted to indicate the use of debounce functionality.
 */
const emit = defineEmits(['update:modelValue', 'iconClick', 'useDebounce'])

/**
 * ANCHOR - function for validate a value
 */
const validateValue = (value: string) => {
  if (props.isCurrency) {
    emit('update:modelValue', validateCurrency(value))
  } else if (props.isNumber) {
    emit('update:modelValue', validateNumber(value))
  } else {
    emit('update:modelValue', value)
  }
}

/**
 * ANCHOR - function for validate a number
 */
const validateNumber = (value: string): string => {
  let tempValue = value.replace(/\D/g, '')

  return tempValue
}

/**
 * ANCHOR - function for validate a currency
 */
const validateCurrency = (value: string): string => {
  let tempValue = value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  if (tempValue === '') {
    tempValue = '0'
  }
  if (tempValue.length > 1) {
    if (tempValue[0] === '0') {
      tempValue = tempValue.slice(1)
    }
  }

  return tempValue
}

watch(
  () => props.modelValue,
  (newValue) => {
    validateValue(newValue)
  },
  { deep: true }
)

/**
 * ANCHOR - a final class of a text input component
 * @returns {String}
 */
const finalClass = computed<string>(() => {
  let result = ''

  if (props.hasIcon && props.iconPosition === 'left') {
    result = 'pl-9'
  } else if (props.hasIcon && props.iconPosition === 'right') {
    result = 'pr-9'
  }

  result += ` ${generateSizeClass()}`
  return result
})

/**
 * ANCHOR - function for generate a size class
 * @returns {String}
 */
const generateSizeClass = (): string => {
  let result = ''

  if (props.size === 'sm') {
    result = 'text-sm h-[36px]'
  } else if (props.size === 'md') {
    result = 'text-base'
  } else if (props.size === 'lg') {
    result = 'text-lg'
  }

  return result
}
</script>

<template>
  <div class="relative">
    <input
      v-bind="$attrs"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :class="[
        finalClass,
        'py-2 px-3 border border-gray-300 focus:!ring-primary focus:!outline-primary font-normal rounded-md shadow-sm block w-full disabled:bg-gray-50 disabled:text-gray-500',
      ]" />
    <template v-if="hasIcon">
      <div
        class="absolute inset-y-0 flex items-center text-black"
        @click="$emit('iconClick')"
        :class="iconPosition === 'left' ? 'left-0 ps-3' : 'right-0 pe-3'">
        <slot></slot>
      </div>
    </template>
    <template v-if="errorMessage !== ''">
      <div class="text-xs text-danger font-medium mt-1">
        {{ errorMessage }}
      </div>
    </template>
  </div>
</template>
