import { App } from 'vue'
import Button from './components/Button.vue'

import TextInput from './components/form/TextInput.vue'
import InputLabel from './components/form/InputLabel.vue'
import TagInput from './components/form/TagInput.vue'

import './style.css'

export { Button, TextInput, InputLabel, TagInput }

export default {
  install(app: App) {
    app.component('Button', Button)
    app.component('TextInput', TextInput)
    app.component('InputLabel', InputLabel)
    app.component('TagInput', TagInput)
  },
}
