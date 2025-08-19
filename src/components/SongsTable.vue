<script setup lang="ts">
import {NIcon, useMessage} from 'naive-ui';
import {h} from "vue";
import {Heart} from "@vicons/ionicons5";
import {usePlayerStore} from '@/stores/player'

const props = defineProps({
  columns: Array,
  loading: Boolean,
  rowClick: Function,
})
const data = defineModel('data', {required: true})
const loading = defineModel('loading', {required: true})
let msg = useMessage()


const columns = [
  {
    title: "#",
    key: "id",
    render(row: any, index: number) {
      return h('div', {style: {width: '26px'}}, index + 1)
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
          gap: '8px',
          width: '400px',
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
const playerStore = usePlayerStore()
const rowClick = (song: any) => ({
  style: 'cursor: pointer;',
  ondblclick: () => {
    playerStore.play(song)
    playerStore.addPlaylist(data.value)
  }
})
</script>

<template>
  <n-data-table
      :loading="loading"
      :columns="columns"
      :data="data || []"
      :bordered="false"
      :row-props="rowClick"
      striped
  />
</template>

<style scoped>

</style>