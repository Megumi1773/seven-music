<script setup>
import {useRoute} from "vue-router";
import {SearchAll} from "@/api/search.js";
import {watch} from "vue"

const route = useRoute()
const searchData = ref({})
const search = async () => {
  let res = await SearchAll(route.query.q)
  console.log(res.data)
  searchData.value = res.data
}
search()
watch(
    () => route.query.q,
    () => {
      search()
    })
</script>

<template>
  <pre>{{ route.query.q }}</pre>
  <hr/>
  <pre>{{ searchData }}</pre>
</template>

<style scoped>

</style>