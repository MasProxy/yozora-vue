<!--
 * Component: Modal
 * Version: 1.0.2
 * Author: MasProxy
 * Date Created: 2025-02-19
 * Last Modified: 2025-02-20
 * Description: This is a component for modal.
-->

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue'

/**
 * Props for the Modal component.
 * @prop {boolean} isShow - If true, the modal will be open. Default is false.
 * @prop {string} size - The size of the modal. Default is 'md'.
 */
interface ModalProps {
  isShow?: boolean
  size?: string
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ModalProps>(), {
  isShow: false,
  size: 'md',
})

/**
 * ANCHOR - function for generate size class of modal
 */
const generateSizeClass = () => {
  let result = ''
  switch (props.size) {
    case 'xs':
      result = 'max-w-xs'
      break
    case 'sm':
      result = 'max-w-sm'
      break
    case 'md':
      result = 'max-w-md'
      break
    case 'lg':
      result = 'max-w-lg'
      break
    case 'xl':
      result = 'max-w-xl'
      break
    case '2xl':
      result = 'max-w-2xl'
      break
    case '3xl':
      result = 'max-w-3xl'
      break
    case '4xl':
      result = 'max-w-4xl'
      break
    default:
      break
  }

  return result
}

defineEmits(['close'])

const finalClass: Ref<string> = ref('')

onMounted(() => {
  finalClass.value = generateSizeClass()
})
</script>

<template>
  <Teleport to="body">
    <template v-if="isShow">
      <section
        v-bind="$attrs"
        :class="[
          'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-[100] p-4 overflow-x-hidden overflow-y-auto max-h-[90svh]',
          finalClass,
        ]">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow-sm h-full w-full">
          <!-- Modal header -->
          <div
            v-if="$slots.header"
            class="flex items-center justify-between py-2 lg:py-4 px-4 border-b border-gray-200 rounded-t">
            <slot name="header"></slot>
            <button
              type="button"
              @click="$emit('close')"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="grow p-6 space-y-6">
            <slot name="body"></slot>
          </div>
          <!-- Modal footer -->
          <div
            v-if="$slots.footer"
            class="flex items-center px-6 py-3 space-x-2 border-t border-gray-200 rounded-b">
            <slot name="footer"></slot>
          </div>
        </div>
      </section>
      <div
        class="h-[100svh] w-[100svw] bg-[#000000]/40 fixed top-0 left-0 z-[50]"></div>
    </template>
  </Teleport>
</template>
