<script setup lang="ts">

</script>

<template>
  <n-flex class="h-full" justify="center" align="center">
    <n-result status="info" title="野生的库" description="生活总归带点荒谬(其实没想好怎么做)">
      <template #footer>
        <n-button @click="$router.push('/')">找点乐子吧</n-button>
      </template>
    </n-result>
  </n-flex>
</template>

<style scoped>

</style>