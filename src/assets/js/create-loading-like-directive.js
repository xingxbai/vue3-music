import {
  createApp
} from 'vue'
const relativeCls = 'g-relative'
import {
  addClass
} from '@/assets/js/dom'

function createLoadingLikeDirective(Comp) {

  function append(el) {
    if (el.instance) {
      const style = getComputedStyle(el)
      if (['relative', 'fixed', 'absolute'].indexOf(style.position) === -1) {
        addClass(el, relativeCls)
      }
      el.appendChild(el.instance.$el)
    }
  }

  function remove(el) {
    if (el.instance) {
      el.removeChild(el.instance.$el)
    }
  }
  return {
    mounted(el, binding) {
      const instance = createApp(Comp).mount(document.createElement('div'))
      const name = Comp.name
      if (!el[name]) {
        el[name] = {}
      }
      // loading.vue 组件挂载在当前元素上
      el.instance = instance
      if (binding.value) {
        append(el)
      }
    },
    updated(el, binding) {
      const value = binding.value
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }
  }


}
export default createLoadingLikeDirective
