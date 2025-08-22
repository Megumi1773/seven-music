<script lang="ts" setup>
import {computed, ref, useTemplateRef} from "vue"
import {Login} from '@/api/user'
import {useUserStore} from '@/stores/user'
import {FormRules, useMessage} from 'naive-ui'
import {useCountdown} from "@vueuse/core"
import {getMailCode, register} from '@/api/user'
import type {FormInst} from 'naive-ui'

let msg = useMessage()
const userStore = useUserStore()
const loginForm = ref({
  email: "",
  password: "",
})

const emit = defineEmits(["loginSuccess"])
const loginFormRef = useTemplateRef<FormInst>('loginFormRef')
const loading = ref(false)
const handleLogin = async () => {
  loginFormRef.value?.validate(async (err) => {
    if (err) {
      msg.warning("请正确填写信息")
      return
    }

    try {
      loading.value = true
      let res = await Login({
        email: loginForm.value.email,
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
  })
}
// 注册
const registerForm = ref({
  email: "",
  password: "",
  repassword: "",
  code: "",
})
const tabsValue = ref("signing")
const {start, remaining, stop} = useCountdown(0)
const btnText = computed(() => remaining.value > 0 ? `${remaining.value}s` : '获取验证码')
const btnFlag = computed(() => remaining.value > 0)
const regForm = useTemplateRef<FormInst>('regForm')


const sendMailCode = async () => {
  regForm.value?.validate(async (err) => {
    if (err) {
      msg.warning("请正确填写信息")
      return
    }
    if (remaining.value !== 0) return
    start(60)
    try {
      let res = await getMailCode({email: registerForm.value.email})
      if (res.data.code === 200) {
        msg.success(res.data.message)
      } else {
        stop()
      }
    } catch (e: any) {
      stop()
    }
  }, (rule) => rule?.key == 'email')


}
const handleRegister = async () => {
  regForm.value?.validate(async (err) => {
    if (err) {
      msg.warning("请正确填写信息")
      return
    }

    let res = await register({
      email: registerForm.value.email,
      password: registerForm.value.password,
      code: registerForm.value.code
    })
    if (res.data.code === 200) {
      msg.success(res.data.message)
      registerForm.value = {
        email: "",
        password: "",
        repassword: "",
        code: "",
      }
      tabsValue.value = "signing"
    }
  })
}

const rules: FormRules = {
  email: [
    {
      required: true,
      message: '请填写邮箱地址',
      trigger: ['input', 'blur'],
    },
    {
      pattern: `^[a-zA-Z0-9._%+-]+@(163\\.com|qq\\.com|foxmail\\.com)$`,
      message: '请输入正确的邮箱地址',
      trigger: ['input', 'blur'],
    }
  ],
  password: [
    {
      required: true,
      message: "密码必须填入",
      trigger: ['input', 'blur'],
    },
    {
      max: 16,
      message: "最长16位",
      trigger: ['input', 'blur'],
    }
  ]
}
const regrules: FormRules = {
  email: [
    {
      key: 'email',
      required: true,
      message: '请填写邮箱地址',
      trigger: ['input', 'blur'],
    },
    {
      key: 'email',
      pattern: `^[a-zA-Z0-9._%+-]+@(163\.com|qq\.com|foxmail\.com|126\.com|gmail\.com|hotmail\.com)$`,
      message: '请输入正确的邮箱地址',
      trigger: ['input', 'blur'],
    }
  ],
  password: [
    {
      required: true,
      message: "密码必须填入",
      trigger: ['input', 'blur'],
    },
    {
      max: 16,
      message: "最长16位",
      trigger: ['input', 'blur'],
    }
  ],
  repassword: [
    {
      required: true,
      message: "密码必须填入",
      trigger: ['input', 'blur'],
    },
    {
      max: 16,
      message: "最长16位",
      trigger: ['input', 'blur'],
    }
  ],
  code: [
    {required: true, message: '必填', trigger: ['blur', 'input']},
    {pattern: /^.{6}$/, message: '必须 6 位字符', trigger: ['blur', 'input']}
  ]
}
</script>
<template>
  <n-card :style="{width: '60%',maxWidth: '440px',padding:'1.25rem'}">
    <n-tabs
        class="card-tabs"
        size="large"
        animated
        justify-content="space-evenly"
        pane-wrapper-style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
        v-model:value="tabsValue"
    >
      <n-tab-pane name="signing" tab="登录">
        <n-form :model="loginForm" ref="loginFormRef" :rules="rules" @submit.prevent="handleLogin">
          <n-form-item-row label="邮箱地址" path="email">
            <n-input name="username" placeholder="请输入邮箱地址" v-model:value="loginForm.email"
                     :input-props="{ autocomplete: 'username' }"/>
          </n-form-item-row>
          <n-form-item-row label="密码" path="password">
            <n-input name="password" placeholder="请输入密码" type="password" v-model:value="loginForm.password"
                     :input-props="{ autocomplete: 'current-password' }"/>
          </n-form-item-row>
          <n-button type="primary" block secondary strong :loading="loading" attr-type="submit">
            登录
          </n-button>
        </n-form>
        <!--        <pre>-->
        <!--          {-->
        <!--          "username":{{ loginForm.email }},-->
        <!--          "password":{{ loginForm.password }}-->
        <!--          }-->
        <!--        </pre>-->

      </n-tab-pane>
      <n-tab-pane name="signup" tab="注册">
        <n-form :model="registerForm" ref="regForm" :rules="regrules"
                @submit.prevent="handleRegister">
          <n-form-item-row label="邮箱地址" path="email">
            <n-input name="regUsername" placeholder="请输入邮箱地址" v-model:value="registerForm.email"
                     :input-props="{ autocomplete: 'username' }"/>
          </n-form-item-row>
          <n-form-item-row label="验证码" path="code">
            <n-input name="code" placeholder="验证码"
                     v-model:value="registerForm.code" :input-props="{ autocomplete: 'mail-code' }"/>
            <n-button type="primary" @click="sendMailCode" :disabled="btnFlag">{{ btnText }}</n-button>
          </n-form-item-row>
          <n-form-item-row label="密码" path="password">
            <n-input name="regPassword" placeholder="请输入密码" type="password" v-model:value="registerForm.password"
                     :input-props="{ autocomplete: 'new-password' }"/>
          </n-form-item-row>
          <n-form-item-row label="重复密码" path="repassword">
            <n-input name="regRePassword" placeholder="请输入密码" type="password"
                     v-model:value="registerForm.repassword" :input-props="{ autocomplete: 'new-password' }"/>
          </n-form-item-row>
          <n-button type="primary" block secondary strong attr-type="submit">
            注册
          </n-button>
        </n-form>
        <!--        <pre>-->
        <!--          {-->
        <!--          "username":{{ registerForm.username }},-->
        <!--          "password":{{ registerForm.password }},-->
        <!--          "repassword":{{ registerForm.repassword }}-->
        <!--          }-->
        <!--        </pre>-->

      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

