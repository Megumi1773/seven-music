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
} from '@vicons/tabler'
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
const {playlists} = storeToRefs(playerStore)
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
const M = useTemplateRef('drawerM')
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
      <n-layout-content content-style="padding: 24px; background-color: whitesmoke;" ref="drawerM">
        <slot></slot>
        <!-- 播放列表 抽屉-->
        <n-drawer v-if="M" v-model:show="showPlaylist" :width="502" :to="M">
          <n-drawer-content title="斯通纳">
            《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
          </n-drawer-content>
        </n-drawer>
      </n-layout-content>
    </n-layout>
    <!-- 底部播放器控制栏 -->
    <n-layout-footer style="height: 80px; padding: 12px 24px; background-color: #fff; border-top: 1px solid #e0e0e0;"
                     v-if="playlistSongNumbers > 0">
      <MusicPlayer @openPlayList="handleOpenList"></MusicPlayer>
    </n-layout-footer>
  </n-layout>

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
</style>