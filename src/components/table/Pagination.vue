<!--
 * Component: Pagination
 * Version: 1.0.0
 * Author: MasProxy
 * Date Created: 2024-02-12
 * Last Modified: 2025-02-12
 * Description: This is a component for render a pagination.
-->

<script setup lang="ts">
interface PaginationProps {
  pagination: Array<{ label: string; url: string }>
  currentPage: number | string
}

withDefaults(defineProps<PaginationProps>(), {
  pagination: () => [{ label: '', url: '' }],
  currentPage: 1,
})

const emits = defineEmits(['changePage'])

/**
 * ANCHOR - function for change a page
 * @param {string} label - The label of the page.
 * @param {string} url - The url of the page.
 */
const changePage = (label: string, url: string) => {
  emits('changePage', label, url)
}
</script>

<template>
  <nav
    class="lg:w-auto pb-2 lg:pb-0 w-full"
    aria-label="Page navigation example">
    <ul
      class="flex flex-wrap lg:flex-nowrap items-center -space-x-px h-8 text-xs lg:text-sm">
      <template v-for="link in pagination">
        <li class="cursor-pointer" @click="changePage(link.label, link.url)">
          <template v-if="link.label.toLowerCase().includes('next')">
            <div
              class="flex items-center justify-center px-2 lg:px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
              <span class="sr-only">Next</span>
              <svg
                class="w-2.5 h-2.5"
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
            </div>
          </template>
          <template v-else-if="link.label.toLowerCase().includes('previous')">
            <div
              class="flex items-center justify-center px-2 lg:px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
              <span class="sr-only">Previous</span>
              <svg
                class="w-2.5 h-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 1 1 5l4 4" />
              </svg>
            </div>
          </template>
          <template v-else>
            <div
              class="z-10 flex items-center justify-center hover:bg-blue-100 px-3 h-8 leading-tight border border-gray-300 hover:text-blue-700"
              :class="
                currentPage.toString() === link.label
                  ? 'bg-primary text-white'
                  : 'bg-white'
              ">
              {{ link.label }}
            </div>
          </template>
        </li>
      </template>
    </ul>
  </nav>
</template>
