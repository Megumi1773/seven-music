<script setup lang="ts">
import {
  PlayerPlay,
  PlayerSkipBack,
  PlayerSkipForward,
  Volume as VolumeIcon,
  Volume3,
  PlayerPause,
  Playlist
} from "@vicons/tabler";
import {NButton, NIcon} from "naive-ui";
import {onMounted, ref, useTemplateRef} from "vue";
import {storeToRefs} from 'pinia'
import {usePlayerStore} from '@/stores/player'
import {useMediaControls} from "@vueuse/core";

const player = usePlayerStore()
const {currentSong: song, playlists} = storeToRefs(player)

const audioRef = useTemplateRef('audio')
const {currentTime, duration, volume, muted, playing} = useMediaControls(audioRef)
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

</script>

<template>
  <div style="display: flex; align-items: center; justify-content: space-between; height: 100%;">
    <audio ref="audio" :src="song.url" controls autoplay style="display: none">
    </audio>
    <!-- 歌曲信息 -->
    <div style="display: flex; align-items: center; gap: 12px;">
      <n-image preview-disabled style="width: 64px;height: 64px" v-if="song.album_cover"
               :src="song.album_cover"></n-image>
      <div style="width: 64px; height: 64px; background-color: #f0f0f0; border-radius: 4px;" v-else></div>
      <div>
        <div style="font-size: 14px; font-weight: 500; color: #333;">{{ song.name || '歌曲名称' }}</div>
        <div style="font-size: 12px; color: #666;">{{ song.artist_name || '作者' }}</div>
      </div>
    </div>

    <!-- 播放控制 -->
    <div style="display: flex; flex-direction: column; align-items: center;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <n-button circle size="small" quaternary>
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
        <n-button circle size="small" quaternary>
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
</template>

<style scoped>

</style>