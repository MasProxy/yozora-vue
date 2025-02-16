<!--
 * Component: Breadcrumb
 * Version: 1.0.0
 * Author: MasProxy
 * Date Created: 2025-02-16
 * Last Modified: 2025-02-16
 * Description: This is a component for render a breadcrumb wrapper.
-->

<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol
      class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      <slot></slot>
    </ol>
  </nav>
</template>
