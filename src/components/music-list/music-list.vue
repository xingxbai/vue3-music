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
        <!-- <scroll
            class="list"
            :style="scrollStyle"
            v-loading="loading"
            v-no-result:[noResultText]="noResult"
            :probe-type="3"
            @scroll="onScroll"
        >
            <div class="song-list-wrapper">
                <song-list
                    :songs="songs"
                    @select="selectItem"
                    :rank="rank"
                ></song-list>
            </div>
        </scroll> -->
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
export default {
    props: {
        songs: Array,
        title: String,
        pic: String,
        loading: Boolean
    },
    data() {
        return {
            songs: []
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
        random() {}
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
