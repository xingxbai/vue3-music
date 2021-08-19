import storage from "good-storage";
import { processSongs } from "@/service/song";
import MusicList from "../../components/music-list/music-list.vue";
export default function(name, key, fetch) {
  return {
    name,
    components: {
      MusicList
    },
    props: {
      // 当前选中的用户
      data: Object
    },
    data() {
      return {
        songs: [],
        loading: true
      };
    },
    computed: {
      computedData() {
        let ret = null;
        if (!this.data) {
          // 如果没有传入data，则读取缓存session
          const cached = storage.session.get(key);
          if (cached && cached.mid === this.$route.params.id) {
            ret = cached;
          }
        } else {
          ret = this.data;
        }
        return ret;
      },
      title() {
        if (!this.computedData) return "";
        return this.computedData.name;
      },
      pic() {
        if (!this.computedData) return "";
        return this.computedData.pic;
      }
    },
    async mounted() {
      const data = this.computedData;
      if (!data) {
        const path = this.$route.matched[0].path;
        this.$router.push({
          path
        });
        return;
      }
      const result = await fetch(data);
      this.songs = await processSongs(result.songs);
      this.loading = false;
    }
  };
}
