<template>
    <div class="singer-detail">
        <music-list
            :songs="songs"
            :title="title"
            :pic="pic"
            :loading="loading"
        ></music-list>
    </div>
</template>

<script>
// import createDetailComponent from '@/assets/js/create-detail-component';
// import { getSingerDetail } from '@/service/singer';
// import { SINGER_KEY } from '@/assets/js/constant';

// export default createDetailComponent(
//     'singer-detail',
//     SINGER_KEY,
//     getSingerDetail
// );
// import MusicList from '../components/music-list/music-list';
// import { getSingerDetail } from '@/service/singer';

import createDetailComponent from '@/assets/js/create-detail-component';
import { getSingerDetail } from '@/service/singer';
import { SINGER_KEY } from '@/assets/js/constant';

export default createDetailComponent(
    'singer-detail',
    SINGER_KEY,
    getSingerDetail
);
// export default {
//     data() {
//         return {
//             songs: [],
//             title: '',
//             pic: '',
//             loading: true
//         };
//     },
//     components: {
//         MusicList
//     },
//     async mounted() {
//         const result = await getSingerDetail({
//             mid: '0025NhlN2yWrP4'
//         });
//         console.log('rd: mounted -> result', result);
//         this.songs = result.songs;
//         this.loading = false;
//     }
// };
</script>

<style lang="scss" scoped>
.singer-detail {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
}
</style>
