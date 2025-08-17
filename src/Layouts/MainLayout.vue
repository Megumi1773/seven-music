<script setup>
import {ref, h, useTemplateRef} from 'vue'
import {
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NMenu,
  NInput,
  NButton,
  NSpace,
  NIcon,
} from 'naive-ui'
import {
  Home,
  Search,
  Book,
  Heart,
  Settings,
  PlayerPlay,
  PlayerSkipBack,
  PlayerSkipForward,
  Mist,
  Volume,
  Trash, PlayerPause,
} from '@vicons/tabler'
import {Play} from '@vicons/ionicons5'
import HeaderNav from "@/components/HeaderNav.vue";
import MusicPlayer from "@/components/MusicPlayer.vue";
import {RouterLink, useRoute} from "vue-router";
import {useMessage} from "naive-ui";
import {usePlayerStore} from "@/stores/player.js";
import {storeToRefs} from "pinia";

window.$message = useMessage()
const route = useRoute()

// 侧边栏菜单选项
const menuOptions = [
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: 'discover',
              }
            },
            {default: () => '首页'}
        ),
    key: 'discover',
    icon: () => h(NIcon, null, {default: () => h(Home)})
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: 'search',
              }
            },
            {default: () => '搜索'}
        ),
    key: 'search',
    icon: () => h(NIcon, null, {default: () => h(Search)})
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: 'musiclibary',
              }
            },
            {default: () => '音乐库'}
        ),
    key: 'library',
    icon: () => h(NIcon, null, {default: () => h(Book)})
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: 'like',
              }
            },
            {default: () => '我喜欢的'}
        ),
    key: 'favorites',
    icon: () => h(NIcon, null, {default: () => h(Heart)})
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: 'mysonglists',
              }
            },
            {default: () => '我的歌单'}
        ),
    key: 'mysonglists',
    icon: () => h(NIcon, null, {default: () => h(Mist)})
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: 'settings',
              }
            },
            {default: () => '设置'}
        ),
    key: 'settings',
    icon: () => h(NIcon, null, {default: () => h(Settings)})
  }
]

const activeKey = ref('discover')
const collapsed = ref(false)
const playerStore = usePlayerStore()
const {playlists, currentSong} = storeToRefs(playerStore)
const playlistSongNumbers = computed(() => playlists.value.length)
onMounted(() => {
  setTimeout(() => {
    activeKey.value = route.path.split('/')[1]
  }, 100)
})
const showPlaylist = ref(false)
const handleOpenList = () => {
  showPlaylist.value = !showPlaylist.value
}
const clearPlaylists = () => {
  playlists.value = []
}


const formatPlayerTime = (v) => {
  const m = Math.floor(v / 60).toString().padStart(2, "0")
  const s = Math.floor(v % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}
</script>

<template>
  <n-layout style="height: 100vh;">
    <!-- 顶部导航栏 -->
    <n-layout-header style="height: 64px; padding: 0 24px; background-color: #fff; border-bottom: 1px solid #e0e0e0;">
      <HeaderNav></HeaderNav>
    </n-layout-header>

    <n-layout has-sider style="height: calc(100vh - 64px - 80px);">
      <!-- 侧边栏 -->
      <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="200"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
          style="background-color: #FFF;"
      >
        <n-menu
            v-model:value="activeKey"
            :collapsed="collapsed"
            :collapsed-width="64"
            :options="menuOptions"
        />
      </n-layout-sider>

      <!-- 主内容区域 -->
      <n-layout-content content-style="padding: 24px; background-color: whitesmoke;" id="drawer-anchor">
        <slot></slot>
      </n-layout-content>
    </n-layout>
    <!-- 底部播放器控制栏 -->
    <n-layout-footer style="height: 80px; padding: 12px 24px; background-color: #fff; border-top: 1px solid #e0e0e0;"
                     v-if="playlistSongNumbers > 0">
      <MusicPlayer @openPlayList="handleOpenList"></MusicPlayer>
    </n-layout-footer>
  </n-layout>


  <!-- 播放列表 抽屉-->
  <n-drawer v-model:show="showPlaylist" :show-mask="'transparent'" :width="502" to="#drawer-anchor"
            :trap-focus="true">
    <n-drawer-content>
      <template #header>
        <n-flex justify="space-between" align="center" class="h-14">
          <n-badge :value="playlistSongNumbers" :offset="[14,0]" color="#2F583E"><h1>播放列表</h1></n-badge>
          <n-button circle size="large" quaternary circlequaternary @click="clearPlaylists">
            <n-icon>
              <Trash/>
            </n-icon>
          </n-button>
        </n-flex>
      </template>
      <!--      播放列表虚拟列表-->
      <!-- 播放列表虚拟列表 -->
      <n-virtual-list
          class="playlist"
          :items="playlists"
          :item-size="64"
          :padding-bottom="16"
      >
        <template #default="{ item }">
          <div
              :key="item.id"
              class="track-row hover:bg-gray-100"
              :class="{ active: currentSong.id === item.id }"
              @click.stop="playerStore.play(item)"
          >
            <!-- 序号 / 封面 -->
            <div class="left relative w-12 h-12">
              <!-- 封面 -->
              <n-image
                  preview-disabled
                  :src="item.album_cover"
                  class="cover w-full h-full rounded"
                  @error="e => (e.target.src = '/img/empty.png')"
              />

              <!-- 图标：绝对居中 -->
              <n-icon
                  v-if="currentSong.id === item.id"
                  :size="24"
                  color="#6CB364"
                  class="absolute"
                  style="left: -50%;transform: translateX(25%)"
              >
                <Play />
              </n-icon>
            </div>

            <!-- 歌曲信息 -->
            <div class="info">
              <div class="name">{{ item.name }}</div>
              <div class="meta">{{ item.artist_name }} - {{ item.album_name }}</div>
            </div>

            <!-- 时长 -->
            <div class="duration">
              {{ formatPlayerTime(item.duration) }}
            </div>

            <!-- 垃圾桶图标 -->
            <n-icon
                class="trash"
                size="18"
                @click.stop="playerStore.removePlaylist(item.id)"
            >
              <Trash/>
            </n-icon>
          </div>
        </template>
      </n-virtual-list>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>
.n-layout-header {
  z-index: 1;
  background-color: #fff;
}

.n-layout-footer {
  z-index: 1;
  box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.09);
}

.n-layout-sider {
  box-shadow: 1px 0 0 0 rgba(0, 0, 0, 0.09);
}

.playlist {
  padding: 0 12px;
}

.track-row {
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background .2s;
}

.track-row.active {
  background-color: #e5e7eb;
}

.track-row.active .name {
  color: #6CB364;
  font-weight: 600;
}

.left {
  display: flex;
  align-items: center;
  width: 80px;
  flex-shrink: 0;
}

.index {
  width: 24px;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.cover {
  width: 48px;
  height: 48px;
  border-radius: 4px;
  margin-left: 8px;
  object-fit: cover;
}

.info {
  flex: 1 1 auto;
  overflow: hidden;
  margin-left: 12px;
}

.name {
  font-size: 15px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.duration {
  font-size: 13px;
  color: #bbb;
  margin-right: 16px;
  flex-shrink: 0;
}

.trash {
  color: #bbb;
  cursor: pointer;
}

.trash:hover {
  color: #ff2442;
}
</style>