<!--
 * Component: Button
 * Version: 1.1.0
 * Author: MasProxy
 * Date Created: 2024-06-10
 * Last Modified: 2026-01-30
 * Description: This is a component for render a button.
-->

<script setup lang="ts">
import { ref, onBeforeMount, type Ref } from 'vue'

defineOptions({
  inheritAttrs: false,
})

/**
 * Props for the Button component.
 *
 * @prop {string} size - The size of the button. Default is 'md'.
 * @prop {string} color - The color of the button. Default is 'primary'.
 * @prop {string} rounded - The rounded style of the button. Default is 'md'.
 * @prop {boolean} outline - If true, the button will have an outline style. Default is false.
 * @prop {boolean} textonly - If true, the button will be text only without background. Default is false.
 * @prop {string} href - The URL the button should link to. Default is an empty string.
 */

interface ButtonProps {
  size?: string // required
  color?: string // optional
  rounded?: string // optional
  outline?: boolean // optional
  textonly?: boolean // optional
  href?: string // optional
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'md',
  color: 'primary',
  rounded: 'md',
  outline: false,
  textonly: false,
  href: '',
})

const finalClass: Ref<string> = ref(
  'min-w-[80px] px-2 flex justify-center items-center font-medium disabled:cursor-default hover:cursor-pointer'
)

/**
 * ANCHOR - function for initialize a button size
 */
const initializeSize = (): void => {
  switch (props.size) {
    case 'xs':
      finalClass.value += ' h-[32px] text-xs'
      break
    case 'sm':
      finalClass.value += ' h-[36px] text-sm'
      break
    case 'md':
      finalClass.value += ' h-[40px] text-base'
      break
    case 'lg':
      finalClass.value += ' h-[48px] text-base'
      break
    case 'xl':
      finalClass.value += ' h-[52px] text-base'
      break
    default:
      break
  }
}

/**
 * ANCHOR - function for initialize a button color
 */
const initializeColor = (): void => {
  if (props.outline) {
    switch (props.color) {
      case 'primary':
        finalClass.value +=
          ' bg-white border border-primary hover:bg-primary hover:text-white text-primary disabled:border-gray-400 disabled:bg-white disabled:text-gray-400 dark:bg-dark-surface dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-white dark:disabled:border-dark-border dark:disabled:bg-dark-surface dark:disabled:text-dark-muted'
        break
      case 'secondary':
        finalClass.value +=
          ' bg-white border border-secondary hover:bg-secondary text-secondary hover:text-white disabled:border-gray-400 disabled:bg-white disabled:text-gray-400 dark:bg-dark-surface dark:border-secondary dark:text-secondary dark:hover:bg-secondary dark:hover:text-white dark:disabled:border-dark-border dark:disabled:bg-dark-surface dark:disabled:text-dark-muted'
        break
      case 'success':
        finalClass.value +=
          ' bg-white border border-success hover:bg-success text-success hover:text-white disabled:border-gray-400 disabled:bg-white disabled:text-gray-400 dark:bg-dark-surface dark:border-success dark:text-success dark:hover:bg-success dark:hover:text-white dark:disabled:border-dark-border dark:disabled:bg-dark-surface dark:disabled:text-dark-muted'
        break
      case 'danger':
        finalClass.value +=
          ' bg-white border border-danger hover:bg-danger hover:text-white text-danger disabled:border-gray-400 disabled:bg-white disabled:text-gray-400 dark:bg-dark-surface dark:border-danger dark:text-danger dark:hover:bg-danger dark:hover:text-white dark:disabled:border-dark-border dark:disabled:bg-dark-surface dark:disabled:text-dark-muted'
        break
      case 'gray':
        finalClass.value += ` bg-white border border-gray-500 text-gray-500 hover:border-gray-600 hover:bg-blue-50 disabled:border-gray-400 disabled:bg-white disabled:text-gray-400`
        finalClass.value +=
          ' dark:bg-dark-surface dark:border-dark-border dark:text-dark-text dark:hover:bg-dark-surface2 dark:disabled:border-dark-border dark:disabled:bg-dark-surface dark:disabled:text-dark-muted'
        break
      default:
        break
    }
  } else if (props.textonly) {
    switch (props.color) {
      case 'primary':
        finalClass.value += ' text-primary dark:text-primary'
        break
      case 'secondary':
        finalClass.value += ' text-secondary dark:text-secondary'
        break
      case 'success':
        finalClass.value += ' text-success dark:text-success'
        break
      case 'danger':
        finalClass.value += ' text-danger dark:text-danger'
        break
      default:
        break
    }
  } else {
    switch (props.color) {
      case 'primary':
        finalClass.value +=
          ' bg-primary hover:bg-primary-hover text-white disabled:bg-gray-200 disabled:text-black dark:disabled:bg-dark-surface2 dark:disabled:text-dark-muted'
        break
      case 'secondary':
        finalClass.value +=
          ' bg-secondary hover:bg-secondary-hover text-white disabled:bg-gray-200 disabled:text-black dark:disabled:bg-dark-surface2 dark:disabled:text-dark-muted'
        break
      case 'success':
        finalClass.value +=
          ' bg-success hover:bg-success-hover text-white disabled:bg-gray-200 disabled:text-black dark:disabled:bg-dark-surface2 dark:disabled:text-dark-muted'
        break
      case 'danger':
        finalClass.value +=
          ' bg-danger hover:bg-danger-hover text-white disabled:bg-gray-200 disabled:text-black dark:disabled:bg-dark-surface2 dark:disabled:text-dark-muted'
        break
      case 'none':
        finalClass.value += ' bg-white border-black'
        break
      default:
        break
    }
  }
}

/**
 * ANCHOR - function for initialize a button corner
 */
const initializeCorner = (): void => {
  switch (props.rounded) {
    case 'none':
      finalClass.value += ' rounded-none'
      break
    case 'sm':
      finalClass.value += ' rounded-[3px]'
      break
    case 'md':
      finalClass.value += ' rounded-[5px]'
      break
    case 'lg':
      finalClass.value += ' rounded-[8px]'
      break
    case 'full':
      finalClass.value += ' rounded-full'
      break
    default:
      break
  }
}

onBeforeMount(() => {
  initializeColor()
  initializeSize()
  initializeCorner()
})
</script>

<template>
  <template v-if="href === ''">
    <button :class="finalClass" v-bind="$attrs">
      <slot>Button</slot>
    </button>
  </template>
  <template v-else>
    <a :class="finalClass" :href="href" v-bind="$attrs">
      <slot>Button</slot>
    </a>
  </template>
</template>
