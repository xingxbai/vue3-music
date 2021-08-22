import { PLAY_MODE, FAVORITE_KEY } from "../assets/js/constant";
import { load } from "../assets/js/array-store";
export default {
  currentIndex: 0,
  sequenceList: [],
  playlist: [],
  playing: false,
  playMode: PLAY_MODE.sequence,
  fullScreen: false,
  favouriteList: load(FAVORITE_KEY)
};
