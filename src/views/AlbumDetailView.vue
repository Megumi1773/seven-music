<script setup>
import {useRoute} from "vue-router";
import {getAlbumById, getAlbumSongs} from '@/api/albums.js'
import {h, ref, watch} from "vue";
import {NIcon, useMessage} from "naive-ui"
import {Play, Download} from '@vicons/ionicons5';
import {usePlayerStore} from '@/stores/player'
import SongsTable from "@/components/SongsTable.vue";
import {PlayerPlay, PlayerSkipForward, PlaylistAdd} from "@vicons/tabler";

const defaultAvatar =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciLz4='

let msg = useMessage()
const route = useRoute()
let albumId = ref(route.params.id)
const playlistDetail = ref({
  artist_name: '',
  cover: '',
  name: '',
  artist_cover: '',
  release_time: ''
})
const playlistSongs = ref([])
const loading = ref(false)
const getAlbumDetail = async () => {
  loading.value = true
  let a = await getAlbumById(albumId.value)
  playlistDetail.value = a.data.data
  if (a.data.code === 200) {
    loading.value = false
  }
}
const getAlbumSong = async () => {
  loading.value = true
  let b = await getAlbumSongs(albumId.value)
  playlistSongs.value = b.data.data
  if (b.data.code === 200) {
    loading.value = false
  }
}

// 歌曲时长格式化
const formtDate = (num) => {
  let minutes = Math.floor(num / 60)
  let seconds = Math.floor(num % 60)
  return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}
// 创建日期格式化
const formatDate = (iso) => new Date(iso).toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
})

const playerStore = usePlayerStore()

const playAll = () => {
  playerStore.addPlaylist(playlistSongs.value)
  playerStore.play(playlistSongs.value[0])
}
watch(
    () => route.params.id,
    (newId) => {
      albumId.value = newId
      getAlbumDetail()
      getAlbumSong()
    },
    {immediate: true}
)

// 给列表的右键菜单
const albumOptions = [{
  label: '播放',
  key: 'play',
  icon: () => h(NIcon, null, {default: () => h(PlayerPlay)}),
},
  {
    label: '下一首播放',
    key: 'addPlaylist',
    icon: () => h(NIcon, null, {default: () => h(PlayerSkipForward)}),
  },
  {type: 'divider', key: 'd1'},
  {
    label: '收藏',
    key: 'addFavorite',
    icon: () => h(NIcon, null, {default: () => h(PlaylistAdd)}),
  },]

const collectModalShow = ref(false)
</script>

<template>
  <n-card :bordered="false" class="w-full mx-auto">
    <n-flex justify="space-between" align="center">
      <!-- 左侧封面 -->
      <n-image
          :src="playlistDetail.cover"
          :preview-disabled="true"
          width="256"
          height="256"
          object-fit="cover"
          class="rounded-lg flex-shrink-0"
      />

      <!-- 右侧文字 -->
      <n-flex vertical class="ml-4 flex-1" style="gap: 2.5rem">
        <!-- 专辑名 -->
        <h1 class="text-xl font-semibold">
          {{ playlistDetail.name }}
        </h1>

        <!-- 创建者 -->
        <n-flex align="center" class="text-sm text-gray-500">
          <n-avatar
              round
              :size="24"
              :src="playlistDetail.artist_cover"
              :fallback-src="defaultAvatar"
          />
          <span>{{ playlistDetail.artist_name || '匿名用户' }}</span>
          <!-- 创建日期 -->
          <span class="text-xs text-gray-400">
            {{ formatDate(playlistDetail.release_time) }} 发布
          </span>
        </n-flex>
        <n-flex>
          <n-button type="primary" @click.stop="playAll">
            <template #icon>
              <n-icon>
                <Play/>
              </n-icon>
            </template>
            播放全部
          </n-button>
          <n-button strong quaternary type="primary">
            <template #icon>
              <n-icon>
                <Download/>
              </n-icon>
            </template>
            下载
          </n-button>
        </n-flex>
      </n-flex>
    </n-flex>
  </n-card>
  <SongsTable :options="albumOptions" v-model:collect-modal-show="collectModalShow" v-model:data="playlistSongs" v-model:loading="loading"></SongsTable>
  <!--  <pre>-->
  <!--歌单ID:{{ playlistId }}-->
  <!--歌单信息:{-->
  <!--  {{ playlistDetail }}-->
  <!--  }-->
  <!--歌单歌曲：{-->
  <!--  {{ playlistSongs }}-->
  <!--  }-->
</template>
<!--</pre>-->
