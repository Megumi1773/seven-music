import {createApp} from 'vue'
import {createPinia} from 'pinia'
import './assets/style.css'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {createDiscreteApi} from "naive-ui";

const app = createApp(App)
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
const {message} = createDiscreteApi(['message'], {});
window.$message = message
app.mount('#app')
