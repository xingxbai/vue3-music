import { ref, computed } from "vue";
import { useStore } from "vuex";
import { PLAY_MODE } from "../../assets/js/constant";
export default function() {
  const store = useStore();
  const playMode = computed(() => store.state.playMode);
  const modeIcon = computed(() => {
    const playModeVal = playMode.value;
    return playModeVal === PLAY_MODE.sequence
      ? "icon-sequence"
      : playModeVal === PLAY_MODE.random
      ? "icon-random"
      : "icon-loop";
  });
  function changeMode() {
    const playModeVal = playMode.value;
    const mode = (playModeVal + 1) % 3;
    console.log("mode", mode, playModeVal);
    store.dispatch("changeMode", mode);
  }
  return {
    modeIcon,
    changeMode
  };
}
