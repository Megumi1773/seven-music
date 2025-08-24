<script setup>
import {getArtistInfo, getArtistSongs, getArtistSongCount} from '@/api/artist'
import {ref, computed, watch} from "vue";
import {useMessage,} from 'naive-ui'
import {User} from '@vicons/tabler'

import {useRoute} from "vue-router";
import {Play, HeartOutline} from "@vicons/ionicons5";
import SongsTable from "@/components/SongsTable.vue";
import {usePlayerStore} from '@store/player'
import AlbumsList from "@/components/AlbumsList.vue";
import {getArtistAlbums} from "@/api/artist.js"

let msg = useMessage()


let loading = ref(false)

const route = useRoute()
const artistId = ref(route.params.id)
// 表单数据
const artistInfo = ref({
  id: '',
  name: '',
  nickname: '',
  description: '',
  avatar: '',
})

const getArtist = async () => {
  try {
    loading.value = true
    let res = await getArtistInfo(artistId.value)
    if (res.data.code === 200) {
      artistInfo.value = res.data.data
    }
  } finally {
    loading.value = false
  }
}

getArtist()

const fromtText = computed(() => artistInfo.value.description.replace(/\n/g, '<br>'))
// 获取 歌手歌曲
const SongList = ref([])
const page = ref(1)
const pageSize = ref(10)
const allSongNums = ref(0)
const getSongsCount = async () => {
  let res = await getArtistSongCount(artistId.value)
  allSongNums.value = res.data.data
}
const songsNumber = computed(() => Math.ceil(allSongNums.value / pageSize.value))
const getSongList = async () => {
  loading.value = true
  try {
    let res = await getArtistSongs(artistId.value, page.value, pageSize.value)
    SongList.value = res.data.data
  } finally {
    loading.value = false
  }
}
getSongsCount()
watch(
    () => page.value,
    () => getSongList()
)
getSongList()

// 播放
const player = usePlayerStore()
const playAll = () => {
  player.play(SongList.value[0])
  player.addPlaylist(SongList.value)
}


// 专辑相关
const albums = ref([])
const getData = async () => {
  try {
    let res = await getArtistAlbums(artistId.value)
    albums.value = res.data.data || []
  } catch (e) {
    msg.error(e.message)
  } finally {
    loading.value = false
  }
}
getData()
</script>

<template>
  <div class="mx-auto p-6 w-full">
    <n-spin :show="loading">
      <div class="space-y-6">
        <!-- 头像区域 -->
        <n-card style="background:#30593E;" class="text-white rounded-2xl overflow-hidden shadow-xl"
                :bordered="false">
          <div class="flex items-center gap-6 p-8 md:flex-row flex-col md:text-left text-center">
            <div class="relative">
              <n-avatar
                  :size="240"
                  :src="artistInfo.avatar"
                  round
                  class="border-4 border-white/20 shadow-2xl"
              >
                <n-icon :size="40" :component="User" v-if="!artistInfo.avatar"/>
              </n-avatar>
            </div>

            <n-flex vertical justify="center" class="">
              <h3 class="text-2xl text-white/80 font-semibold mb-2">{{ artistInfo.name || artistInfo.name }}</h3>
              <p class="text-white/80 text-sm">ID: {{ artistInfo.nickname }}</p>
              <div class="mt-12 flex items-center gap-6">
                <n-button type="primary" @click="playAll">
                  <template #icon>
                    <n-icon>
                      <Play/>
                    </n-icon>
                  </template>
                  播放全部
                </n-button>
                <n-button type="success">
                  <template #icon>
                    <n-icon>
                      <HeartOutline/>
                    </n-icon>
                  </template>
                  关注
                </n-button>
              </div>
            </n-flex>
          </div>
        </n-card>
      </div>
      <!--      tab 切换栏-->
      <n-tabs type="line" animated>
        <n-tab-pane name="歌曲" tab="歌曲">
          <SongsTable v-model:loading="loading" v-model:data="SongList"/>
          <n-pagination v-model:page="page" :page-count="songsNumber"/>
        </n-tab-pane>
        <n-tab-pane name="专辑" tab="专辑">
          <AlbumsList v-model:albums-list="albums"></AlbumsList>
        </n-tab-pane>
        <n-tab-pane name="歌手详情" tab="歌手详情">
          <n-card
              rounded
              class="p-6 bg-gradient-to-br from-emerald-50 via-white to-teal-50 shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <div
                class="prose prose-emerald max-w-none
           text-emerald-900 leading-relaxed
           selection:bg-green-200 selection:text-green-900"
                v-html="fromtText"
            />
          </n-card>
        </n-tab-pane>
      </n-tabs>
    </n-spin>
  </div>
</template>

<style scoped>
/* 保留必要的动画效果 */
.space-y-6 > * {
  animation: fadeInUp 0.6s ease-out;
}

.space-y-6 > *:nth-child(2) {
  animation-delay: 0.1s;
}

.space-y-6 > *:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
