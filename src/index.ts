import { App } from 'vue'

export { default as Button } from './components/Button.vue'
export { default as Modal } from './components/Modal.vue'

export { default as AutoCompleteInput } from './components/form/AutoCompleteInput.vue'
export { default as TextArea } from './components/form/TextArea.vue'
export { default as TextInput } from './components/form/TextInput.vue'
export { default as InputLabel } from './components/form/InputLabel.vue'
export { default as TagInput } from './components/form/TagInput.vue'
export { default as SelectInput } from './components/form/SelectInput.vue'

export { default as Breadcrumb } from './components/breadcrumb/Breadcrumb.vue'
export { default as BreadcrumbItem } from './components/breadcrumb/BreadcrumbItem.vue'

export { default as Table } from './components/table/Table.vue'
export { default as TableHeader } from './components/table/TableHeader.vue'
export { default as TableData } from './components/table/TableData.vue'
export { default as Pagination } from './components/table/Pagination.vue'

export { default as Spinner } from './components/Spinner.vue'

import Button from './components/Button.vue'
import Modal from './components/Modal.vue'
import AutoCompleteInput from './components/form/AutoCompleteInput.vue'
import TextArea from './components/form/TextArea.vue'
import TextInput from './components/form/TextInput.vue'
import InputLabel from './components/form/InputLabel.vue'
import TagInput from './components/form/TagInput.vue'
import SelectInput from './components/form/SelectInput.vue'
import Breadcrumb from './components/breadcrumb/Breadcrumb.vue'
import BreadcrumbItem from './components/breadcrumb/BreadcrumbItem.vue'
import Table from './components/table/Table.vue'
import TableHeader from './components/table/TableHeader.vue'
import TableData from './components/table/TableData.vue'
import Pagination from './components/table/Pagination.vue'
import Spinner from './components/Spinner.vue'

export default {
  install(app: App) {
    app.component('Button', Button)
    app.component('TextArea', TextArea)
    app.component('TextInput', TextInput)
    app.component('InputLabel', InputLabel)
    app.component('TagInput', TagInput)
    app.component('Table', Table)
    app.component('TableHeader', TableHeader)
    app.component('TableData', TableData)
    app.component('Pagination', Pagination)
    app.component('SelectInput', SelectInput)
    app.component('Breadcrumb', Breadcrumb)
    app.component('BreadcrumbItem', BreadcrumbItem)
    app.component('Modal', Modal)
    app.component('Spinner', Spinner)
    app.component('AutoCompleteInput', AutoCompleteInput)
  },
}
