<script setup>
import {getPlaylists} from "@/api/songlist.js"
import {ref} from "vue"
import {useMessage} from "naive-ui"
import {useRouter} from "vue-router";
const router = useRouter()
let msg= useMessage()
const songlist = ref([])
const data = ref('')
const getSonglist = async () => {
  let res = await getPlaylists()
  data.value = res.data
  songlist.value = res.data.data
}
getSonglist()

const goDetail = (id) =>{
  router.push(`/playlist/${id}`)
}
</script>
<template>
  <h1 class="text-3xl" style="margin-bottom: 25px">我的歌单</h1>

  <n-flex>
    <n-flex justify="center" size="large">
      <n-flex v-for="song in songlist" :key="song.id" @click.stop="goDetail(song.id)"
              class="max-w-48 group hover:scale-105 transition-transform duration-300 cursor-pointer">
        <div class="relative w-full rounded-xl overflow-hidden" style="aspect-ratio: 1/1;">
          <n-image preview-disabled class="w-full h-full object-cover"
                   :src="song.cover || 'https://imgapi.xl0408.top/index.php'"></n-image>

          <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          <div
              class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg class="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        <div class="text-center w-full justify-center">
          <h1 class="text-l"> {{ song.name }} </h1>
          <span class="text-gray-500 text-sm font-bold">
            By {{ song.nickname }}
          </span>
        </div>
      </n-flex>
    </n-flex>
  </n-flex>
<!--  <pre class="text-xl">-->
  <!--  {{ data }}-->
  <!--</pre>-->
</template>

<style scoped>
.object-cover {
  object-fit: cover;
}
</style>
