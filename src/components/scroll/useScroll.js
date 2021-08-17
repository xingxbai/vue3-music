import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import {
  ref,
  onMounted,
  onUnmounted,
  onActivated,
  onDeactivated
} from 'vue'
export default function (wrapperRef, options, emit) {
  const scroll = ref(null);
  onMounted(() => {
    const scrollVal = scroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      ...options
    })
    if (options.probeType > 0) {
      scrollVal.on('scroll', (pos) => {
        emit('scroll', pos)
      })
    }
  })
  onUnmounted(() => {
    scroll.value.destroy()
  })
  onActivated(() => {
    scroll.value.enable()
    scroll.value.refresh()
  })
  onDeactivated(() => {
    scroll.value.disable()
  })
  return scroll
}
