<template>
    <div>
        <div class="operators">
            {{ currentSong.name }}
            <div class="icon i-left">
                <i @click="changeMode" :class="modeIcon"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
                <i @click="prev" class="icon-prev"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
                <i @click="togglePlay" :class="playIcon"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
                <i @click="next" class="icon-next"></i>
            </div>
            <div class="icon i-right">
                <i
                    @click="toggleFavorite(currentSong)"
                    :class="getFavoriteIcon(currentSong)"
                ></i>
            </div>
        </div>
        <audio
            ref="audioRef"
            @pause="pause"
            @canplay="ready"
            @error="error"
            @timeupdate="updateTime"
            @ended="end"
        ></audio>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        // data
        const audioRef = ref(null);
        // vuex
        const store = useStore();
        const fullScreen = computed(() => store.state.fullScreen);
        const currentSong = computed(() => store.getters.currentSong);
        const playing = computed(() => store.state.playing);
        const currentIndex = computed(() => store.state.currentIndex);
        const playMode = computed(() => store.state.playMode);
        const playlist = computed(() => store.state.playlist);

        // hooks
        const playIcon = computed(() => {
            return playing.value ? 'icon-pause' : 'icon-play';
        });

        // watch 监听当前选中的歌，进行操作audio播放
        watch(currentSong, newSong => {
            if (!newSong.id || !newSong.url) return;

            const audioEl = audioRef.value;
            audioEl.src = newSong.url;
            audioEl.play();
            store.commit('setPlayState', true);
            console.log('rd: setup -> newSong', newSong);
        });

        watch(playing, newPlaying => {
            const audioEl = audioRef.value;
            if (newPlaying) {
                audioEl.play();
            } else {
                audioEl.pause();
            }
        });
        function getFavoriteIcon() {}
        // 播放or暂停
        function togglePlay() {
            store.commit('setPlayState', !playing.value);
        }
        // 列表只有一首歌的时候，上一曲or下一曲
        // 或者单曲循环
        function loop() {
            const audioEl = audioRef.value;
            audioEl.currentTime = 0;
            aduioEl.play();
            store.commit('setPlayState', true);
        }
        // 上一曲
        function prev() {
            let playlistVal = playlist.value;
            if (!playlistVal.length) return;
            if (playlistVal.length === 1) {
                loop();
            } else {
                let index = currentIndex.value - 1;
                if (index === -1) {
                    index = playlistVal.length - 1;
                }
                store.commit('setCurrentIndex', index);
            }
        }
        // 下一曲
        function next() {
            const playlistVal = playlist.value;
            if (!playlistVal.length) return;
            if (playlistVal.length === 1) {
                loop();
            } else {
                let index = currentIndex.value + 1;
                if (index === playlistVal.length) {
                    index = 0;
                }
                store.commit('setCurrentIndex', index);
            }
        }
        return {
            getFavoriteIcon,
            audioRef,
            playIcon,
            togglePlay,
            prev,
            next,
            currentSong
        };
    }
};
</script>

<style lang='scss'>
.operators {
    display: flex;
    align-items: center;
    width: 150px;
    .icon {
        flex: 1;
        color: $color-theme;
        &.disable {
            color: $color-theme-d;
        }
        i {
            font-size: 30px;
        }
    }
    .i-left {
        text-align: right;
    }
    .i-center {
        padding: 0 20px;
        text-align: center;
        i {
            font-size: 40px;
        }
    }
    .i-right {
        text-align: left;
    }
    .icon-favorite {
        color: $color-sub-theme;
    }
}
</style>
