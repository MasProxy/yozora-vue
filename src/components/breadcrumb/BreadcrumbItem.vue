<!--
 * Component: BreadcrumbItem
 * Version: 1.2.0
 * Author: MasProxy
 * Date Created: 2025-02-16
 * Last Modified: 2026-06-13
 * Description: This is a component for render a breadcrumb item.
-->

<script setup lang="ts">
interface BreadcrumbItemProps {
  title?: string
  href?: string
  current?: boolean
  first?: boolean
}

withDefaults(defineProps<BreadcrumbItemProps>(), {
  title: '',
  href: '',
  current: false,
  first: false,
})

type BreadcrumbItemEmits = (e: 'redirect') => void

const emit = defineEmits<BreadcrumbItemEmits>()
</script>

<template>
  <template v-if="first">
    <li>
      <div class="flex items-center">
        <template v-if="href">
          <a
            :href="href"
            class="hover:cursor-pointer text-sm font-medium text-gray-700 hover:text-primary dark:text-dark-text dark:hover:text-primary">
            {{ title }}
          </a>
        </template>
        <template v-else>
          <div
            @click="emit('redirect')"
            class="cursor-pointer text-sm font-medium text-gray-700 hover:text-primary dark:text-dark-text dark:hover:text-primary">
            {{ title }}
          </div>
        </template>
      </div>
    </li>
  </template>
  <template v-else>
    <li v-if="current" aria-current="page">
      <div class="flex items-center">
        <svg
          class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4" />
        </svg>
        <span
          class="hover:cursor-default ms-1 font-bold text-sm md:ms-2 dark:text-dark-muted">
          {{ title }}
        </span>
      </div>
    </li>
    <li v-else>
      <div class="flex items-center">
        <svg
          class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4" />
        </svg>
        <template v-if="href">
          <a
            :href="href"
            class="hover:cursor-pointer ms-1 text-sm font-medium text-gray-700 hover:text-primary md:ms-2 dark:text-dark-muted dark:hover:text-dark-text">
            {{ title }}
          </a>
        </template>
        <template v-else>
          <div
            @click="emit('redirect')"
            class="cursor-pointer ms-1 text-sm font-medium text-gray-700 hover:text-primary md:ms-2 dark:text-dark-muted dark:hover:text-dark-text">
            {{ title }}
          </div>
        </template>
      </div>
    </li>
  </template>
</template>
