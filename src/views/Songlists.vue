<script setup>
import {getPlaylists} from "@/api/songlist.js"
import {ref} from "vue"

const songlist = ref([])
const data = ref('')
const getSonglist = async () => {
  let res = await getPlaylists()
  data.value = res.data
  songlist.value = res.data.data
}
getSonglist()
</script>
<template>
  <n-grid :x-gap="12" :y-gap="8" :cols="6">
    <n-grid-item v-for="(song,index) in songlist" :key="song.id">
      <n-flex class="h-60 bg-green-300 rounded-2xl shadow-2xl" :gutter="16">
        <n-image preview-disabled class="w-full rounded-t-2xl" :src="'https://imgapi.xl0408.top/index.php'"></n-image>
        <div>
          <h1>{{ song.name }}</h1>
        </div>
      </n-flex>
    </n-grid-item>
  </n-grid>
  <pre class="text-xl">
  {{ data }}
</pre>
</template>