import {
  ref,
  watch,
  nextTick,
  computed
} from "vue";

const TITLE_HEIGHT = 30;
export default function (props) {
  const scrollY = ref(0);
  const currentIndex = ref(0);
  const listHeights = ref([]);
  const groupRef = ref(null);
  const distance = ref(0);
  const fixedTitle = computed(() => {
    const currentGroup = props.data[currentIndex.value];
    return currentGroup ? currentGroup.title : "";
  });
  const fixedStyle = computed(() => {
    const diff =
      distance.value > 0 && distance.value < TITLE_HEIGHT ?
      distance.value - TITLE_HEIGHT :
      0;
    return {
      transform: `translate3d(0,${diff}px,0 )`
    };
  });

  // 监听props，计算子元素高度到数组listHeights
  watch(
    () => props.data,
    async () => {
      await nextTick();
      calculate();
    }
  );
  // 监听滚动事件，去计算currentIndex
  watch(scrollY, newY => {
    console.log("rd: newY", newY)
    const listHeightsVal = listHeights.value;
    for (let i = 0; i < listHeightsVal.length - 1; i++) {
      const heightTop = listHeightsVal[i];
      const heightBottom = listHeightsVal[i + 1];
      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = i;
        distance.value = heightBottom - newY;
      }
    }
  });
  // 计算group子元素高度
  function calculate() {
    const list = groupRef.value.children;
    const listHeightsVal = listHeights.value;
    let height = 0;
    listHeightsVal.length = 0;
    listHeightsVal.push(height);
    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight;
      listHeightsVal.push(height);
    }
  }

  function onScroll(position) {
    scrollY.value = -position.y;
  }
  return {
    onScroll,
    groupRef,
    fixedTitle,
    currentIndex,
    fixedStyle
  };
}
