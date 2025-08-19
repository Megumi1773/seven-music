<script setup lang="ts">
import {getUserInfo, updateProfile} from '@/api/user'
import {onMounted, ref, reactive} from "vue";
import {useMessage} from 'naive-ui'
import {User, Mail, Phone, Edit, Camera} from '@vicons/tabler'
import SongListsView from "@/components/SongListsView.vue";

const message = useMessage()
let originalData = ref()
let isEditing = ref(false)
let loading = ref(false)
let avatarLoading = ref(false)

// 表单数据
const formData = reactive({
  email: '',
  nickname: '',
  phone: '',
  username: '',
  avatar: ''
})

// 表单验证规则
const rules = {
  nickname: {
    required: true,
    message: '请输入昵称',
    trigger: ['input', 'blur']
  },
  email: {
    required: true,
    trigger: ['input', 'blur'],
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: '请输入正确的邮箱格式'
  },
  phone: {
    required: true,
    trigger: ['input', 'blur'],
    pattern: /^1[3-9]\d{9}$/,
    message: '请输入正确的手机号格式'
  }
}

onMounted(async () => {
  await loadUserInfo()
})

const loadUserInfo = async () => {
  try {
    loading.value = true
    let res = await getUserInfo()
    originalData.value = res.data.data

    // 填充表单数据
    Object.assign(formData, {
      email: originalData.value.email || '',
      nickname: originalData.value.nickname || '',
      phone: originalData.value.phone || '',
      username: originalData.value.username || '',
      avatar: originalData.value.avatar || ''
    })
  } catch (error) {
    message.error('获取用户信息失败')
  } finally {
    loading.value = false
  }
}

const toggleEdit = () => {
  if (isEditing.value) {
    // 取消编辑，恢复原始数据
    Object.assign(formData, {
      email: originalData.value.email || '',
      nickname: originalData.value.nickname || '',
      phone: originalData.value.phone || '',
      username: originalData.value.username || '',
      avatar: originalData.value.avatar || ''
    })
  }
  isEditing.value = !isEditing.value
}

const handleSave = async () => {
  try {
    loading.value = true
    let res = await updateProfile({...formData})
    if (res.status === 200) {
      message.success('保存成功')
      await loadUserInfo()
      isEditing.value = false
    }
  } catch (error) {
    message.error('保存失败')
  } finally {
    loading.value = false
  }
}

const handleAvatarUpload = async (file: any) => {
  try {
    avatarLoading.value = true
    // 这里处理头像上传逻辑
    // const uploadResult = await uploadAvatar(file)

    // 模拟上传
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 模拟返回新头像URL
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.avatar = e.target.result
      message.success('头像上传成功')
    }
    reader.readAsDataURL(file)
  } catch (error) {
    message.error('头像上传失败')
  } finally {
    avatarLoading.value = false
  }
}

const beforeUpload = (file: any) => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    message.error('只能上传图片文件!')
    return false
  }
  if (!isLt2M) {
    message.error('图片大小不能超过 2MB!')
    return false
  }

  handleAvatarUpload(file)
  return false // 阻止自动上传
}
</script>

<template>
  <div class="mx-auto p-6 w-full">
    <n-spin :show="loading">
      <div class="space-y-6">
        <!-- 头像区域 -->
        <n-card style="background:#30593E;" class="text-white rounded-2xl overflow-hidden shadow-xl"
                :bordered="false">
          <div class="flex items-center gap-6 p-8 md:flex-row flex-col md:text-left text-center">
            <div class="relative">
              <n-avatar
                  :size="120"
                  :src="formData.avatar"
                  class="border-4 border-white/20 shadow-2xl"
              >
                <n-icon :size="40" :component="User" v-if="!formData.avatar"/>
              </n-avatar>

              <!-- 头像上传按钮 -->
              <n-upload
                  v-if="isEditing"
                  :show-file-list="false"
                  :before-upload="beforeUpload"
                  class="absolute -bottom-2 -right-2"
              >
                <n-button
                    circle
                    type="primary"
                    class="shadow-lg"
                    :loading="avatarLoading"
                >
                  <template #icon>
                    <n-icon :component="Camera"/>
                  </template>
                </n-button>
              </n-upload>
            </div>

            <div>
              <h3 class="text-2xl text-white/80 font-semibold mb-2">{{ formData.nickname || formData.username }}</h3>
              <p class="text-white/80 text-sm">ID: {{ formData.username }}</p>
            </div>
          </div>
        </n-card>

        <!-- 基本信息区域 -->
        <n-card class="rounded-2xl shadow-lg" title="基本信息" :bordered="false">
          <template #header-extra>
            <n-button
                v-if="!isEditing"
                type="primary"
                ghost
                @click="toggleEdit"
            >
              <template #icon>
                <n-icon :component="Edit"/>
              </template>
              编辑
            </n-button>

            <n-space v-else>
              <n-button @click="toggleEdit">
                取消
              </n-button>
              <n-button
                  type="primary"
                  @click="handleSave"
                  :loading="loading"
              >
                保存
              </n-button>
            </n-space>
          </template>

          <n-form
              :model="formData"
              :rules="rules"
              label-placement="left"
              label-width="100px"
              class="mt-6"
          >
            <n-form-item label="用户名" path="username">
              <n-input
                  v-model:value="formData.username"
                  placeholder="请输入用户名"
                  :disabled="true"
                  class="rounded-lg"
              >
                <template #prefix>
                  <n-icon :component="User"/>
                </template>
              </n-input>
            </n-form-item>

            <n-form-item label="昵称" path="nickname">
              <n-input
                  v-model:value="formData.nickname"
                  placeholder="请输入昵称"
                  :disabled="!isEditing"
                  class="rounded-lg"
              >
                <template #prefix>
                  <n-icon :component="User"/>
                </template>
              </n-input>
            </n-form-item>

            <n-form-item label="邮箱" path="email">
              <n-input
                  v-model:value="formData.email"
                  placeholder="请输入邮箱"
                  :disabled="!isEditing"
                  class="rounded-lg"
              >
                <template #prefix>
                  <n-icon :component="Mail"/>
                </template>
              </n-input>
            </n-form-item>

            <n-form-item label="手机号" path="phone">
              <n-input
                  v-model:value="formData.phone"
                  placeholder="请输入手机号"
                  :disabled="!isEditing"
                  class="rounded-lg"
              >
                <template #prefix>
                  <n-icon :component="Phone"/>
                </template>
              </n-input>
            </n-form-item>
          </n-form>
        </n-card>
      </div>
      <div>
        <SongListsView></SongListsView>
      </div>
    </n-spin>
  </div>
</template>

<style scoped>
/* 保留必要的动画效果 */
.space-y-6 > * {
  animation: fadeInUp 0.6s ease-out;
}

.space-y-6 > *:nth-child(2) {
  animation-delay: 0.1s;
}

.space-y-6 > *:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
