import { createApp } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import Rating from 'primevue/rating'
import InputText from 'primevue/inputtext'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import App from './App.vue'
import { worker } from './mocks/browser'

worker.start();

const app = createApp(App)

app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Button', Button)
app.component('ProgressSpinner', ProgressSpinner)
app.component('Rating', Rating)
app.component('InputText', InputText)

app.mount('#app')
