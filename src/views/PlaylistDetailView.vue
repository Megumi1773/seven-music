<script setup lang="ts">
import {useRoute} from "vue-router";
import {getPlaylistById, getPlayListSongs} from '@/api/songlist'
import {ref, h, watch} from "vue";
import {NIcon,useMessage} from "naive-ui"
import {Heart, Play, Download} from '@vicons/ionicons5';
import {usePlayerStore} from '@/stores/player'
import SongsTable from "@/components/SongsTable.vue";

const defaultAvatar =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciLz4='

let msg = useMessage()
const route = useRoute()
let playlistId = ref(route.params.id)
const playlistDetail = ref({
  name: '',
  cover: '',
  nickname: '',
  user_avatar: '',
  created_at: ''
})
const playlistSongs = ref([])
const loading = ref(false)
const getPlaylistDetail = async () => {
  loading.value = true
  let a = await getPlaylistById(playlistId.value)
  playlistDetail.value = a.data.data
  if (a.data.code === 200) {
    loading.value = false
  }
}
const getPlaylistSong = async () => {
  loading.value = true
  let b = await getPlayListSongs(playlistId.value)
  playlistSongs.value = b.data.data
  if (b.data.code === 200) {
    loading.value = false
  }
}

// 歌曲时长格式化
const formtDate = (num: number) => {
  let minutes = Math.floor(num / 60)
  let seconds = Math.floor(num % 60)
  return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}
// 创建日期格式化
const formatDate = (iso: string) => new Date(iso).toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
})

const playerStore = usePlayerStore()

const playAll = () => {
  playerStore.play(playlistSongs.value[0])
  playerStore.addPlaylist(playlistSongs.value)
}
watch(
    () => route.params.id,
    (newId) => {
      playlistId.value = newId
      getPlaylistDetail()
      getPlaylistSong()
    },
    {immediate: true}
)
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
        <!-- 歌单名 -->
        <h1 class="text-xl font-semibold">
          {{ playlistDetail.name }}
        </h1>

        <!-- 创建者 -->
        <n-flex align="center" class="text-sm text-gray-500">
          <n-avatar
              round
              :size="24"
              :src="playlistDetail.user_avatar"
              :fallback-src="defaultAvatar"
          />
          <span>{{ playlistDetail.nickname || '匿名用户' }}</span>
          <!-- 创建日期 -->
          <span class="text-xs text-gray-400">
            {{ formatDate(playlistDetail.created_at) }} 创建
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
  <SongsTable v-model:data="playlistSongs" v-model:loading="loading"></SongsTable>
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
