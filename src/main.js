import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import DataTable from 'datatables.net-vue3';

const app = createApp(App)

app.use(router)
app.use(DataTable)
app.use(router)
app.mount('#app')
