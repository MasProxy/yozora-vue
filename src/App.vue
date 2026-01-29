<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import Button from './components/Button.vue'
import Modal from './components/Modal.vue'
import Spinner from './components/Spinner.vue'
import Breadcrumb from './components/breadcrumb/Breadcrumb.vue'
import BreadcrumbItem from './components/breadcrumb/BreadcrumbItem.vue'
import InputLabel from './components/form/InputLabel.vue'
import TextInput from './components/form/TextInput.vue'
import TextArea from './components/form/TextArea.vue'
import SelectInput from './components/form/SelectInput.vue'
import TagInput from './components/form/TagInput.vue'
import AutoCompleteInput from './components/form/AutoCompleteInput.vue'
import Table from './components/table/Table.vue'
import TableHeader from './components/table/TableHeader.vue'
import TableData from './components/table/TableData.vue'
import Pagination from './components/table/Pagination.vue'

const isDark = ref(false)
const showModal = ref(false)

const textValue = ref('Hello')
const areaValue = ref('This is a text area')
const selectValue = ref('option-1')
const tagsValue = ref<string[]>(['Vue', 'Tailwind'])
const autoValue = ref('')

const tableRows = ref([
  { name: 'Yozora', role: 'UI Kit', status: 'Active' },
  { name: 'MasProxy', role: 'Author', status: 'Active' },
  { name: 'Copilot', role: 'Assistant', status: 'Idle' },
])

const pagination = ref([
  { label: 'Previous', url: '#' },
  { label: '1', url: '#' },
  { label: '2', url: '#' },
  { label: '3', url: '#' },
  { label: 'Next', url: '#' },
])

const autoData = ref([
  'Buttons',
  'Inputs',
  'Tables',
  'Modals',
  'Breadcrumbs',
  'Pagination',
])

const applyThemeClass = (value: boolean) => {
  document.documentElement.classList.toggle('dark', value)
}

onMounted(() => {
  applyThemeClass(isDark.value)
})

watch(isDark, (value) => {
  applyThemeClass(value)
})
</script>

<template>
  <div :class="['min-h-screen', isDark ? 'dark' : '']">
    <div
      class="min-h-screen bg-white text-black dark:bg-dark-surface2 dark:text-dark-text">
      <header
        class="px-6 py-6 border-b border-gray-200 dark:border-dark-border">
        <div
          class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 class="text-2xl font-semibold">Yozora UI Theme Test</h1>
            <p class="text-sm text-gray-600 dark:text-dark-muted">
              Toggle light/dark mode and preview all components.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Button size="sm" outline @click="isDark = !isDark">
              {{ isDark ? 'Light Mode' : 'Dark Mode' }}
            </Button>
            <Button size="sm" color="secondary" @click="showModal = true">
              Open Modal
            </Button>
          </div>
        </div>
      </header>

      <main class="px-6 py-8 space-y-10">
        <section class="space-y-4">
          <h2 class="text-lg font-semibold">Breadcrumb</h2>
          <Breadcrumb>
            <BreadcrumbItem title="Home" href="#" first />
            <BreadcrumbItem title="Library" href="#" />
            <BreadcrumbItem title="Components" current />
          </Breadcrumb>
        </section>

        <section class="space-y-4">
          <h2 class="text-lg font-semibold">Buttons</h2>
          <div class="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="success">Success</Button>
            <Button color="danger">Danger</Button>
            <Button outline>Outline</Button>
            <Button textonly>Text Only</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <section class="space-y-6">
          <h2 class="text-lg font-semibold">Form Inputs</h2>
          <div class="grid gap-6 md:grid-cols-2">
            <div class="space-y-2">
              <InputLabel value="Text Input" />
              <TextInput v-model="textValue" placeholder="Type here" />
            </div>
            <div class="space-y-2">
              <InputLabel value="Text Area" />
              <TextArea v-model="areaValue" rows="3" />
            </div>
            <div class="space-y-2">
              <InputLabel value="Select" />
              <SelectInput v-model="selectValue">
                <option value="option-1">Option 1</option>
                <option value="option-2">Option 2</option>
                <option value="option-3">Option 3</option>
              </SelectInput>
            </div>
            <div class="space-y-2">
              <InputLabel value="Tag Input" />
              <TagInput v-model="tagsValue" placeholder="Add tags" />
            </div>
            <div class="space-y-2 md:col-span-2">
              <InputLabel value="Autocomplete" />
              <AutoCompleteInput
                v-model="autoValue"
                :data="autoData"
                no-data-message="No results"
                placeholder="Search components" />
            </div>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="text-lg font-semibold">Table</h2>
          <div
            class="overflow-x-auto rounded-lg border border-gray-200 dark:border-dark-border">
            <Table class="w-full">
              <thead>
                <tr>
                  <TableHeader bgColor="#517C99">Name</TableHeader>
                  <TableHeader bgColor="#517C99">Role</TableHeader>
                  <TableHeader bgColor="#517C99">Status</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in tableRows" :key="row.name">
                  <TableData>{{ row.name }}</TableData>
                  <TableData>{{ row.role }}</TableData>
                  <TableData>{{ row.status }}</TableData>
                </tr>
              </tbody>
            </Table>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="text-lg font-semibold">Pagination</h2>
          <Pagination :pagination="pagination" :current-page="2" />
        </section>

        <section class="space-y-4">
          <h2 class="text-lg font-semibold">Spinner</h2>
          <div class="flex items-center gap-4">
            <Spinner size="6" />
            <Spinner size="10" color="danger" />
          </div>
        </section>
      </main>
    </div>
  </div>

  <Modal :is-show="showModal" size="md" @close="showModal = false">
    <template #header>
      <h3 class="text-lg font-semibold">Preview Modal</h3>
    </template>
    <template #body>
      <p class="text-sm text-gray-600 dark:text-dark-muted">
        This modal adapts to the selected theme.
      </p>
    </template>
    <template #footer>
      <Button outline @click="showModal = false">Close</Button>
      <Button color="primary" @click="showModal = false">Confirm</Button>
    </template>
  </Modal>
</template>
