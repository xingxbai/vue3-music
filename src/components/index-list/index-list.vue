<template>
    <scroll
        class="index-list"
        :probe-type="3"
        @scroll="onScroll"
        ref="scrollRef"
    >
        <ul ref="groupRef">
            <li v-for="group in data" :key="group.title" class="group">
                <div class="title">{{ group.title }}</div>
                <ul>
                    <li
                        v-for="singer in group.list"
                        :key="singer.id"
                        class="item"
                    >
                        <img class="avatar" v-lazy="singer.pic" />
                        <span class="name">{{ singer.name }}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </scroll>
</template>

<script>
import scroll from '../scroll/scroll';
export default {
    name: 'index-list',
    components: {
        scroll
    },
    props: {
        data: Array
    },
    methods: {
        onScroll() {}
    }
};
</script>


<style lang="scss" scoped>
.index-list {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;
    .group {
        padding-bottom: 30px;
        .title {
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: $font-size-small;
            color: $color-text-l;
            background: $color-highlight-background;
        }
        .item {
            display: flex;
            align-items: center;
            padding: 20px 0 0 30px;
            .avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            .name {
                margin-left: 20px;
                color: $color-text-l;
                font-size: $font-size-medium;
            }
        }
    }
    .fixed {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        .fixed-title {
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: $font-size-small;
            color: $color-text-l;
            background: $color-highlight-background;
        }
    }
    .shortcut {
        position: absolute;
        right: 4px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        padding: 20px 0;
        border-radius: 10px;
        text-align: center;
        background: $color-background-d;
        font-family: Helvetica;
        .item {
            padding: 3px;
            line-height: 1;
            color: $color-text-l;
            font-size: $font-size-small;
            &.current {
                color: $color-theme;
            }
        }
    }
}
</style>
