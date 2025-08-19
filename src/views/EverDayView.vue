<script setup lang="ts">
import SongsTable from "@/components/SongsTable.vue"
import {getEveryDaySongs} from '@/api/everyday'
import dayjs from 'dayjs'
import {computed, ref} from 'vue'
import 'dayjs/locale/zh-cn'
import {getYiYan} from '@/api/everyday'
import {PlayerPlay} from "@vicons/tabler"
import {usePlayerStore} from '@/stores/player'

dayjs.locale('zh-cn')

const loading = ref(false)
const data = ref([])
const getDay = async () => {
  loading.value = true
  let res = await getEveryDaySongs()
  data.value = res.data.data
  loading.value = false
}
getDay()

const realDate = dayjs().format('M月D日dd')
const month = dayjs().get('month') + 1
const day = dayjs().get('date')
const week = dayjs().format('dddd')


// 每日一言
let yan = ref({
  hitokoto: '',
  from_who: '',
  from: '',
})
const oneYan = async () => {
  const {data: {hitokoto, from_who, from}} = await getYiYan()
  yan.value.hitokoto = hitokoto
  yan.value.from_who = from_who
  yan.value.from = from
}
oneYan()
const aSentence = computed(() => `${yan.value.hitokoto}——${yan.value.from}By${yan.value.from_who}`)
const playerStore = usePlayerStore()
const playAll = () => {
  playerStore.play(data.value[0])
  playerStore.addPlaylist(data.value)
}
</script>

<template>
  <n-card>
    <n-statistic label="每日推荐/今天是" tabular-nums>
      <n-number-animation :from="0" :to="month"/>
      <span class="text-2xl font-medium text-slate-400">月</span>
      <n-number-animation :from="0" :to="day"/>
      <span class="text-2xl font-medium text-slate-400">日</span>
      <span class="ml-3 text-4xl font-bold text-amber-500">{{ week }}</span>
    </n-statistic>
    <n-marquee class="text-2xl font-medium text-slate-400">
      <template #default>
        {{ aSentence }}
      </template>
    </n-marquee>
    <n-button-group>
      <n-button type="success" @click="playAll">
        <template #icon>
          <n-icon>
            <PlayerPlay/>
          </n-icon>
        </template>
        播放全部
      </n-button>
      <n-button>1</n-button>
      <n-button>1</n-button>
      <n-button>1</n-button>
    </n-button-group>
    <!--    <n-marquee class="text-2xl font-bold text-slate-400">-->
    <!--      {{ aSentence }}-->
    <!--    </n-marquee>-->
    <SongsTable v-model:data="data" v-model:loading="loading"/>
  </n-card>
</template>

<style scoped>
:deep(.n-statistic__label) {
  font-size: 2rem
}

:deep(.n-statistic-value) {
  font-size: 1.5rem;
}

:deep(.n-statistic .n-statistic-value .n-statistic-value__content) {
  font-size: 3rem;
}

:deep(.n-statistic .n-statistic-value .n-statistic-value__suffix) {
  color: #4a5565;
}
</style>