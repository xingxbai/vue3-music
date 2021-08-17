<template>
    <div v-loading="loading" class="search">search</div>
</template>

<script>
export default {
    name: 'search',
    data() {
        return {
            loading: true
        };
    },
    mounted() {
        setTimeout(() => {
            this.loading = false;
        }, 2000);
    }
};
</script>

<style lang="scss">
.search {
    width: 200px;
    height: 200px;
    background: red;
}
</style>
