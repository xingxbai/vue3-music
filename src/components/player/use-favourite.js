import { useStore } from "vuex";
import { ref, computed } from "vue";
import { FAVORITE_KEY } from "@/assets/js/constant";
import { save, remove } from "../../assets/js/array-store";
export default function() {
  const maxLen = 100;
  const store = useStore();
  const favouriteList = computed(() => store.state.favouriteList);

  function toggleFavorite(song) {
    let list = [];
    function compare(item) {
      return item.id === song.id;
    }
    if (isFavourite(song)) {
      list = remove(FAVORITE_KEY, compare);
    } else {
      list = save(song, FAVORITE_KEY, compare, maxLen);
    }
    store.commit("setFavouriteList", list);
  }
  function getFavoriteIcon(song) {
    return isFavourite(song) ? "icon-favorite" : "icon-not-favorite";
  }
  function isFavourite(song) {
    const index = favouriteList.value.findIndex(item => {
      return item.id === song.id;
    });
    return index > -1;
  }
  return { toggleFavorite, getFavoriteIcon };
}
