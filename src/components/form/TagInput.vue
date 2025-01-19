<!--
 * Component: TagInput
 * Version: 1.0.0
 * Author: MasProxy
 * Date Created: 2024-06-10
 * Last Modified: 2025-01-19
 * Description: This is a component for make a multiple value on input like a tag.
-->

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, type Ref, computed } from 'vue'

/**
 * Props for the TagInput component.
 * @prop {string[]} modelValue - The model value of the tag input.
 * @prop {number | string} limit - The limit of the tags. Default is -1.
 * @prop {string} bgColor - The background color of the tags. Default is '#f66b0e'.
 * @prop {string} textColor - The text color of the tags. Default is ''.
 */

interface TagInputProps {
  modelValue?: string[]
  limit?: number | string
  bgColor?: string
  textColor?: string
}

const props = withDefaults(defineProps<TagInputProps>(), {
  modelValue: () => [],
  limit: -1,
  bgColor: '#f66b0e',
  textColor: '',
})

const emit = defineEmits(['update:modelValue'])

const newTag: Ref<string> = ref('')
const paddingLeft: Ref<number> = ref(10)
const tags: Ref<string[]> = ref(props.modelValue)
const tagsUl: Ref<HTMLElement | null> = ref(null)

/**
 * ANCHOR - function for add a tag
 * @param {string} tag - The tag to add.
 */
const addTag = (tag: string) => {
  const limit = Number(props.limit)

  if (limit !== -1) {
    if (tags.value.length < limit) {
      tags.value.push(tag) // add the new tag to the tags array
      newTag.value = '' // reset newTag
    }
  } else {
    tags.value.push(tag) // add the new tag to the tags array
    newTag.value = '' // reset newTag
  }
}

/**
 * ANCHOR - function for remove a tag
 * @param {number} index
 */
const removeTag = (index: number) => {
  tags.value.splice(index, 1)
}

/**
 * ANCHOR - function for set a left padding for input
 */
const setLeftPadding = () => {
  const extraCushion = 15
  if (tagsUl.value !== null) {
    paddingLeft.value = tagsUl.value.clientWidth + extraCushion
    tagsUl.value.scrollTo(tagsUl.value.scrollWidth, 0)
  }
}

watch(tags, () => nextTick(setLeftPadding), { deep: true })

/**
 * ANCHOR - a text color variable
 * @returns {string}
 */
const tagTextColor = computed(() => {
  if (props.textColor) {
    return props.textColor
  }

  const hex = colorToHex(props.bgColor).replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000

  return yiq >= 128 || props.bgColor === '#f66b0e' ? 'white' : 'black'
})

/**
 * ANCHOR - function to convert color names to hex
 * @param {string} color - The color name or hex value.
 * @returns {string} - The hex value of the color.
 */
const colorToHex = (color: string): string => {
  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) return '#000000'
  ctx.fillStyle = color
  return ctx.fillStyle
}

/**
 * ANCHOR - function for handle tags change
 */
const onTagsChange = () => {
  if (tagsUl.value !== null) {
    // set left padding
    const extraCushion = 15
    paddingLeft.value = tagsUl.value.clientWidth + extraCushion

    // scroll tags ul to end
    tagsUl.value.scrollTo(tagsUl.value.scrollWidth, 0)

    emit('update:modelValue', tags.value)
  }
}

watch(tags, () => nextTick(onTagsChange), { deep: true })

onMounted(() => {
  onTagsChange()
  setLeftPadding()
})
</script>

<template>
  <div class="tag-input">
    <input
      class="py-2 px-3 border border-gray-300 focus:!ring-primary focus:!outline-primary font-normal rounded-md shadow-sm block w-full disabled:bg-gray-50 disabled:text-gray-500"
      v-model="newTag"
      :disabled="tags.length >= Number(limit) && Number(limit) !== -1"
      :style="{ 'padding-left': `${paddingLeft}px` }"
      @keydown.prevent.enter="addTag(newTag)"
      @keydown.prevent.tab="addTag(newTag)"
      @keydown.delete="newTag.length || removeTag(tags.length - 1)"
      type="text"
      enterkeyhint="enter" />
    <ul class="tags" ref="tagsUl">
      <li
        v-for="(tag, index) in tags"
        :key="tag"
        class="tag"
        :style="{ color: tagTextColor, background: bgColor }">
        {{ tag }}
        <button
          class="delete"
          :style="{ color: tagTextColor }"
          @click="removeTag(index)">
          x
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.tag-input {
  position: relative;
}

ul {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 10px;
  max-width: 75%;
  overflow-x: auto;
}

.tag {
  padding: 2px 5px;
  border-radius: 4px;
  white-space: nowrap;
  transition: background 0.1s ease;
}

.delete {
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
}
</style>
