<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {getPlaylistById, getPlayListSongs} from '@/api/songlist'
import {ref, h, computed} from "vue";
import {NIcon, useMessage} from "naive-ui"
import {Heart, Play, Download} from '@vicons/ionicons5';
import {usePlayerStore} from '@/stores/player'

const defaultAvatar =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciLz4='

let msg = useMessage()
const route = useRoute()
let playlistId = route.params.id
const playlistDetail = ref({})
const playlistSongs = ref([])
const loading = ref(false)
const getPlaylistDetail = async () => {
  loading.value = true
  let a = await getPlaylistById(playlistId)
  playlistDetail.value = a.data.data
  if (a.data.code === 200) {
    msg.success(a.data.message)
    loading.value = false
  }
}
const getPlaylistSong = async () => {
  loading.value = true
  let b = await getPlayListSongs(playlistId)
  playlistSongs.value = b.data.data
  if (b.data.code === 200) {
    msg.success(b.data.message)
    loading.value = false
  }
}
getPlaylistDetail()
getPlaylistSong()

const columns = [
  {
    title: "##",
    key: "id",
    render(row: any, index: number) {
      return h('div', index + 1)
    }
  },
  {
    title: "标题",
    key: "name",
    render(row: any) {
      return h('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }
      }, [
        // 专辑封面图片
        h('img', {
          src: row.album_cover,
          style: {
            width: '40px',
            height: '40px',
            borderRadius: '4px'
          }
        }),
        // 歌曲信息及标识区域
        h('div', [
          h('div', {style: {fontWeight: 'bold'}}, row.name),
          h('div', {style: {fontSize: '12px', color: '#999'}}, [
            row.artist_name
          ])
        ])
      ]);
    },
  },

  {
    title: "专辑",
    key: "album_name",
  },
  {
    title: "喜欢",
    render(row: any) {
      // 使用 h 函数渲染 NIcon 并传入图标组件
      return h(NIcon, {
        size: 18, // 图标大小
        color: row.isLiked ? 'red' : '#999', // 可以根据数据动态改变颜色
        style: {cursor: 'pointer'},
        onClick: () => {
          msg.success("喜欢听Eason")
        }
      }, {
        default: () => h(Heart) // 传入图标组件
      });
    }
  },
  {
    title: "时长",
    key: "duration",
    render(row: any) {
      return h('span', {}, {
        default: () => formtDate(row.duration),
      })
    }
  }
]
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

const rowClick = (song: any) => ({
  style: 'cursor: pointer;',
  ondblclick: () => {
    playerStore.play(song)
    playerStore.addPlaylist(playlistSongs.value)
  }
})
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
          <n-button type="primary">
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
  <n-data-table
      :loading="loading"
      :columns="columns"
      :data="playlistSongs"
      :bordered="false"
      :row-props="rowClick"
      striped
  />
<!--  <pre>-->
<!--歌单ID:{{ playlistId }}-->
<!--歌单信息:{-->
<!--  {{ playlistDetail }}-->
<!--  }-->
<!--歌单歌曲：{-->
<!--  {{ playlistSongs }}-->
<!--  }-->
<!--</pre>-->
</template>

<style scoped>
:deep(.n-image) {
  max-width: calc(var(--spacing) * 48);
}
</style>