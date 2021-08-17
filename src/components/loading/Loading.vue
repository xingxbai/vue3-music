<template>
    <div class="loading">
        <div class="loading-content">
            <img src="./loading.gif" width="24" height="24" />

            <p class="desc">{{ title }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loading',
    data() {
        return {
            title: '正在载入中...'
        };
    },
    methods: {
        setTitle(title) {
            this.title = title;
        }
    }
};
</script>

<style>
</style>
