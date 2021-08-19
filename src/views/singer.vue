<template>
  <div class="singer" v-loading="singers.length <= 0">
    <index-list :data="singers" @select="selectSinger"></index-list>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getSingerList } from "../service/singer";
import IndexList from "../components/index-list/index-list";
import { SINGER_KEY } from "../assets/js/constant";
import storage from "good-storage";
export default {
  name: "singer",
  components: {
    IndexList
  },
  data() {
    return {
      singers: [],
      selectedSinger: null
    };
  },
  async mounted() {
    const result = await getSingerList();
    this.singers = result.singers;
  },
  methods: {
    selectSinger(singer) {
      const mid = singer.mid;
      this.selectedSinger = singer;
      this.cacheSinger();
      this.$router.push("/singer/" + mid);
    },
    cacheSinger() {
      // 用户点击歌手以后，歌手信息写入session
      storage.session.set(SINGER_KEY, this.selectedSinger);
    }
  }
};
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
