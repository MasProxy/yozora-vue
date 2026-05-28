<!--
 * Component: Button
 * Version: 1.1.1
 * Author: MasProxy
 * Date Created: 2024-06-10
 * Last Modified: 2026-04-30
 * Description: This is a component for render a button.
-->

<script setup lang="ts">
import { computed } from 'vue'

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
  size?: string
  color?: string
  rounded?: string
  outline?: boolean
  textonly?: boolean
  href?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'md',
  color: 'primary',
  rounded: 'md',
  outline: false,
  textonly: false,
  href: '',
})

const finalClass = computed(() => {
  let cls = 'min-w-[80px] px-2 flex justify-center items-center font-medium disabled:cursor-default hover:cursor-pointer'

  switch (props.size) {
    case 'xs': cls += ' h-[40px] sm:h-[32px] text-sm'; break
    case 'sm': cls += ' h-[44px] sm:h-[36px] text-sm'; break
    case 'md': cls += ' h-[44px] sm:h-[40px] text-base'; break
    case 'lg': cls += ' h-[48px] text-base'; break
    case 'xl': cls += ' h-[52px] text-base'; break
  }

  if (props.outline) {
    switch (props.color) {
      case 'primary':
        cls += ' bg-white border border-primary hover:bg-primary hover:text-white text-primary disabled:border-gray-400 disabled:bg-white disabled:text-gray-400 dark:bg-dark-surface dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-white dark:disabled:border-dark-border dark:disabled:bg-dark-surface dark:disabled:text-dark-muted'
        break
      case 'secondary':
        cls += ' bg-white border border-secondary hover:bg-secondary text-secondary hover:text-white disabled:border-gray-400 disabled:bg-white disabled:text-gray-400 dark:bg-dark-surface dark:border-secondary dark:text-secondary dark:hover:bg-secondary dark:hover:text-white dark:disabled:border-dark-border dark:disabled:bg-dark-surface dark:disabled:text-dark-muted'
        break
      case 'success':
        cls += ' bg-white border border-success hover:bg-success text-success hover:text-white disabled:border-gray-400 disabled:bg-white disabled:text-gray-400 dark:bg-dark-surface dark:border-success dark:text-success dark:hover:bg-success dark:hover:text-white dark:disabled:border-dark-border dark:disabled:bg-dark-surface dark:disabled:text-dark-muted'
        break
      case 'danger':
        cls += ' bg-white border border-danger hover:bg-danger hover:text-white text-danger disabled:border-gray-400 disabled:bg-white disabled:text-gray-400 dark:bg-dark-surface dark:border-danger dark:text-danger dark:hover:bg-danger dark:hover:text-white dark:disabled:border-dark-border dark:disabled:bg-dark-surface dark:disabled:text-dark-muted'
        break
      case 'gray':
        cls += ' bg-white border border-gray-500 text-gray-500 hover:border-gray-600 hover:bg-blue-50 disabled:border-gray-400 disabled:bg-white disabled:text-gray-400 dark:bg-dark-surface dark:border-dark-border dark:text-dark-text dark:hover:bg-dark-surface2 dark:disabled:border-dark-border dark:disabled:bg-dark-surface dark:disabled:text-dark-muted'
        break
    }
  } else if (props.textonly) {
    switch (props.color) {
      case 'primary': cls += ' text-primary dark:text-primary'; break
      case 'secondary': cls += ' text-secondary dark:text-secondary'; break
      case 'success': cls += ' text-success dark:text-success'; break
      case 'danger': cls += ' text-danger dark:text-danger'; break
      case 'gray': cls += ' text-gray dark:text-gray'; break
    }
  } else {
    switch (props.color) {
      case 'primary':
        cls += ' bg-primary hover:bg-primary-hover text-white disabled:bg-gray-200 disabled:text-black dark:disabled:bg-dark-surface2 dark:disabled:text-dark-muted'
        break
      case 'secondary':
        cls += ' bg-secondary hover:bg-secondary-hover text-white disabled:bg-gray-200 disabled:text-black dark:disabled:bg-dark-surface2 dark:disabled:text-dark-muted'
        break
      case 'success':
        cls += ' bg-success hover:bg-success-hover text-white disabled:bg-gray-200 disabled:text-black dark:disabled:bg-dark-surface2 dark:disabled:text-dark-muted'
        break
      case 'danger':
        cls += ' bg-danger hover:bg-danger-hover text-white disabled:bg-gray-200 disabled:text-black dark:disabled:bg-dark-surface2 dark:disabled:text-dark-muted'
        break
      case 'gray':
        cls += ' bg-gray hover:bg-gray-second text-black disabled:bg-gray-200 disabled:text-black dark:disabled:bg-dark-surface2 dark:disabled:text-dark-muted'
        break
      case 'none':
        cls += ' bg-white border-black'
        break
    }
  }

  switch (props.rounded) {
    case 'none': cls += ' rounded-none'; break
    case 'sm': cls += ' rounded-[3px]'; break
    case 'md': cls += ' rounded-[5px]'; break
    case 'lg': cls += ' rounded-[8px]'; break
    case 'full': cls += ' rounded-full'; break
  }

  return cls
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
