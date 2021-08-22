<template>
  <div class="progress-bar" @click="onClick">
    <div class="bar-inner">
      <div class="progress" :style="progressStyle" ref="progress"></div>
      <div
        class="progress-btn-wrapper"
        ref="btnRef"
        :style="btnStyle"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch } from "@vue/runtime-core";
const progressBtnWidth = 16;
const position = {};
export default {
  name: "progress-bar",
  emits: ["progress-changing", "progress-changed"],
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      offset: 0
    };
  },
  computed: {
    progressStyle() {
      return `width:${this.offset}px`;
    },
    btnStyle() {
      return `transform:translate3d(${this.offset}px,0,0)`;
    }
  },
  watch: {
    progress(newValue) {
      this.setOffset(newValue);
    }
  },
  created() {
    this.touch = {};
  },
  methods: {
    setOffset(progress) {
      const barWidth = this.$el.clientWidth - progressBtnWidth;
      this.offset = barWidth * progress;
    },
    onTouchStart(e) {
      this.touch.x1 = e.touches[0].pageX;
      this.touch.beginWidth = this.$refs.progress.clientWidth;
    },
    onTouchMove(e) {
      this.touch.x2 = e.touches[0].pageX;
      const delta = this.touch.x2 - this.touch.x1;
      const barWidth = this.$el.clientWidth - progressBtnWidth;
      const tempWidth = this.touch.beginWidth + delta;
      // this.offset = tempWidth 也行。为什么要barWidth*progress
      // 有可能超出1，故progress限制0<x<1之间
      const progress = Math.min(1, Math.max(0, tempWidth / barWidth));
      this.offset = barWidth * progress;
      this.$emit("progress-changing", progress);
    },
    onTouchEnd(e) {
      const barWidth = this.$el.clientWidth - progressBtnWidth;
      const progress = this.$refs.progress.clientWidth / barWidth;
      this.$emit("progress-changed", progress);
    },
    onClick(e) {
      const rect = this.$el.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      const barWidth = this.$el.clientWidth;
      const progress = offsetWidth / barWidth;
      this.$emit("progress-changed", progress);
    }
  }
};
</script>

<style lang="scss" scoped>
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>
