<script setup>

// 轮播图数据
const banners = [
  {
    id: 1,
    image: 'https://picsum.photos/1200/400?random=1',
    title: '夏日音乐盛典',
    description: '打造你的专属夏日歌单'
  },
  {
    id: 2,
    image: 'https://picsum.photos/1200/400?random=2',
    title: '经典专辑重制版',
    description: '重温那些年的经典之作'
  },
  {
    id: 3,
    image: 'https://picsum.photos/1200/400?random=3',
    title: '独立音乐新势力',
    description: '发现最具潜力的独立音乐人'
  }
]

// 推荐歌单数据
const recommendedPlaylists = [
  {
    id: 1,
    cover: 'https://picsum.photos/300/300?random=10',
    title: '每日推荐',
    creator: '系统推荐',
    songCount: 30
  },
  {
    id: 2,
    cover: 'https://picsum.photos/300/300?random=11',
    title: '夏日清凉',
    creator: '编辑推荐',
    songCount: 25
  },
  {
    id: 3,
    cover: 'https://picsum.photos/300/300?random=12',
    title: '摇滚现场',
    creator: '摇滚频道',
    songCount: 42
  },
  {
    id: 4,
    cover: 'https://picsum.photos/300/300?random=13',
    title: '爵士时光',
    creator: '爵士频道',
    songCount: 18
  },
  {
    id: 5,
    cover: 'https://picsum.photos/300/300?random=14',
    title: '电子音乐',
    creator: '电子频道',
    songCount: 35
  },
  {
    id: 6,
    cover: 'https://picsum.photos/300/300?random=15',
    title: '民谣故事',
    creator: '民谣频道',
    songCount: 22
  }
]

// 热门歌手数据
const hotSingers = [
  {
    id: 1,
    name: '陈奕迅',
    avatar: 'https://picsum.photos/100/100?random=20',
    songCount: 125
  },
  {
    id: 2,
    name: '周杰伦',
    avatar: 'https://picsum.photos/100/100?random=21',
    songCount: 156
  },
  {
    id: 3,
    name: '李宗盛',
    avatar: 'https://picsum.photos/100/100?random=22',
    songCount: 98
  },
  {
    id: 4,
    name: '孙燕姿',
    avatar: 'https://picsum.photos/100/100?random=23',
    songCount: 112
  },
  {
    id: 5,
    name: '五月天',
    avatar: 'https://picsum.photos/100/100?random=24',
    songCount: 143
  }
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
const favoriteSong = (song, index) => {
  console.log('收藏歌曲:', song)
  // 实际项目中这里会调用收藏API
}

</script>
<template>
  <div class="home-container">
    <!-- 轮播图区域 -->
    <div class="banner-container" :style="{ marginBottom: '30px' }">
      <n-carousel :style="{ width: '100%', height: '200px', borderRadius: '8px', overflow: 'hidden' }" autoplay
        interval="5000" indicator-placement="bottom">
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
              banner.description }}</p>
          </div>
        </n-carousel-item>
      </n-carousel>
    </div>

    <!-- 推荐歌单区域 -->
    <div class="section-container" :style="{ marginBottom: '30px' }">
      <div class="section-header"
        :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }">
        <h2 :style="{ fontSize: '20px', fontWeight: 'bold', color: '#333' }">推荐歌单</h2>
        <div class="section-more"
          :style="{ display: 'flex', alignItems: 'center', color: '#1890ff', cursor: 'pointer' }">
          <span>更多</span>
          <n-icon :component="ChevronRight" :size="16" style="marginLeft: '5px'" />
        </div>
      </div>

      <div class="playlist-grid"
        :style="{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }">
        <n-card v-for="playlist in recommendedPlaylists" :key="playlist.id"
          :style="{ borderRadius: '8px', overflow: 'hidden', transition: 'all 0.3s', cursor: 'pointer' }" hoverable>
          <div slot="cover" :style="{ position: 'relative' }">
            <img :src="playlist.cover" alt="歌单封面" :style="{ width: '100%', height: '180px', objectFit: 'cover' }" />
            <div
              :style="{ position: 'absolute', bottom: '0', left: '0', right: '0', background: 'linear-gradient(transparent, rgba(0,0,0,0.5))', padding: '10px' }">
              <n-icon :component="Play" :size="20"
                :style="{ color: '#fff', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', padding: '3px' }" />
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
          <n-icon :component="ChevronRight" :size="16" style="marginLeft: '5px'" />
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
            <n-icon :component="Play" :size="16" :style="{marginRight: '10px', color: '#999', visibility: 'hidden'}"
              class="play-icon" />
            <span>{{ song.title }}</span>
          </div>
          <div>{{ song.artist }}</div>
          <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }">
            <span>{{ song.duration }}</span>
            <n-icon :component="Heart" :size="16" style="color: '#999'" @click.stop="favoriteSong(song, index)" />
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
          <n-icon :component="ChevronRight" :size="16" style="marginLeft: '5px'" />
        </div>
      </div>

      <div class="singer-list"
        :style="{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '20px' }">
        <div v-for="singer in hotSingers" :key="singer.id"
          :style="{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }">
          <div
            :style="{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', marginBottom: '10px' }">
            <img :src="singer.avatar" alt="歌手头像" :style="{ width: '100%', height: '100%', objectFit: 'cover' }" />
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

/* 歌曲列表悬停效果 */
.song-list>div:hover .play-icon {
  visibility: visible !important;
  color: '#1890ff' !important;
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