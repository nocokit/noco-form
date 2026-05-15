import './assets/main.css'
import 'ant-design-vue/dist/reset.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import * as Icons from '@ant-design/icons-vue'
import { createLemonForm, builtinPlugin } from './plugins'

const lemonForm = createLemonForm()
lemonForm.use(builtinPlugin)

const app = createApp(App)
app.use(lemonForm)
app.use(createPinia())
app.use(router)

// @ts-ignore
const icons: any[] = Icons
for (const i in icons) {
  app.component(i, icons[i])
}

app.mount('#app')
