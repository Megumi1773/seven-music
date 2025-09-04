<script setup>
import {storeToRefs} from "pinia"
import {useSongListStore} from '@store/songlist'
import {addPlayListSong} from "@/api/songlist.js";
import {usePlayerStore} from "@store/player.js";

const show = defineModel('show', {required: true})
const currentData = defineModel('currentline', {required: true})
const songListStore = useSongListStore()
const {songList} = storeToRefs(songListStore)
const collectPlaylist = async (id) => {
  // window.$message.info(JSON.stringify(data.value))
  let data = {
    song_ids: [currentData.value.id],
  }

  let res = await addPlayListSong(id, data)
  if (res.data.code === 200) {
    window.$message.success(res.data.message)
    show.value = false
  }
}
</script>

<template>
  <!--收藏模态框-->
  <n-modal
      v-model:show="show"
      class="max-w-xl"
      preset="card"
      title="收藏到歌单"
      size="huge"
      :bordered="false"
  >
    <n-list hoverable clickable>
      <n-list-item v-for="item in songList" :key="item.id" @click="collectPlaylist(item.id)">
        <n-flex align="center">
          <n-image :src="item.cover" mode="aspectFit" class="rounded" width="96" height="96">
          </n-image>
          <p>{{ item.name }}</p>
        </n-flex>
      </n-list-item>
    </n-list>
  </n-modal>
</template>

<style scoped>

</style>