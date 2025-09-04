<script setup lang="ts">
import {NIcon, useMessage} from 'naive-ui';
import {computed, h, nextTick, ref} from "vue";
import {Heart} from "@vicons/ionicons5";
import {usePlayerStore} from '@/stores/player'
import {useLikeSongStore} from '@store/likesong'
import {storeToRefs} from "pinia";
import {useRouter, useRoute} from "vue-router"
import {deleteSongInSongList} from '@/api/songlist'
import CollectModal from "@/components/CollectModal.vue";

const router = useRouter()
const route = useRoute()
const playlistId = ref(route.params.id)
const data = defineModel('data', {required: true})
const loading = defineModel('loading', {required: true})
let msg = useMessage()
const likeSongStore = useLikeSongStore()
const {LikeSongIds} = storeToRefs(likeSongStore)
const columns = computed(() => ([
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
          width: '380px',
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
    render(row: any) {
      return h('div', {
        style: {cursor: 'pointer'},
        onClick: (e: Event) => {
          e.stopPropagation()
          router.push(`/album/${row.album_id}`)
        }
      }, row.album_name)
    }
  },
  {
    title: "喜欢",
    render(row: any) {
      // 使用 h 函数渲染 NIcon 并传入图标组件
      return h(NIcon, {
        size: 18, // 图标大小
        color: LikeSongIds.value.has(row.id) ? 'red' : '#999',
        style: {cursor: 'pointer'},
        onClick: (e: Event) => {
          e.stopPropagation()
          likeSongStore.toggleLike(row.id)
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
  }]))
// 歌曲时长格式化
const formtDate = (num: number) => {
  let minutes = Math.floor(num / 60)
  let seconds = Math.floor(num % 60)
  return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}
const playerStore = usePlayerStore()
const theCurrentLine = ref<any>({})
const rowClick = (song: any) => ({
  style: 'cursor: pointer;',
  ondblclick: () => {
    playerStore.play(song)
    playerStore.addPlaylist(data.value)
  },
  onContextmenu: (e: MouseEvent) => {
    theCurrentLine.value = song
    e.preventDefault()
    nextTick().then(() => {
      showDropdown.value = true
      x.value = e.clientX
      y.value = e.clientY
    })
  }
})
// 右键弹窗
const x = ref(0)
const y = ref(0)
const dropDownOptions = defineProps({
  options: Array,
})
const showDropdown = ref(false)
const onClickoutside = (e: Event) => {
  showDropdown.value = false
}
const handleSelect = (key: any) => {
  switch (key) {
    case 'play':
      playerStore.play(theCurrentLine.value)
      showDropdown.value = false
      break
    case 'addPlaylist':
      playerStore.addPlaylist(theCurrentLine.value)
      showDropdown.value = false
      break
    case 'addFavorite':
      show.value = true
      break
    case 'delete':
      deleteSongInPlayList()
      break
  }
}
const deleteSongInPlayList = async () => {
  let res = await deleteSongInSongList(playlistId.value, theCurrentLine.value.id)
  if (res.data.code === 200) {
    window.$message.success(res.data.message)
    showDropdown.value = false
    emit("deleteSuccess")
  }
}
const emit = defineEmits(['deleteSuccess'])
const show = defineModel('collectModalShow', {required: true})
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
  <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="x"
      :y="y"
      :options="options"
      :show="showDropdown"
      :on-clickoutside="onClickoutside"
      @select="handleSelect"
  />

  <!--  收藏模态框-->
  <CollectModal v-model:currentline="theCurrentLine" v-model:show="show"></CollectModal>
</template>

<style scoped>

</style>