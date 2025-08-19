<script lang="ts" setup>
import {ref} from "vue"
import {Login} from '@/api/user'
import {useUserStore} from '@/stores/user'
import {useMessage} from 'naive-ui'

let msg = useMessage()
const userStore = useUserStore()
const loginForm = ref({
  username: "",
  password: "",
})
const registerForm = ref({
  username: "",
  password: "",
  repassword: "",
})
const rules = ref({})
const emit = defineEmits(["loginSuccess"])

const loading = ref(false)
const handleLogin = async () => {
  try {
    loading.value = true
    let res = await Login({
      username: loginForm.value.username,
      password: loginForm.value.password,
    })
    if (res.data.code === 200) {
      userStore.setUserInfo(res.data.data.user)
      userStore.setToken(res.data.data.token)
      msg.success(res.data.message)
      emit('loginSuccess')
      window.location.reload()
    }
  } finally {
    loading.value = false
  }
}

</script>
<template>
  <n-card :style="{width: '40%',maxWidth: '480px'}">
    <n-tabs
        class="card-tabs"
        default-value="signing"
        size="large"
        animated
        pane-wrapper-style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
    >
      <n-tab-pane name="signing" tab="登录">
        <n-form :model="loginForm" novalidate>
          <n-form-item-row label="用户名">
            <n-input name="username" placeholder="请输入用户名" v-model:value="loginForm.username"
                     :input-props="{ autocomplete: 'username' }"/>
          </n-form-item-row>
          <n-form-item-row label="密码">
            <n-input name="password" placeholder="请输入密码" type="password" v-model:value="loginForm.password"
                     :input-props="{ autocomplete: 'current-password' }"/>
          </n-form-item-row>
        </n-form>
        <pre>
          {
          "username":{{ loginForm.username }},
          "password":{{ loginForm.password }}
          }
        </pre>
        <n-button type="primary" block secondary strong @click="handleLogin" :loading="loading">
          登录
        </n-button>
      </n-tab-pane>
      <n-tab-pane name="signup" tab="注册">
        <n-form :model="registerForm" novalidate>
          <n-form-item-row label="用户名">
            <n-input name="regUsername" placeholder="请输入用户名" v-model:value="registerForm.username"
                     :input-props="{ autocomplete: 'username' }"/>
          </n-form-item-row>
          <n-form-item-row label="密码">
            <n-input name="regPassword" placeholder="请输入密码" type="password" v-model:value="registerForm.password"
                     :input-props="{ autocomplete: 'new-password' }"/>
          </n-form-item-row>
          <n-form-item-row label="重复密码">
            <n-input name="regRePassword" placeholder="请输入密码" type="password"
                     v-model:value="registerForm.repassword" :input-props="{ autocomplete: 'new-password' }"/>
          </n-form-item-row>
        </n-form>
        <pre>
          {
          "username":{{ registerForm.username }},
          "password":{{ registerForm.password }},
          "repassword":{{ registerForm.repassword }}
          }
        </pre>
        <n-button type="primary" block secondary strong>
          注册
        </n-button>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

