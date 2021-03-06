<template>
    <scroll
        class="index-list"
        :probe-type="3"
        @scroll="onScroll"
        ref="scrollRef"
    >
        <ul ref="groupRef">
            <li v-for="group in data" :key="group.title" class="group">
                <div class="title">
                    {{ group.title }}
                </div>
                <ul>
                    <li
                        v-for="singer in group.list"
                        :key="singer.id"
                        class="item"
                        @click="onItemClick(singer)"
                    >
                        <img class="avatar" v-lazy="singer.pic" />
                        <span class="name">{{ singer.name }}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="fixed" :style="fixedStyle">
            <div class="fixed-title">{{ fixedTitle }}</div>
        </div>
        <ul
            class="shortcut"
            @touchstart.stop.prevent="onShortcutTouchStart"
            @touchmove.stop.prevent="onShortcutTouchMove"
            @touchend.stop.prevent
        >
            <li
                class="item"
                v-for="(shortcut, index) in shortcutList"
                :key="shortcut"
                :data-index="index"
                :class="{ current: currentIndex === index }"
            >
                {{ shortcut }}
            </li>
        </ul>
    </scroll>
</template>

<script>
import scroll from '../scroll/scroll';
import useFixed from './use-fixed';
import useShortcut from './use-shortcut';
export default {
    name: 'index-list',
    components: {
        scroll
    },
    props: {
        data: Array
    },
    emits: ['select'],
    setup(props, { emit }) {
        const {
            onScroll,
            groupRef,
            fixedTitle,
            currentIndex,
            fixedStyle
        } = useFixed(props);
        const {
            scrollRef,
            onShortcutTouchStart,
            onShortcutTouchMove,
            shortcutList
        } = useShortcut(props, groupRef);

        function onItemClick(singer) {
            emit('select', singer);
        }
        return {
            onScroll,
            groupRef,
            fixedTitle,
            currentIndex,
            fixedStyle,
            scrollRef,
            onShortcutTouchStart,
            onShortcutTouchMove,
            shortcutList,
            onItemClick
        };
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
            text-align: left;
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
        top: -1px;
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
