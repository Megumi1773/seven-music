<script setup>
import MainLayout from './Layouts/MainLayout.vue';
</script>

<template>
    <n-config-provider>
      <n-message-provider>
        <MainLayout>
          <router-view></router-view>
        </MainLayout>
      </n-message-provider>
    </n-config-provider>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
