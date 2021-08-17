<template>
    <div id="nav">
        <router-link to="/search">search</router-link> |
        <router-link to="/singer">singer</router-link>
        <router-link to="/recommend">recommend</router-link> |
        <router-link to="/top-list">top-list</router-link>
    </div>
    <router-view />
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
