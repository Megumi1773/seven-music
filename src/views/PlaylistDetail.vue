<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {getPlaylistById, getPlayListSongs} from '@/api/songlist'
import {ref, h, computed} from "vue";
import {NIcon, useMessage} from "naive-ui"
import {Heart} from '@vicons/ionicons5';

let msg = useMessage()
const route = useRoute()
let playlistId = route.params.id
const playlistDetail = ref()
const playlistSongs = ref()
const loading = ref(false)
const getInfoa = async () => {
  loading.value = true
  let a = await getPlaylistById(playlistId)
  playlistDetail.value = a.data.data
  if (a.data.code === 200) {
    msg.success(a.data.message)
    loading.value = false
  }
}
const getInfob = async () => {
  loading.value = true
  let b = await getPlayListSongs(playlistId)
  playlistSongs.value = b.data.data
  if (b.data.code === 200) {
    msg.success(b.data.message)
    loading.value = false
  }
}
getInfoa()
getInfob()

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
    render(row:any) {
      return h('span', {}, {
        default: () => formtDate(row.duration),
      })
    }
  }
]
const formtDate = (num: number) => {
  let minutes = Math.floor(num / 60)
  let seconds = Math.floor(num % 60)
  return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}
</script>

<template>
  <n-card>
    <n-flex></n-flex>
  </n-card>
  <n-data-table
      :loading="loading"
      :columns="columns"
      :data="playlistSongs"
      :bordered="false"
      striped
  />
  <pre>
歌单ID:{{ playlistId }}
歌单信息:{
  {{ playlistDetail }}
  }
歌单歌曲：{
  {{ playlistSongs }}
  }
</pre>
</template>

<style scoped>

</style>