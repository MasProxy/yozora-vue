<!--
 * Component: AutoCompleteInput
 * Version: 1.0.3
 * Author: MasProxy
 * Date Created: 2025-02-23
 * Last Modified: 2025-04-03
 * Description: This is a component for autocomplete input field.
-->

<script setup lang="ts">
import { computed, type Ref, ref } from 'vue'
import Spinner from '../Spinner.vue'

defineOptions({
  inheritAttrs: false,
})

/**
 * Props for the TextInput component.
 * @prop {boolean} isRequesting - Indicates if a request is being made.
 * @prop {boolean} isLinked - Indicates if the value is linked on another data.
 * @prop {string} modelValue - The model value of the input field.
 * @prop {string} errorMessage - The error message to display.
 * @prop {string} size - The size of the input field. Default is 'md'.
 * @prop {string} noDataMessage - The message to display when there is no data.
 * @prop {DataInterface[] | string[]} data - The data for the autocomplete suggestions.
 * @prop {string} optionLabel - The label to display for each option in the suggestions.
 */

interface AutoCompleteInputProps {
  isRequesting?: boolean
  isLinked?: boolean
  modelValue?: string | any
  errorMessage?: string
  size?: string
  noDataMessage?: string
  data?: any[] | string[]
  optionLabel?: string
}

const props = withDefaults(defineProps<AutoCompleteInputProps>(), {
  isRequesting: false,
  isLinked: false,
  modelValue: '',
  errorMessage: '',
  noDataMessage: 'No results found',
  data: () => [] as any[] | string[],
  size: 'md',
  optionLabel: '',
})

/**
 * Emits the following events:
 *
 * - `update:modelValue`: Emitted when the model value is updated.
 * - `completed`: Emitted when the user has completed typing.
 * - `selected`: Emitted when the user has selected an item from the suggestions.
 */
const emit = defineEmits(['update:modelValue', 'completed', 'selected'])

/**
 * ANCHOR - a final class of a text input component
 * @returns {String}
 */
const finalClass = computed<string>(() => {
  let result = ''

  result += ` ${generateSizeClass()}`
  return result
})

const isSuggestionsVisible: Ref<boolean> = ref(false)
const input: Ref<HTMLInputElement | null> = ref(null)

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

/**
 * ANCHOR - function for set a v-model value
 * @param {any} value
 */
const setValue = (value: any) => {
  emit('update:modelValue', value)
  emit('selected', value)

  input.value?.blur()
}

function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function (...args: Parameters<T>) {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

/**
 * Debounced input handler
 */
const handleInput = debounce((value: string) => {
  emit('update:modelValue', value)
  emit('completed')
}, 300)

const handleBlur = () => {
  setTimeout(() => {
    isSuggestionsVisible.value = false
  }, 100)
}
</script>

<template>
  <div class="relative">
    <input
      ref="input"
      v-bind="$attrs"
      :value="
        typeof modelValue === 'object'
          ? modelValue?.[optionLabel] ?? ''
          : modelValue
      "
      @focus="isSuggestionsVisible = true"
      @blur="handleBlur"
      @input="handleInput(($event.target as HTMLInputElement).value)"
      :class="[
        finalClass,
        isLinked || isRequesting ? 'pr-8 pl-3' : 'px-3',
        'py-2 border bg-white border-gray-300 focus:!ring-primary focus:!outline-primary font-normal rounded-md shadow-sm block w-full disabled:bg-gray-50 disabled:text-gray-500',
      ]" />
    <div
      v-if="isRequesting"
      class="absolute inset-y-0 flex items-center right-0 pe-3">
      <Spinner size="5" />
    </div>
    <div
      v-else-if="isLinked"
      class="absolute inset-y-0 flex items-center right-0 pe-3">
      <slot>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-link-45deg"
          viewBox="0 0 16 16">
          <path
            d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
          <path
            d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
        </svg>
      </slot>
    </div>
    <template v-if="errorMessage !== ''">
      <div class="text-xs text-danger font-medium mt-1">
        {{ errorMessage }}
      </div>
    </template>
    <div
      v-if="isSuggestionsVisible && modelValue !== ''"
      class="absolute w-full bg-white border border-gray-300 rounded z-20 shadow-sm font-normal">
      <ul class="divide-y max-h-[250px] overflow-y-auto">
        <template v-if="data.length > 0">
          <li
            v-for="(item, index) in data"
            :key="index"
            @mousedown.prevent="setValue(item)"
            class="pl-3 py-2 cursor-pointer hover:bg-slate-50">
            {{ typeof item === 'object' ? item?.[optionLabel] ?? '' : item }}
          </li>
        </template>
        <template v-else>
          <li class="pl-3 py-2">{{ noDataMessage }}</li>
        </template>
      </ul>
    </div>
  </div>
</template>
