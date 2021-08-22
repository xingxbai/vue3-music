<template>
  <div id="nav">
    <router-link to="/search">search</router-link> |
    <router-link to="/singer">singer</router-link>
    <router-link to="/recommend">recommend</router-link> |
    <router-link to="/top-list">top-list</router-link>
  </div>
  <router-view />
  <player :style="viewStyle"></player>
</template>
<script>
import Player from "@/components/player/player";
import { mapState } from "vuex";

export default {
  components: {
    Player
  },
  computed: {
    viewStyle() {
      // const bottom = this.playlist.length ? '60px' : '0';
      return {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        display: "block"
      };
    },
    ...mapState(["playlist"])
  }
};
</script>
<style lang="scss"></style>
