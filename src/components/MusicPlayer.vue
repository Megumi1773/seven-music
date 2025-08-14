<script setup lang="ts">
import {PlayerPlay, PlayerSkipBack, PlayerSkipForward, Volume} from "@vicons/tabler";
import {NButton, NIcon} from "naive-ui";
</script>

<template>
  <div style="display: flex; align-items: center; justify-content: space-between; height: 100%;">
    <!-- 歌曲信息 -->
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="width: 56px; height: 56px; background-color: #f0f0f0; border-radius: 4px;"></div>
      <div>
        <div style="font-size: 14px; font-weight: 500; color: #333;">歌曲名称</div>
        <div style="font-size: 12px; color: #666;">歌手名称</div>
      </div>
    </div>

    <!-- 播放控制 -->
    <div style="display: flex; flex-direction: column; align-items: center;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <n-button circle size="small" quaternary>
          <n-icon><player-skip-back /></n-icon>
        </n-button>
        <n-button circle size="large" type="primary">
          <n-icon><player-play /></n-icon>
        </n-button>
        <n-button circle size="small" quaternary>
          <n-icon><player-skip-forward /></n-icon>
        </n-button>
      </div>
      <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px;">
        <span style="font-size: 12px; color: #666;">00:00</span>
        <div style="width: 200px; height: 2px; background-color: #e0e0e0; border-radius: 1px;"></div>
        <span style="font-size: 12px; color: #666;">03:45</span>
      </div>
    </div>

    <!-- 音量控制 -->
    <div style="display: flex; align-items: center; gap: 8px;">
      <n-button circle size="small" quaternary>
        <n-icon><volume /></n-icon>
      </n-button>
      <div style="width: 80px; height: 2px; background-color: #e0e0e0; border-radius: 1px;"></div>
    </div>
  </div>
</template>

<style scoped>

</style>