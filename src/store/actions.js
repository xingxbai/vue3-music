import {
  PLAY_MODE
} from '../assets/js/constant'
export function selectPlay({
  commit
}, {
  list,
  index
}) {
  commit('setCurrentIndex', index)
  commit('setSequenceList', list)
  commit('setPlaylist', list)
  commit('setPlayState', true)
  commit('setFullScreen', true)
  commit('setPlayMode', PLAY_MODE.sequence)
}
