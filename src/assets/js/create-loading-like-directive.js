import {
  createApp
} from 'vue'
const relativeCls = 'g-relative'
import {
  addClass
} from '@/assets/js/dom'

function createLoadingLikeDirective(Comp) {

  function append(el) {
    const name = Comp.name
    if (el[name].instance) {
      const style = getComputedStyle(el)
      if (['relative', 'fixed', 'absolute'].indexOf(style.position) === -1) {
        addClass(el, relativeCls)
      }
      el.appendChild(el[name].instance.$el)
    }
  }

  function remove(el) {
    const name = Comp.name
    console.log("rd: remove -> el", el, el.instance)
    if (el[name].instance) {
      el.removeChild(el[name].instance.$el)
    }
  }
  return {
    mounted(el, binding) {
      console.log("rd: mounted -> binding", el, binding)
      const instance = createApp(Comp).mount(document.createElement('div'))
      const name = Comp.name
      if (!el[name]) {
        el[name] = {}
      }
      const title = binding.arg
      if (typeof title !== 'undefined') {
        instance.setTitle(title)
      }
      // loading.vue 组件挂载在当前元素上
      el[name].instance = instance
      if (binding.value) {
        append(el)
      }
    },
    updated(el, binding) {
      const value = binding.value
      const name = Comp.name
      const title = binding.arg
      if (typeof title !== 'undefined') {
        el[name].instance.setTitle(title)
      }
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }
  }


}
export default createLoadingLikeDirective
