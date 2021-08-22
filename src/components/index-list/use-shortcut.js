import { computed, ref } from "vue";
export default function(props, groupRef) {
  const scrollRef = ref(null);
  const touch = {};
  const ANCHORhEIGHT = 18;
  const shortcutList = computed(() => {
    return props.data.map(group => group.title);
  });

  function onShortcutTouchStart(e) {
    const anchorIndex = parseInt(e.target.dataset.index);
    touch.y1 = e.touches[0].pageY;
    touch.anchorIndex = anchorIndex;
    scrollTo(anchorIndex);
  }

  function onShortcutTouchMove(e) {
    touch.y2 = e.touches[0].pageY;
    const delta = ((touch.y2 - touch.y1) / ANCHORhEIGHT) | 0;
    const anchorIndex = delta + touch.anchorIndex;
    scrollTo(anchorIndex);
  }

  function scrollTo(anchorIndex) {
    if (isNaN(anchorIndex)) {
      return;
    }

    const index = Math.max(
      0,
      Math.min(anchorIndex, shortcutList.value.length - 1)
    );
    const targetEl = groupRef.value.children[index];
    const scroll = scrollRef.value.scroll;
    scroll.scrollToElement(targetEl, 0);
  }
  return {
    scrollRef,
    onShortcutTouchStart,
    onShortcutTouchMove,
    shortcutList
  };
}
