<template>
    <div class="switches">
        <div
            class="switch-item"
            v-for="(item, index) in items"
            :key="index"
            :class="index === modelValue ? 'active' : ''"
            @click="switchItem(index)"
        >
            {{ item }}
        </div>
        <div class="active-bar" :style="activeStyle"></div>
    </div>
</template>

<script>
export default {
    name: 'switches',
    props: {
        items: {
            type: Array,
            default() {
                return [];
            }
        },
        modelValue: {
            type: Number,
            default: 0
        }
    },
    computed: {
        activeStyle() {
            const braWidth = 120;
            return {
                transform: `translate3d(${braWidth * this.modelValue}px,0,0)`
            };
        }
    },
    methods: {
        switchItem(index) {
            this.$emit('update:modelValue', index);
        }
    }
};
</script>

<style scoped lang="scss">
.switches {
    display: flex;
    position: relative;
    align-items: center;
    width: 240px;
    margin: 0 auto;
    border: 1px solid $color-highlight-background;
    border-radius: 5px;
    .switch-item {
        position: relative;
        z-index: 10;
        flex: 1;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text-d;
        &.active {
            color: $color-text;
        }
    }
    .active-bar {
        position: absolute;
        left: 0;
        top: 0;
        width: 120px;
        height: 30px;
        transition: transform 0.3s;
        border-radius: 5px;
        background: $color-highlight-background;
    }
}
</style>
