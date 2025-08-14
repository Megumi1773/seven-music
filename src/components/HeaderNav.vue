<script setup lang="ts">
import {useUserStore} from "@/stores/user";
import {Search, Settings} from "@vicons/tabler";
import {NButton, NIcon, NInput, useMessage} from "naive-ui";
import {ref} from "vue";
import {useRouter} from "vue-router";
import AuthModal from "@/components/AuthModal.vue";

const searchValue = ref('')
const message = useMessage()
const router = useRouter()
const userStore = useUserStore()


const dropDownList = [
  {
    label: '个人信息',
    key: '/profile',
  },
  {
    label: '退出登录',
    key: 'quit',
  }
]

const handleSelect = (key: string) => {
  console.log(key)
  switch (key) {
    case '/profile':
      router.push('/profile')
      message.info("跳转" + key)
      break
    case 'quit':
      message.success("退出登录")
      userStore.logout()
      break
  }
}
const openModal = ref(false)
const openLoginModal = () => {
  openModal.value = !openModal.value
}
</script>

<template>
  <n-flex align="center" justify="space-between" style="height: 100%;">
    <n-flex align="center">
      <!--      logo暂时留-->

      <!--      <img src="">-->
      <h2 style="margin: 0; color: #333;">CloudMusic</h2>
    </n-flex>
    <div style="flex: 1; max-width: 500px; margin: 0 24px;">
      <n-input
          v-model:value="searchValue"
          placeholder="搜索音乐、歌手、专辑..."
      >
        <template #prefix>
          <n-icon>
            <search/>
          </n-icon>
        </template>
      </n-input>
    </div>

    <n-flex style="display: flex; align-items: center; gap: 12px;">
      <n-dropdown trigger="click" :options="dropDownList" @select="handleSelect" v-if="userStore.isLogin">
        <n-button circle quaternary>
          <n-avatar
              :style="{
                  color: 'yellow',
                  backgroundColor: 'red'
           }"
          >
            M
          </n-avatar>
        </n-button>
      </n-dropdown>
      <n-button type="primary" circle quaternary v-else @click="openLoginModal">
        登录
      </n-button>
      <n-button circle size="large" quaternary>
        <n-icon>
          <settings/>
        </n-icon>
      </n-button>
    </n-flex>
  </n-flex>

  <!--  登录弹窗-->
  <n-modal v-model:show="openModal">
    <AuthModal @loginSuccess="openModal =!openModal"></AuthModal>
  </n-modal>
</template>

<style scoped>

</style>