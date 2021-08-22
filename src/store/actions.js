import { PLAY_MODE } from "../assets/js/constant";
import { shuffle } from "../assets/js/util";
export function selectPlay({ commit }, { list, index }) {
  commit("setCurrentIndex", index);
  commit("setSequenceList", list);
  commit("setPlaylist", list);
  commit("setPlayState", true);
  commit("setFullScreen", true);
  commit("setPlayMode", PLAY_MODE.sequence);
}

export function changeMode({ state, commit, getters }, mode) {
  // 随机播放
  if (mode == PLAY_MODE.random) {
    const list = shuffle(state.sequenceList);
    commit("setPlaylist", list);
  } else {
    commit("setPlaylist", state.sequenceList);
  }
  const index = state.playlist.findIndex(song => {
    return song.id === getters.currentSong.id;
  });
  commit("setCurrentIndex", index);
  commit("setPlayMode", mode);
}
