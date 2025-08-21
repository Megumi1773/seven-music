<script setup lang="ts">
import {
  PlayerPlay,
  PlayerSkipBack,
  PlayerSkipForward,
  Volume as VolumeIcon,
  Volume3,
  PlayerPause,
  Playlist,
  PlaylistAdd
} from "@vicons/tabler";
import {NButton, NIcon, useMessage} from "naive-ui";
import {onMounted, ref, useTemplateRef, watch} from "vue"
import {storeToRefs} from 'pinia'
import {usePlayerStore} from '@store/player'
import {useMediaControls, useStorage} from "@vueuse/core";
import {addPlayListSong} from '@/api/songlist'
import {useSongListStore} from '@store/songlist'

const player = usePlayerStore()
const {currentSong: song} = storeToRefs(player)
let msg = useMessage()
const audioRef = useTemplateRef('audio')
const {currentTime, duration, volume, muted, playing, ended} = useMediaControls(audioRef)
const savedTime = useStorage('audio-current-time', 0)
watch(currentTime, val => savedTime.value = val)
// 格式化进度条信息
const formatPlayerTime = (v: number) => {
  const m = Math.floor(v / 60).toString().padStart(2, "0")
  const s = Math.floor(v % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}
// 格式化音量百分比
const formatHudPoint = (h: number) => {
  return `${Math.floor(h * 100)}%`
}
// 一键静音
const volumeToggle = () => {
  muted.value = !muted.value
}
// 播放 暂停
const togglePlay = () => {
  playing.value = !playing.value
}
// 通知父组件展开播放列表
const emits = defineEmits(['openPlayList'])
// 播完 自动切歌
watch(ended, () => {
  player.nextSong()
})

onMounted(() => {
  if (savedTime.value && audioRef.value) {
    audioRef.value.currentTime = savedTime.value
  }
})

// 收藏
const collectModalShow = ref(false)
const openModal = () => {
  collectModalShow.value = true
}
const collectPlaylist = async (id: number) => {
  let data = {
    song_ids: [song.value.id],
  }
  let res = await addPlayListSong(id, data)
  if (res.data.code === 200) {
    msg.success(res.data.message)
    collectModalShow.value = false
  }
}
const songListStore = useSongListStore()
const {songList} = storeToRefs(songListStore)
</script>

<template>
  <div style="display: flex; align-items: center; justify-content: space-between; height: 100%;">
    <audio ref="audio" autoplay :src="song.url" style="display: none">
    </audio>
    <!-- 歌曲信息 -->
    <div style="display: flex; align-items: center; gap: 12px;">
      <n-image preview-disabled style="width: 64px;height: 64px" v-if="song.album_cover"
               :src="song.album_cover"></n-image>
      <div style="width: 64px; height: 64px; background-color: #f0f0f0; border-radius: 4px;" v-else></div>
      <div class="w-36 truncate">
        <div style="font-size: 14px; font-weight: 500; color: #333;">
          <n-marquee>
            <pre class="font-bold"> {{ song.name.replace(/\s+/g, '') || '歌曲名称' }}-<span style="color: #666;">{{
                (song.artist_name || '作者') + "      "
              }}</span></pre>
          </n-marquee>
        </div>
        <n-flex>
          <n-button size="small" quaternary circle @click="openModal">
            <n-icon size="20" class="hover:cursor-pointer text-black" color="#666">
              <PlaylistAdd/>
            </n-icon>
          </n-button>
          <n-button size="small" quaternary circle>
            <n-icon size="20" class="hover:cursor-pointer text-black" color="#666">
              <PlaylistAdd/>
            </n-icon>
          </n-button>
          <n-button size="small" quaternary circle>
            <n-icon size="20" class="hover:cursor-pointer text-black" color="#666">
              <PlaylistAdd/>
            </n-icon>
          </n-button>
        </n-flex>
      </div>
    </div>
    <!-- 播放控制 -->
    <div style="display: flex; flex-direction: column; align-items: center;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <n-button circle size="small" quaternary @click="player.prevSong">
          <n-icon>
            <player-skip-back/>
          </n-icon>
        </n-button>
        <n-button circle size="large" type="primary" @click="togglePlay">
          <n-icon v-if="playing">
            <PlayerPause/>
          </n-icon>
          <n-icon v-else>
            <player-play/>
          </n-icon>
        </n-button>
        <n-button circle size="small" quaternary @click="player.nextSong">
          <n-icon>
            <player-skip-forward/>
          </n-icon>
        </n-button>
      </div>
      <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px;">
        <span style="font-size: 12px; color: #666;">{{ formatPlayerTime(currentTime) }}</span>
        <div class="w-96">
          <n-slider v-model:value="currentTime" :max="duration" class="w-full"
                    :format-tooltip="formatPlayerTime" :step="1"/>
        </div>
        <span style="font-size: 12px; color: #666;">{{ formatPlayerTime(duration) }}</span>
      </div>
    </div>

    <!-- 音量控制 -->
    <div style="display: flex; align-items: center; gap: 8px;">
      <n-button circle size="small" quaternary @click="volumeToggle">
        <n-icon v-if="muted">
          <Volume3/>
        </n-icon>
        <n-icon v-else>
          <VolumeIcon/>
        </n-icon>
      </n-button>
      <div class="w-28">
        <n-slider v-model:value="volume" :max="1" class="w-full" :step="0.01" :format-tooltip="formatHudPoint"/>
      </div>
      <n-button circle size="small" quaternary @click="emits('openPlayList')">
        <n-icon>
          <Playlist/>
        </n-icon>
      </n-button>
    </div>

  </div>

  <!--收藏模态框-->
  <n-modal
      v-model:show="collectModalShow"
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