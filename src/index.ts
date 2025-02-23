import { App } from 'vue'
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

import './style.css'

export {
  AutoCompleteInput,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  InputLabel,
  Pagination,
  SelectInput,
  Table,
  Modal,
  Spinner,
  TableData,
  TableHeader,
  TagInput,
  TextArea,
  TextInput,
}

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
