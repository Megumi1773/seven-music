<script setup>
import {ref} from "vue"
import {NFlex, NGrid, NGridItem, NIcon, NImage} from "naive-ui"
import {useRouter} from "vue-router";
import {DuplicateSharp, Heart, Play} from '@vicons/ionicons5'

const router = useRouter()
const data = defineModel('albumsList', {required: true})
console.log(data)
const goDetail = (id) => {
  router.push(`/album/${id}`)
}


// 右键事件 右键歌单时
const x = ref(0)
const y = ref(0)
const contextShow = ref(false)
const currentID = ref(0)
const handleContextMenu = (e, id) => {
  e.preventDefault()
  x.value = e.clientX
  y.value = e.clientY
  currentID.value = id
  contextShow.value = !contextShow.value
}
// 列表项
const contextOptions = [
  {
    label: '播放',
    key: 'play',
    icon: () => h(NIcon, null, {default: () => h(Play)}),
  },
  {
    label: '添加到播放列表',
    key: 'addPlaylist',
    icon: () => h(NIcon, null, {default: () => h(DuplicateSharp)}),
  },
  {
    label: '收藏',
    key: 'like',
    icon: () => h(NIcon, null, {default: () => h(Heart)}),
  }
]
// 外部点击 关闭
const onClickoutside = () => {
  contextShow.value = false
}
// 点击事件
const handleSelect = (key) => {
  switch (key) {
    case 'delete':
      break
  }
}

const formatRealisDate = (value) => {
  let date = new Date(Date.parse(value))
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  return `${y}-${m}-${d}`
}
</script>
<template>
  <n-card class="mb-8">
    <n-flex align="center" :size="24">
      <!--      <n-avatar-->
      <!--          v-if="userInfo?.avatar"-->
      <!--          :size="80"-->
      <!--          :src="userInfo.avatar"-->
      <!--          round-->
      <!--      />-->
      <n-flex justify="space-between" class="w-full">
        <n-flex align="center" vertical class="mb-5">
          <h1 class="text-2xl font-bold mb-1">专辑</h1>
          <p class="text-gray-600">共 {{ data.length }} 个专辑</p>
        </n-flex>
      </n-flex>
    </n-flex>

    <n-grid :cols="6" :x-gap="24" :y-gap="24">
      <n-grid-item v-for="album in data" :key="album.id" @contextmenu="handleContextMenu($event,album.id)">
        <div @click="goDetail(album.id)" class="group cursor-pointer">
          <div class="relative rounded-lg overflow-hidden mb-2" style="aspect-ratio: 1/1;">
            <n-image
                preview-disabled
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                :src="album.cover || 'https://imgapi.xl0408.top/index.php'"
            />
            <div
                class="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-all duration-300 flex items-center justify-center pointer-events-none z-10">
              <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <n-icon size="48" color="white">
                  <Play/>
                </n-icon>
              </div>
            </div>
          </div>
          <div>
            <h2 class="text-sm truncate text-gray-700 font-black p-3">{{ album.name }}</h2>
            <p class="truncate text-gray-400 font-black p-3">{{ formatRealisDate(album.release_time) }}</p>
          </div>
        </div>
      </n-grid-item>
    </n-grid>
  </n-card>
  <!--  右键菜单-->
  <n-dropdown
      :x="x"
      :y="y"
      :show="contextShow"
      :options="contextOptions"
      :on-clickoutside="onClickoutside"
      @select="handleSelect"
  >
  </n-dropdown>
  <!--  <pre class="text-xl">-->
  <!--  {{ data }}-->
  <!--</pre>-->
</template>

<style scoped>
.object-cover {
  object-fit: cover;
}
</style>
