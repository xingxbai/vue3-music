<template>
    <div id="nav">
        <router-link to="/search">search</router-link> |
        <router-link to="/singer">singer</router-link>
        <router-link to="/recommend">recommend</router-link> |
        <router-link to="/top-list">top-list</router-link>
    </div>
    <router-view />
    <player :style="viewStyle"></player>
    <button @click="showConfirm">点击confirm</button
    ><button @click="showMessage">点击message</button>
    <confirm ref="confirmRef"></confirm>
    <message ref="messageRef"></message>
    <switches
        :items="['最近播放', '搜索历史']"
        v-model="currentIndex"
    ></switches>
</template>
<script>
import Player from '@/components/player/player';
import confirm from '@/components/base/confirm';
import message from '@/components/base/message';
import switches from '@/components/base/switches';
import { mapState } from 'vuex';
export default {
    components: {
        Player,
        confirm,
        message,
        switches
    },
    data() {
        return {
            currentIndex: 1
        };
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
        },
        showMessage() {
            const messageRef = this.$refs.messageRef;
            messageRef.show();
        }
    }
};
</script>
<style lang="scss"></style>
