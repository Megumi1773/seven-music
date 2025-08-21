<script setup>
import {createNewPlaylist, deletePlaylist, getPlaylists} from "@/api/songlist.js"
import {getUserInfo} from "@/api/user.js"
import {ref, onMounted, useTemplateRef} from "vue"
import {useMessage, NImage, NFlex, NEmpty, NButton, NSpin, NGrid, NGridItem, NIcon} from "naive-ui"
import {useRouter} from "vue-router";
import {Play, AddOutline} from '@vicons/ionicons5'
import {
  Trash,
} from '@vicons/tabler'
import {useSongListStore} from "@store/songlist.js"
import {storeToRefs} from "pinia"

const router = useRouter()
let msg = useMessage()
const songListStore = useSongListStore()
const {songList} = storeToRefs(songListStore) || []
const userInfo = ref(null)
const loading = ref(true)

const getUserData = async () => {
  try {
    const [userRes] = await Promise.all([
      getUserInfo()
    ])
    userInfo.value = userRes.data?.data || userRes.data
  } catch (error) {
    msg.error(error.message)
  } finally {
    loading.value = false
  }
}

const goDetail = (id) => {
  router.push(`/playlist/${id}`)
}
const show = ref(false)
const showNewPlaylist = () => {
  show.value = !show.value
  addPlaylist.value = {
    name: '',
    cover: null,
    description: null,
    is_public: null,
  }
}

const addPlaylist = ref({
  name: '',
  cover: null,
  description: null,
  is_public: null,
})
const createPlaylist = async () => {
  try {
    await addForm.value?.validate()
  } catch {
    return false
  }
  const payload = {
    name: addPlaylist.value.name,          // 必填
    ...(addPlaylist.value.cover && {cover: addPlaylist.value.cover}),
    ...(addPlaylist.value.description && {description: addPlaylist.value.description}),
    ...(addPlaylist.value.is_public !== null && {is_public: addPlaylist.value.is_public})
  }
  let res = await createNewPlaylist(payload)
  if (res.data.code === 200) {
    msg.success(res.data.message)
    await getUserData()
    await songListStore.getUserPlaylist()
  }
}
const addForm = useTemplateRef('addForm') || null

const rule = ref({
  name: [
    {required: true, message: '必填'},
    {max: 20, message: '最多20字'}
  ],
  description: [
    {max: 200, message: '最多200字'}
  ],
  cover: []
})
onMounted(() => {
  getUserData()
})
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
    label: '删除歌单',
    key: 'delete',
    icon: () => h(NIcon, null, {default: () => h(Trash)}),
  }
]
// 外部点击 关闭
const onClickoutside = () => {
  contextShow.value = false
}
// 事件
const handleSelect = (key) => {
  switch (key) {
    case 'delete':
      dialogShow.value = true
      break
  }
}

const deleteSongList = async () => {
  let res = await deletePlaylist(currentID.value)
  if (res.data.code === 200) {
    msg.success(res.data.message)
  }
}

// 删除确认
const dialogShow = ref(false)
const submitCallback = () => {
  deleteSongList()
  getUserData()
  contextShow.value = false
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
          <h1 class="text-2xl font-bold mb-1">我的创建的歌单</h1>
          <p class="text-gray-600">共 {{ songList.length }} 个歌单</p>
        </n-flex>
        <n-button-group>
          <n-button type="primary" @click="showNewPlaylist">
            <template #icon>
              <n-icon>
                <AddOutline/>
              </n-icon>
            </template>
            新建歌单
          </n-button>
          <n-button strong secondary type="success">
            <template #icon>
              <n-icon>
                <Play/>
              </n-icon>
            </template>
            随机播放
          </n-button>
        </n-button-group>
      </n-flex>
    </n-flex>
    <n-spin :show="loading" size="large">
      <n-empty v-if="!loading && songList.length === 0" description="暂无歌单">
        <template #extra>
          <n-button type="primary" @click="showNewPlaylist">
            <template #icon>
              <AddOutline/>
            </template>
            创建歌单
          </n-button>
        </template>
      </n-empty>

      <n-grid v-else :cols="6" :x-gap="24" :y-gap="24">
        <n-grid-item v-for="song in songList" :key="song.id" @contextmenu="handleContextMenu($event,song.id)">
          <div @click="goDetail(song.id)" class="group cursor-pointer">
            <div class="relative rounded-lg overflow-hidden mb-2" style="aspect-ratio: 1/1;">
              <n-image
                  preview-disabled
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  :src="song.cover || 'https://imgapi.xl0408.top/index.php'"
              />
              <div
                  class="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-all duration-300 flex items-center justify-center pointer-events-none z-10">
                <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <svg class="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <h3 class="font-medium text-sm truncate">{{ song.name }}</h3>
              <p class="text-xs text-gray-500">{{ song.nickname }}</p>
            </div>
          </div>
        </n-grid-item>
      </n-grid>
    </n-spin>
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

  <!--  删除确认弹窗-->
  <n-modal
      v-model:show="dialogShow"
      preset="dialog"
      type="warning"
      title="删除歌单"
      content="你确认?"
      positive-text="确认"
      negative-text="算了"
      @positive-click="submitCallback"
  />
  <!--  新建歌单弹窗-->
  <n-modal
      v-model:show="show"
      preset="dialog"
      title="新建歌单"
      positive-text="确认"
      negative-text="算了"
      @positive-click="createPlaylist"
      content-style="padding:20px"
  >
    <n-form :model="addPlaylist" novalidate ref="addForm" :rules="rule">
      <n-form-item
          label="歌单名称"
          path="name"
      >
        <n-input
            v-model:value="addPlaylist.name"
            placeholder="歌单名称"
            type="textarea"
            :autosize="{
          minRows: 3,
          maxRows: 5,
        }"
        />
      </n-form-item>
      <n-form-item
          label="描述"
          path="description"
      >
        <n-input
            v-model:value="addPlaylist.description"
            placeholder="歌单描述"
            type="textarea"
            :autosize="{
          minRows: 3,
          maxRows: 5,
        }"
        />
      </n-form-item>
      <n-form-item path="cover" label="封面">
        <n-input v-model:value="addPlaylist.cover"
                 placeholder="歌单封面（请输入公共的网络图片url）"
        >
        </n-input>
      </n-form-item>
      <n-form-item path="is_public">
        <n-checkbox value="0" v-model:value="addPlaylist.is_public">
          是否隐私歌单
        </n-checkbox>
      </n-form-item>

    </n-form>
    <pre>
          {
      name: {{ addPlaylist.name }},
      cover: {{ addPlaylist.cover }},  #可选
      description: {{ addPlaylist.description }}, #可选
      isPublic: {{ addPlaylist.is_public }}, #可选
    }
        </pre>
  </n-modal>

  <!--  <pre class="text-xl">-->
  <!--  {{ data }}-->
  <!--</pre>-->
</template>

<style scoped>
.object-cover {
  object-fit: cover;
}
</style>
