import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LoadingDirective from './components/loading/directive'
import '@/assets/scss/index.scss'
import lazyPlugin from 'vue3-lazy'
import noResultDirective from './components/no-result/directive'
createApp(App).use(store).use(router).use(lazyPlugin, {
  loading: require('@/assets/images/default.png')
}).directive('loading', LoadingDirective).directive('no-result', noResultDirective).mount('#app')
