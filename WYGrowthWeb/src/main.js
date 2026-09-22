import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'


import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


import '@/assets/css/index.scss' // global css
import axios from 'axios'



// import * as echarts from 'echarts'
import * as echarts from 'echarts'
import china from 'echarts/map/json/china.json' //导入china包
echarts.registerMap('china', china) 
// Vue.prototype.$echarts = echarts

import global from '@/utils/global.js' 

import { QuillEditor } from '@vueup/vue-quill'

import '@vueup/vue-quill/dist/vue-quill.snow.css';


const app = createApp(App)

import { ElMessage, ElMessageBox } from 'element-plus'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.component('QuillEditor', QuillEditor)

app.config.globalProperties.$axios = axios;

app.config.globalProperties.$global = global;

app.config.globalProperties.$echarts = echarts;

app.config.globalProperties.$ElMessageBox = ElMessageBox;

app.config.globalProperties.$ElMessage = ElMessage;
// app.prototype.$echarts = echarts
app.use(ElementPlus, {
  locale: zhCn,
}).use(store).use(router).mount('#app')
