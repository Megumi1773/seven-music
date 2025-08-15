import axios from "axios"


const api = axios.create(
    {
        baseURL: "/api",
        timeout: 1000,
        headers: {
            "Content-Type": "application/json",
        },
    }
)
// 添加请求拦截器
api.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let user = JSON.parse(localStorage.getItem("User"))
    if (user) {
        let token = user.token
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})

// 添加响应拦截器
api.interceptors.response.use(function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response;
    }, function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        let errorMessage = '未知错误，请稍后再试！';
        // 1. 请求已发出，但服务器响应状态码不在 2xx 范围内
        if (error.response) {
            const {status, data} = error.response;

            switch (status) {
                case 400:
                    errorMessage = data.message || '请求参数错误！';
                    break;
                case 401:
                    errorMessage = data.message || '登录状态已过期，请重新登录！';
                    // 可以在这里清空 token 并跳转到登录页
                    // localStorage.removeItem('token');
                    // router.push('/login'); // 如果你需要路由跳转，需要在这里导入 router
                    break;
                case 403:
                    errorMessage = data.message || '您没有权限访问此资源！';
                    break;
                case 404:
                    errorMessage = data.message || '请求的资源不存在！';
                    break;
                case 405:
                    errorMessage = data.message || '请求方法不允许！';
                    break;
                case 408:
                    errorMessage = data.message || '请求超时！';
                    break;
                case 500:
                    errorMessage = data.message || '服务器内部错误！';
                    break;
                case 502:
                    errorMessage = data.message || '网关错误！';
                    break;
                case 503:
                    errorMessage = data.message || '服务不可用！';
                    break;
                case 504:
                    errorMessage = data.message || '网关超时！';
                    break;
                default:
                    errorMessage = data.message || `HTTP 错误：${status}`;
            }
        }
        // 2. 请求发送了，但没有收到响应 (例如网络中断或服务器宕机)
        else if (error.request) {
            errorMessage = '网络连接异常，请检查您的网络！';
        }
        // 3. 在设置请求时发生了一些事情，触发了一个错误
        else {
            errorMessage = error.message || '请求设置错误，请联系管理员！';
        }

        // 打印详细错误信息到控制台，便于调试
        console.error('API Request Error:', error.response);

        // 如果需要显示错误消息给用户，则使用 Navi-ui 的 Message 组件
        window.$message.error(errorMessage)

        // 重要的是：返回 Promise.reject(error)，这样调用者（例如你的组件）
        // 才能通过 .catch() 捕获到这个错误，并进行后续处理（如果需要）
        return Promise.reject(error);
    }
);


export default api