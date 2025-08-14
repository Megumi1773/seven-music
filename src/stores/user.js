import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {Logout} from "@/api/user.js";

export const useUserStore = defineStore('User', () => {
        const userInfo = ref({})
        const token = ref('')
        const isLogin = computed(() => token.value !== '')

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
            setUserInfo({})
            setToken('')
            localStorage.removeItem('User')
            window.location.reload()
            await Logout()
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
