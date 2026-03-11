import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueDragscroll from 'vue-dragscroll'

const app = createApp(App);
app.use(VueDragscroll);
app.mount('#app')
