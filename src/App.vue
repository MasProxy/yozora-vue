<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
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

function applyTheme(value: boolean) {
  document.documentElement.classList.toggle('dark', value)
}
onMounted(() => applyTheme(isDark.value))
watch(isDark, applyTheme)

const btnColors = ['primary', 'secondary', 'success', 'danger', 'gray', 'none'] as const
const btnSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const btnRounded = ['none', 'sm', 'md', 'lg', 'full'] as const
const inputSizes = ['sm', 'md', 'lg'] as const
const spinnerSizes = Array.from({ length: 20 }, (_, i) => String(i + 1))
const spinnerColors = ['primary', 'secondary', 'success', 'danger', 'gray', 'black', 'white'] as const
const modalSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const

const btnCfg = reactive({ color: 'primary', size: 'md', rounded: 'md', outline: false, textonly: false, disabled: false })

const inputValue = ref('')
const inputCfg = reactive({ size: 'md' as 'sm' | 'md' | 'lg', hasIcon: false, iconPosition: 'right' as 'left' | 'right', isCurrency: false, isNumber: false, errorMessage: '', placeholder: 'Type here' })

const areaValue = ref('')

const selectValue = ref('option-1')
const selectCfg = reactive({ small: false, disabled: false })

const tagsValue = ref<string[]>(['Vue', 'Tailwind'])
const tagCfg = reactive({ limit: -1, bgColor: '#f66b0e' })

const autoValue = ref('')
const autoData = ref(['Buttons', 'Inputs', 'Tables', 'Modals', 'Breadcrumbs', 'Pagination'])
const autoCfg = reactive({ errorMessage: '', isRequesting: false, isLinked: false })

const tableRows = ref([
  { name: 'Yozora', role: 'UI Kit', status: 'Active' },
  { name: 'MasProxy', role: 'Author', status: 'Active' },
  { name: 'Copilot', role: 'Assistant', status: 'Idle' },
])
const tableCfg = reactive({ borderless: false, headerBgColor: '#517C99' })

const paginationItems = ref([
  { label: 'Previous', url: '#' },
  { label: '1', url: '#' },
  { label: '2', url: '#' },
  { label: '3', url: '#' },
  { label: 'Next', url: '#' },
])
const currentPage = ref(2)
const paginationLog = ref('')

function onPageChange(label: string) {
  const num = Number(label)
  if (!Number.isNaN(num)) currentPage.value = num
  paginationLog.value = `Clicked: ${label}`
}

const spinnerCfg = reactive({ size: '8', color: 'secondary' })

const showModal = ref(false)
const modalSize = ref('md')
</script>

<template>
  <div :class="isDark ? 'dark' : ''">
    <div class="min-h-screen bg-white text-black dark:bg-dark-surface2 dark:text-dark-text">
      <header class="px-6 py-6 border-b border-gray-200 dark:border-dark-border">
        <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 class="text-2xl font-semibold">Yozora UI — Component Playground</h1>
            <p class="text-sm text-gray-600 dark:text-dark-muted">
              Toggle controls to test every prop and state.
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

        <!-- Breadcrumb -->
        <section class="space-y-4">
          <h2 class="text-lg font-semibold border-b pb-1 border-gray-200 dark:border-dark-border">Breadcrumb</h2>
          <div class="border rounded-lg p-4 dark:border-dark-border space-y-4">
            <Breadcrumb>
              <BreadcrumbItem title="Home" href="#" first />
              <BreadcrumbItem title="Library" href="#" />
              <BreadcrumbItem title="Components" current />
            </Breadcrumb>
            <p class="text-xs text-gray-500">Uses <code>first</code>, <code>href</code>, and <code>current</code> props.</p>
          </div>
        </section>

        <!-- Button -->
        <section class="space-y-4">
          <h2 class="text-lg font-semibold border-b pb-1 border-gray-200 dark:border-dark-border">Button</h2>
          <div class="border rounded-lg p-4 dark:border-dark-border space-y-4">
            <div class="flex flex-wrap gap-3 items-center">
              <Button v-bind="btnCfg">Button</Button>
            </div>
            <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <label class="flex items-center gap-1.5">
                <span class="text-gray-500">color:</span>
                <select v-model="btnCfg.color" class="border rounded px-2 py-1 text-sm dark:bg-dark-surface dark:border-dark-border">
                  <option v-for="c in btnColors" :key="c" :value="c">{{ c }}</option>
                </select>
              </label>
              <label class="flex items-center gap-1.5">
                <span class="text-gray-500">size:</span>
                <select v-model="btnCfg.size" class="border rounded px-2 py-1 text-sm dark:bg-dark-surface dark:border-dark-border">
                  <option v-for="s in btnSizes" :key="s" :value="s">{{ s }}</option>
                </select>
              </label>
              <label class="flex items-center gap-1.5">
                <span class="text-gray-500">rounded:</span>
                <select v-model="btnCfg.rounded" class="border rounded px-2 py-1 text-sm dark:bg-dark-surface dark:border-dark-border">
                  <option v-for="r in btnRounded" :key="r" :value="r">{{ r }}</option>
                </select>
              </label>
              <label class="flex items-center gap-1">
                <input type="checkbox" v-model="btnCfg.outline" class="accent-primary" />
                outline
              </label>
              <label class="flex items-center gap-1">
                <input type="checkbox" v-model="btnCfg.textonly" class="accent-primary" />
                textonly
              </label>
              <label class="flex items-center gap-1">
                <input type="checkbox" v-model="btnCfg.disabled" class="accent-primary" />
                disabled
              </label>
            </div>
          </div>
        </section>

        <!-- Spinner -->
        <section class="space-y-4">
          <h2 class="text-lg font-semibold border-b pb-1 border-gray-200 dark:border-dark-border">Spinner</h2>
          <div class="border rounded-lg p-4 dark:border-dark-border space-y-4">
            <div class="flex flex-wrap items-center gap-4">
              <Spinner v-bind="spinnerCfg" />
              <span class="text-sm text-gray-500">size={{ spinnerCfg.size }} color={{ spinnerCfg.color }}</span>
            </div>
            <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <label class="flex items-center gap-1.5">
                <span class="text-gray-500">size:</span>
                <select v-model="spinnerCfg.size" class="border rounded px-2 py-1 text-sm dark:bg-dark-surface dark:border-dark-border">
                  <option v-for="s in spinnerSizes" :key="s" :value="s">{{ s }}</option>
                </select>
              </label>
              <label class="flex items-center gap-1.5">
                <span class="text-gray-500">color:</span>
                <select v-model="spinnerCfg.color" class="border rounded px-2 py-1 text-sm dark:bg-dark-surface dark:border-dark-border">
                  <option v-for="c in spinnerColors" :key="c" :value="c">{{ c }}</option>
                </select>
              </label>
            </div>
          </div>
        </section>

        <!-- TextInput -->
        <section class="space-y-4">
          <h2 class="text-lg font-semibold border-b pb-1 border-gray-200 dark:border-dark-border">TextInput</h2>
          <div class="border rounded-lg p-4 dark:border-dark-border space-y-4">
            <div class="max-w-sm space-y-2">
              <InputLabel value="TextInput" />
              <TextInput v-model="inputValue" v-bind="inputCfg" />
              <p class="text-xs text-gray-500">value: "{{ inputValue }}"</p>
            </div>
            <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <label class="flex items-center gap-1.5">
                <span class="text-gray-500">size:</span>
                <select v-model="inputCfg.size" class="border rounded px-2 py-1 text-sm dark:bg-dark-surface dark:border-dark-border">
                  <option v-for="s in inputSizes" :key="s" :value="s">{{ s }}</option>
                </select>
              </label>
              <label class="flex items-center gap-1">
                <input type="checkbox" v-model="inputCfg.isCurrency" class="accent-primary" />
                isCurrency
              </label>
              <label class="flex items-center gap-1">
                <input type="checkbox" v-model="inputCfg.isNumber" class="accent-primary" />
                isNumber
              </label>
              <label class="flex items-center gap-1">
                <input type="checkbox" v-model="inputCfg.hasIcon" class="accent-primary" />
                hasIcon
              </label>
              <template v-if="inputCfg.hasIcon">
                <label class="flex items-center gap-1.5">
                  <span class="text-gray-500">iconPosition:</span>
                  <select v-model="inputCfg.iconPosition" class="border rounded px-2 py-1 text-sm dark:bg-dark-surface dark:border-dark-border">
                    <option value="left">left</option>
                    <option value="right">right</option>
                  </select>
                </label>
                <span class="text-xs text-gray-400 italic">(slot content shows here)</span>
              </template>
              <label class="flex items-center gap-1.5">
                <span class="text-gray-500">error:</span>
                <input type="text" v-model="inputCfg.errorMessage" placeholder="leave empty for none" class="border rounded px-2 py-1 text-sm w-40 dark:bg-dark-surface dark:border-dark-border" />
              </label>
            </div>
          </div>
        </section>

        <!-- TextArea -->
        <section class="space-y-4">
          <h2 class="text-lg font-semibold border-b pb-1 border-gray-200 dark:border-dark-border">TextArea</h2>
          <div class="border rounded-lg p-4 dark:border-dark-border space-y-4">
            <div class="max-w-sm space-y-2">
              <InputLabel value="TextArea" />
              <TextArea v-model="areaValue" rows="3" />
              <p class="text-xs text-gray-500">value: "{{ areaValue }}"</p>
            </div>
            <p class="text-xs text-gray-500">Native textarea — no props to toggle.</p>
          </div>
        </section>

        <!-- SelectInput -->
        <section class="space-y-4">
          <h2 class="text-lg font-semibold border-b pb-1 border-gray-200 dark:border-dark-border">SelectInput</h2>
          <div class="border rounded-lg p-4 dark:border-dark-border space-y-4">
            <div class="max-w-xs space-y-2">
              <InputLabel value="SelectInput" />
              <SelectInput v-model="selectValue" v-bind="selectCfg">
                <option value="option-1">Option 1</option>
                <option value="option-2">Option 2</option>
                <option value="option-3">Option 3</option>
              </SelectInput>
              <p class="text-xs text-gray-500">selected: "{{ selectValue }}"</p>
            </div>
            <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <label class="flex items-center gap-1">
                <input type="checkbox" v-model="selectCfg.small" class="accent-primary" />
                small
              </label>
              <label class="flex items-center gap-1">
                <input type="checkbox" v-model="selectCfg.disabled" class="accent-primary" />
                disabled
              </label>
            </div>
          </div>
        </section>

        <!-- TagInput -->
        <section class="space-y-4">
          <h2 class="text-lg font-semibold border-b pb-1 border-gray-200 dark:border-dark-border">TagInput</h2>
          <div class="border rounded-lg p-4 dark:border-dark-border space-y-4">
            <div class="max-w-md space-y-2">
              <InputLabel value="TagInput" />
              <TagInput v-model="tagsValue" v-bind="tagCfg" :placeholder="tagCfg.limit !== -1 ? `Max ${tagCfg.limit} tags` : 'Add tags'" />
              <p class="text-xs text-gray-500">tags: {{ JSON.stringify(tagsValue) }}</p>
            </div>
            <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <label class="flex items-center gap-1.5">
                <span class="text-gray-500">limit:</span>
                <input type="number" v-model.number="tagCfg.limit" class="border rounded px-2 py-1 text-sm w-20 dark:bg-dark-surface dark:border-dark-border" />
                <span class="text-xs text-gray-400">(-1 = unlimited)</span>
              </label>
              <label class="flex items-center gap-1.5">
                <span class="text-gray-500">bgColor:</span>
                <input type="text" v-model="tagCfg.bgColor" class="border rounded px-2 py-1 text-sm w-28 dark:bg-dark-surface dark:border-dark-border" />
                <span class="w-5 h-5 rounded inline-block border" :style="{ background: tagCfg.bgColor }"></span>
              </label>
            </div>
          </div>
        </section>

        <!-- AutoCompleteInput -->
        <section class="space-y-4">
          <h2 class="text-lg font-semibold border-b pb-1 border-gray-200 dark:border-dark-border">AutoCompleteInput</h2>
          <div class="border rounded-lg p-4 dark:border-dark-border space-y-4">
            <div class="max-w-sm space-y-2">
              <InputLabel value="AutoCompleteInput" />
              <AutoCompleteInput v-model="autoValue" :data="autoData" v-bind="autoCfg" no-data-message="No results" placeholder="Search..." />
              <p class="text-xs text-gray-500">value: "{{ autoValue }}"</p>
            </div>
            <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <label class="flex items-center gap-1">
                <input type="checkbox" v-model="autoCfg.isRequesting" class="accent-primary" />
                isRequesting
              </label>
              <label class="flex items-center gap-1">
                <input type="checkbox" v-model="autoCfg.isLinked" class="accent-primary" />
                isLinked
              </label>
              <label class="flex items-center gap-1.5">
                <span class="text-gray-500">error:</span>
                <input type="text" v-model="autoCfg.errorMessage" placeholder="leave empty for none" class="border rounded px-2 py-1 text-sm w-40 dark:bg-dark-surface dark:border-dark-border" />
              </label>
            </div>
          </div>
        </section>

        <!-- Table -->
        <section class="space-y-4">
          <h2 class="text-lg font-semibold border-b pb-1 border-gray-200 dark:border-dark-border">Table</h2>
          <div class="border rounded-lg p-4 dark:border-dark-border space-y-4">
            <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-dark-border">
              <Table class="w-full" :borderless="tableCfg.borderless">
                <thead>
                  <tr>
                    <TableHeader :bg-color="tableCfg.headerBgColor" :borderless="tableCfg.borderless">Name</TableHeader>
                    <TableHeader :bg-color="tableCfg.headerBgColor" :borderless="tableCfg.borderless">Role</TableHeader>
                    <TableHeader :bg-color="tableCfg.headerBgColor" :borderless="tableCfg.borderless">Status</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in tableRows" :key="row.name">
                    <TableData :borderless="tableCfg.borderless">{{ row.name }}</TableData>
                    <TableData :borderless="tableCfg.borderless">{{ row.role }}</TableData>
                    <TableData :borderless="tableCfg.borderless">{{ row.status }}</TableData>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <label class="flex items-center gap-1">
                <input type="checkbox" v-model="tableCfg.borderless" class="accent-primary" />
                borderless
              </label>
              <label class="flex items-center gap-1.5">
                <span class="text-gray-500">header bgColor:</span>
                <input type="text" v-model="tableCfg.headerBgColor" class="border rounded px-2 py-1 text-sm w-28 dark:bg-dark-surface dark:border-dark-border" />
              </label>
            </div>
          </div>
        </section>

        <!-- Pagination -->
        <section class="space-y-4">
          <h2 class="text-lg font-semibold border-b pb-1 border-gray-200 dark:border-dark-border">Pagination</h2>
          <div class="border rounded-lg p-4 dark:border-dark-border space-y-4">
            <Pagination :pagination="paginationItems" :current-page="currentPage" @change-page="onPageChange" />
            <p class="text-xs text-gray-500" v-if="paginationLog">{{ paginationLog }} | currentPage: {{ currentPage }}</p>
          </div>
        </section>

      </main>
    </div>
  </div>

  <Modal :is-show="showModal" :size="modalSize" @close="showModal = false">
    <template #header>
      <div class="flex items-center gap-3 w-full">
        <h3 class="text-lg font-semibold">Modal Preview</h3>
        <label class="flex items-center gap-1.5 text-sm font-normal ml-auto">
          <span class="text-gray-500">size:</span>
          <select v-model="modalSize" class="border rounded px-2 py-1 text-sm dark:bg-dark-surface dark:border-dark-border">
            <option v-for="s in modalSizes" :key="s" :value="s">{{ s }}</option>
          </select>
        </label>
      </div>
    </template>
    <template #body>
      <p class="text-sm text-gray-600 dark:text-dark-muted">
        This modal adapts to the selected size and theme.
      </p>
    </template>
    <template #footer>
      <Button outline @click="showModal = false">Close</Button>
      <Button color="primary" @click="showModal = false">Confirm</Button>
    </template>
  </Modal>
</template>
