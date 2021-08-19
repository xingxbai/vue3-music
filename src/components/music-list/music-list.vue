<template>
    <div class="music-list">
        <!-- <div class="back" @click="goBack">
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
        </div> -->
        <scroll
            class="list"
            :style="scrollStyle"
            v-loading="loading"
            v-no-result="noResult"
            :probe-type="3"
            @scroll="onScroll"
        >
            <!-- <div class="song-list-wrapper">
                <song-list
                    :songs="songs"
                    @select="selectItem"
                    :rank="rank"
                ></song-list>
            </div> -->
            <div style="height:300px"></div>
        </scroll>
    </div>
</template>

<script>
// import createDetailComponent from '@/assets/js/create-detail-component';
// import { SINGER_KEY } from '@/assets/js/constant';

// export default createDetailComponent(
//     'singer-detail',
//     SINGER_KEY,
//     getSingerDetail
// );
import scroll from '../scroll/scroll';
import songList from '../song-list/song-list';
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
            imageHeight: 0,
            scrollY: 0,
            maxTranslateY: 0,
            noResult: true,
            rank: 1
        };
    },
    computed: {
        bgImageStyle() {},
        playBtnStyle() {},
        filterStyle() {}
    },
    methods: {
        goBack() {},
        selectItem() {},
        random() {},
        onScroll() {}
    }
};
</script>

<style lang="scss" scoped>
.singer-detail {
    background: #fff;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
}
</style>
