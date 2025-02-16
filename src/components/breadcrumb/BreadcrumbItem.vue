<!--
 * Component: BreadcrumbItem
 * Version: 1.0.0
 * Author: MasProxy
 * Date Created: 2025-02-16
 * Last Modified: 2025-02-16
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
  href: '#',
  current: false,
  first: false,
})
</script>

<template>
  <template v-if="first">
    <li>
      <div class="flex items-center">
        <template v-if="href === '#'">
          <span
            class="hover:cursor-pointer text-sm font-medium text-gray-700 hover:text-primary">
            {{ title }}
          </span>
        </template>
        <template v-else>
          <a
            :href="href"
            class="hover:cursor-pointer text-sm font-medium text-gray-700 hover:text-primary">
            {{ title }}
          </a>
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
          class="hover:cursor-default ms-1 font-bold text-sm md:ms-2 dark:text-gray-400">
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
        <template v-if="href === '#'">
          <span
            class="hover:cursor-pointer ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
            {{ title }}
          </span>
        </template>
        <template v-else>
          <a
            :href="href"
            class="hover:cursor-pointer ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
            {{ title }}
          </a>
        </template>
      </div>
    </li>
  </template>
</template>
