<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <div class="play-btn-wrapper" :style="playBtnStyle">
        <div v-show="songs.length > 0" class="play-btn" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" :style="filterStyle"></div>
    </div>
    <scroll
      class="list"
      :style="scrollStyle"
      v-loading="loading"
      v-no-result:[noResultText]="noResult"
      :probe-type="3"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem" :rank="rank"></song-list>
      </div>
      <div style="height:300px"></div>
    </scroll>
  </div>
</template>

<script>
const RESERVED_HEIGHT = 40;
import scroll from "../scroll/scroll";
import songList from "../song-list/song-list";
export default {
  components: {
    scroll,
    songList
  },
  props: {
    songs: Array,
    title: String,
    pic: String,
    loading: Boolean
  },
  data() {
    return {
      noResultText: "抱歉，没有找到可播放的歌曲",
      // 歌手大图高度
      imageHeight: 0,
      // 滚动条滚动距离
      scrollY: 0,
      // 最大可以滑动的高度,
      maxTranslateY: 0,
      rank: 1,
      playlist: []
      //   pic:
      //     "https://img1.baidu.com/it/u=1155524458,3686551720&fm=26&fmt=auto&gp=0.jpg"
    };
  },
  computed: {
    noResult() {
      return !this.loading && !this.songs.length;
    },
    bgImageStyle() {
      let zIndex = 0;
      let paddingTop = "70%";

      // 开启3d 加速GPU渲染
      let translateZ = 0;
      let height = 0;
      // touch 下拽图片放大
      let scale = 1;
      // 超出最大高度，保留40
      if (this.scrollY > this.maxTranslateY) {
        height = `${RESERVED_HEIGHT}px`;
        zIndex = 1;
        paddingTop = 0;
        translateZ = 1;
      }
      console.log("rd: bgImageStyle -> this.scrollY", this.scrollY);
      if (this.scrollY < 0) {
        scale = 1 + Math.abs(this.scrollY / this.imageHeight);
      }
      return {
        paddingTop,
        zIndex,
        height,
        backgroundImage: `url(${this.pic})`,
        transform: `scale(${scale})translateZ(${translateZ}px)`
      };
    },
    playBtnStyle() {
      let display = "";
      if (this.scrollY >= this.maxTranslateY) {
        display = "none";
      }
      return { display };
    },
    filterStyle() {
      let blur = 0;
      if (this.scrollY > 0) {
        blur =
          Math.min(
            this.maxTranslateY / this.imageHeight,
            this.scrollY / this.imageHeight
          ) * 20;
      }
      return {
        backdropFilter: `blur(${blur}px)`
      };
    },
    scrollStyle() {
      const bottom = this.playlist.length ? "60px" : "0";
      return {
        top: `${this.imageHeight}px`,
        bottom
      };
    }
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight || 60;
    this.maxTranslateY = this.imageHeight - RESERVED_HEIGHT;
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    selectItem() {},
    // 随机歌曲
    random() {},
    onScroll(pos) {
      this.scrollY = -pos.y;
    }
  }
};
</script>

<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;
    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;
      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }
      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
