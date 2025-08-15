<script setup lang="ts">
import {useMessage} from 'naive-ui'

let msg = useMessage()
const handleAlert = () => {
  msg.success("(＾－＾)V~~~")
}
</script>

<template>
  <n-flex class="h-full" justify="center" align="center">
    <n-result status="418" title="喝杯咖啡歇息一下吧" description="一切尽在不言中">
      <template #footer>
        <n-button @click="handleAlert">接受真相就是这么简单</n-button>
      </template>
    </n-result>
  </n-flex>

</template>

<style scoped>

</style>