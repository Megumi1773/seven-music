<script setup lang="ts">
import {getUserInfo} from '@/api/user'
import {onMounted, ref} from "vue";

let data = ref()
onMounted(async () => {
  let res = await getUserInfo()
  data.value = res.data.data
})
</script>


<template>
  <div>
  <pre class="text-3xl font-mono">
    {{ data }}
  </pre>
  </div>
</template>

<style scoped>

</style>