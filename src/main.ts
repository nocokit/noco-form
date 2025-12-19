import './assets/design-tokens.css'
import './assets/main.css'
import 'ant-design-vue/dist/reset.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { DatePicker, 
  Button, 
  Tag, 
  Typography, 
  Radio,
  Checkbox,
  Input,
  Rate,
  TimePicker,
  InputNumber,
  Switch,
  Upload,
  Divider,
  Select,
  List,
  Tooltip,
  Popconfirm,
  Drawer,
  Modal,
  Cascader,
  Watermark,
  Form,
  Alert,
  Dropdown,
} from 'ant-design-vue';

import App from './App.vue'
import router from './router'
import * as Icons from '@ant-design/icons-vue';

const app = createApp(App)
app.use(Checkbox);
app.use(Radio);
app.use(Button);
app.use(Tag);
app.use(Rate);
app.use(Input);
app.use(InputNumber);
app.use(TimePicker);
app.use(Switch);
app.use(Upload);
app.use(Divider);
app.use(Select);
app.use(List);
app.use(Drawer);
app.use(Tooltip);
app.use(Alert);
app.use(Cascader);
app.use(Popconfirm);
app.use(Watermark);
app.use(Form);

app.use(Typography);
app.use(DatePicker);
app.use(Modal);
app.use(Dropdown);

app.use(createPinia())
app.use(router)

// @ts-ignore
const icons: any[] = Icons
for(const i in icons) {
  app.component(i, icons[i])
}

app.mount('#app')
