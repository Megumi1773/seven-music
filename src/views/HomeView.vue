<script setup>
import {HeartOutline, CaretForwardOutline} from '@vicons/ionicons5'
import {NGrid, NGridItem, NIcon, NImage} from "naive-ui"
import {Play} from '@vicons/ionicons5'
import {useRouter} from "vue-router"
import {useSongListStore} from "@store/songlist.js"
import {storeToRefs} from "pinia"
import {useUserStore} from "@store/user.js"
import dayjs from "dayjs"
// 轮播图数据
const router = useRouter()
const banners = [
  {
    id: 1,
    image: 'https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/62008863073/8052/39a7/8edd/4d19acc260adeaab20d69c9254b064fe.jpg?imageView&quality=89',
    title: '夏日音乐盛典',
    description: '打造你的专属夏日歌单'
  },
  {
    id: 2,
    image: 'https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/62014037393/3407/8c91/75a0/72c73b63016e55d500ea10c895277b9c.jpg?imageView&quality=89',
    title: '经典专辑重制版',
    description: '重温那些年的经典之作'
  },
  {
    id: 3,
    image: 'https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/62025138991/e6c1/e8ac/d6d4/2ee34bd0e963308e338529262e948f03.jpg?imageView&quality=89',
    title: '独立音乐新势力',
    description: '发现最具潜力的独立音乐人'
  }
]

// 推荐歌单数据
const recommendedPlaylists = [
  {
    id: 1,
    cover: 'https://qpic.y.qq.com/music_cover/82JEfXu7Egy5glogWBbe59bA6uwdxlrABjwfficsJgia5fqC377g8Pfw/300?n=1',
    title: '每日推荐',
    creator: '系统推荐',
    songCount: 30
  },
]

// 热门歌手数据
const hotSingers = [
  {
    id: 1,
    name: '陈奕迅',
    avatar: 'https://y.qq.com/music/photo_new/T001R300x300M000003Nz2So3XXYek_4.jpg?max_age=2592000',
    songCount: 29
  },
  {
    id: 2,
    name: '周杰伦',
    avatar: 'https://y.qq.com/music/photo_new/T001R150x150M0000025NhlN2yWrP4.jpg?max_age=2592000',
    songCount: 25
  },
]

// 最新音乐数据
const latestSongs = [
  {
    id: 1,
    title: '最伟大的作品',
    artist: '周杰伦',
    album: '最伟大的作品',
    duration: '04:42'
  },
  {
    id: 2,
    title: '还在流浪',
    artist: '周杰伦',
    album: '最伟大的作品',
    duration: '04:15'
  },
  {
    id: 3,
    title: '错过的烟火',
    artist: '周杰伦',
    album: '最伟大的作品',
    duration: '04:30'
  },
  {
    id: 4,
    title: '红颜如霜',
    artist: '周杰伦',
    album: '最伟大的作品',
    duration: '04:12'
  },
  {
    id: 5,
    title: '等你下课',
    artist: '周杰伦',
    album: '等你下课',
    duration: '04:32'
  }
]

// 播放歌曲函数
const playSong = (song) => {
  console.log('播放歌曲:', song)
  // 实际项目中这里会调用音乐播放API
}

// 收藏歌曲函数
const favoriteSong = (song) => {
  console.log('收藏歌曲:', song)
  // 实际项目中这里会调用收藏API
}
// 歌单
const songListStore = useSongListStore()
const {songList} = storeToRefs(songListStore)
const goDetail = (id) => {
  router.push(`/playlist/${id}`)
}
const userStore = useUserStore()
const {isLogin} = storeToRefs(userStore)
const welcome = computed(() => {
  let h = dayjs().hour()

  if (h < 12) return '上午好'
  if (h < 18) return '下午好'
  return '晚上好'
})
</script>
<template>
  <div class="home-container">
    <!-- 轮播图区域 -->
    <div class="banner-container" :style="{ marginBottom: '30px' }">
      <n-carousel :style="{ width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden',objectFit:'cover' }"
                  autoplay
                  :interval="5000" indicator-placement="bottom">
        <n-carousel-item v-for="banner in banners" :key="banner.id">
          <div :style="{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${banner.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 40px'
          }">
            <h3
                :style="{ color: '#fff', fontSize: '24px', marginBottom: '10px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }">
              {{ banner.title }}</h3>
            <p :style="{ color: '#fff', fontSize: '16px', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }">{{
                banner.description
              }}</p>
          </div>
        </n-carousel-item>
      </n-carousel>

      <n-card class="h-full w-full" v-if="isLogin">
        <template #header>
          <span class="text-xl"><span class="text-2xl">{{ welcome }}</span>，亲爱的 {{
              userStore.userInfo.nickname
            }}，</span>
          <span style="color: #888">猜你想听~~</span>
        </template>
        <n-grid :cols="4" :x-gap="24" :y-gap="24">
          <n-grid-item v-for="item in songList" :key="item.id"
                       class="group-hover:transform translate-4 duration-300 min-w-16">
            <div @click="goDetail(item.id)" class="group cursor-pointer">
              <div class="relative rounded-lg overflow-hidden mb-2" style="aspect-ratio: 1/1;">
                <n-image
                    preview-disabled
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    :src="item.cover || 'https://imgapi.xl0408.top/index.php'"
                />
                <div
                    class="absolute inset-0 bg-teal-900 opacity-0 group-hover:opacity-40 transition-all duration-300 flex items-center justify-center pointer-events-none z-10">
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <n-icon size="48" color="white">
                      <Play/>
                    </n-icon>
                    <h2 class="text-sm truncate text-red-100 font-black p-3">{{ item.name }}</h2>
                  </div>
                </div>
              </div>
            </div>
          </n-grid-item>
        </n-grid>
      </n-card>
      <n-card class="h-full w-full" v-else>
        please login up !.
      </n-card>
    </div>

    <!-- 推荐歌单区域 -->
    <div class="section-container" :style="{ marginBottom: '30px' }">
      <div class="section-header"
           :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }">
        <h2 :style="{ fontSize: '20px', fontWeight: 'bold', color: '#333' }">推荐歌单</h2>
        <div class="section-more"
             :style="{ display: 'flex', alignItems: 'center', color: '#1890ff', cursor: 'pointer' }">
          <span>更多</span>
          <n-icon>
            <CaretForwardOutline/>
          </n-icon>
        </div>
      </div>

      <div class="playlist-grid"
           :style="{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }">
        <n-card v-for="playlist in recommendedPlaylists" :key="playlist.id"
                :style="{ borderRadius: '8px', overflow: 'hidden', transition: 'all 0.3s', cursor: 'pointer' }"
                hoverable
                @click="$router.push(`/everyday`)"
                class="group-hover:bg-black-50 transition-all duration-200">
          <div slot="cover" :style="{ position: 'relative' }">
            <img :src="playlist.cover" alt="歌单封面" :style="{ width: '100%', height: '180px', objectFit: 'cover' }"/>
            <div
                :style="{ position: 'absolute', bottom: '0', left: '0', right: '0', background: 'linear-gradient(transparent, rgba(0,0,0,0.5))', padding: '10px' }">
            </div>
          </div>
          <div :style="{ padding: '10px' }">
            <h3
                :style="{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }">
              {{ playlist.title }}</h3>
            <p :style="{ fontSize: '12px', color: '#888' }">{{ playlist.creator }} · {{ playlist.songCount }}首</p>
          </div>
        </n-card>
      </div>
    </div>

    <!-- 最新音乐区域 -->
    <div class="section-container" :style="{ marginBottom: '30px' }">
      <div class="section-header"
           :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }">
        <h2 :style="{ fontSize: '20px', fontWeight: 'bold', color: '#333' }">最新音乐</h2>
        <div class="section-more"
             :style="{ display: 'flex', alignItems: 'center', color: '#1890ff', cursor: 'pointer' }">
          <span>更多</span>
          <n-icon :component="CaretForwardOutline"></n-icon>
        </div>
      </div>

      <div class="song-list" :style="{ backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden' }">
        <div
            :style="{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 80px', padding: '10px 20px', borderBottom: '1px solid #f0f0f0', fontWeight: 'bold', color: '#666' }">
          <div>序号</div>
          <div>歌曲</div>
          <div>歌手</div>
          <div>时长</div>
        </div>

        <div v-for="(song, index) in latestSongs" :key="song.id"
             :style="{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 80px', padding: '10px 20px', borderBottom: '1px solid #f0f0f0', alignItems: 'center', cursor: 'pointer', transition: 'background-color 0.2s' }"
             :class="{ 'hover:bg-gray-50': true }" @click="playSong(song)">
          <div :style="{ color: '#999' }">{{ index + 1 }}</div>
          <div :style="{ display: 'flex', alignItems: 'center' }">
            <span>{{ song.title }}</span>
          </div>
          <div>{{ song.artist }}</div>
          <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }">
            <span>{{ song.duration }}</span>
            <n-icon :component="HeartOutline" @click.stop="favoriteSong(song,index)"></n-icon>
          </div>
        </div>
      </div>
    </div>

    <!-- 热门歌手区域 -->
    <div class="section-container">
      <div class="section-header"
           :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }">
        <h2 :style="{ fontSize: '20px', fontWeight: 'bold', color: '#333' }">热门歌手</h2>
        <div class="section-more"
             :style="{ display: 'flex', alignItems: 'center', color: '#1890ff', cursor: 'pointer' }">
          <span>更多</span>
          <n-icon :component="CaretForwardOutline"></n-icon>
        </div>
      </div>

      <div class="singer-list"
           :style="{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '20px' }">
        <div v-for="singer in hotSingers" :key="singer.id"
             :style="{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }"
             @click="$router.push(`/artistprofile/${singer.id}`)"
        >
          <div
              :style="{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', marginBottom: '10px' }">
            <img :src="singer.avatar" alt="歌手头像" :style="{ width: '100%', height: '100%', objectFit: 'cover' }"/>
          </div>
          <h3 :style="{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }">{{ singer.name }}</h3>
          <p :style="{ fontSize: '12px', color: '#888' }">{{ singer.songCount }}首歌曲</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 首页容器样式 */
.home-container {
  padding: 20px;
}

/* 轮播图样式 */
.banner-container {
  display: flex;
  height: 16rem;
  margin-bottom: 30px;
}

/* 区域标题样式 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

/* 歌单网格样式 */
.playlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

/* 歌手列表样式 */
.singer-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .playlist-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }

  .song-list {
    font-size: 14px;
  }
}
</style>