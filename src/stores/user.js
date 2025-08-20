import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {Logout} from "@/api/user.js";
import {useRouter} from "vue-router";
import {useStorage} from "@vueuse/core";

export const useUserStore = defineStore('User', () => {
        const userInfo = ref({
            ID: '',
            username: '',
            nickname: '',
            phone: '',
            email: '',
            avatar: ''
        })
        const nowToken = useStorage("token", '')
        const router = useRouter()
        const token = ref('')
        const isLogin = computed(() => token.value !== '')
        watch(token, () => {
            nowToken.value = token.value
        })

        function getUserInfo() {
            return userInfo.value
        }

        function setUserInfo(data) {
            userInfo.value = data
        }

        function setToken(data) {
            token.value = data
        }

        function getToken() {
            return token.value
        }

        function getIsLogin() {
            if (isLogin.value) {
                return isLogin.value
            } else {
                return false
            }
        }

        const logout = async () => {
            await Logout()
            await setUserInfo({})
            await setToken('')
            await localStorage.removeItem('token')
            await localStorage.removeItem('User')
            await router.push('/')
        }

        return {
            userInfo,
            token,
            isLogin,
            getUserInfo,
            setUserInfo,
            getToken,
            setToken,
            getIsLogin,
            logout,
        }
    },
    {
        persist: true,
    })
