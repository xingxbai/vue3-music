<template>
    <div id="nav">
        <router-link to="/search">search</router-link> |
        <router-link to="/singer">singer</router-link>
        <router-link to="/recommend">recommend</router-link> |
        <router-link to="/top-list">top-list</router-link>
    </div>
    <router-view />
    <player :style="viewStyle"></player>
    <button @click="showConfirm">点击</button>
    <confirm ref="confirmRef"></confirm>
</template>
<script>
import Player from '@/components/player/player';
import confirm from '@/components/base/confirm';
import { mapState } from 'vuex';

export default {
    components: {
        Player,
        confirm
    },
    computed: {
        viewStyle() {
            // const bottom = this.playlist.length ? '60px' : '0';
            return {
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                display: 'block'
            };
        },
        ...mapState(['playlist'])
    },
    methods: {
        showConfirm() {
            const confirmRef = this.$refs.confirmRef;
            confirmRef.show();
        }
    }
};
</script>
<style lang="scss"></style>
