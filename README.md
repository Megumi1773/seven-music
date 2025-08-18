# NaviUI Music 🎵

一个基于 Vue 3 + Naive UI 构建的现代化音乐播放器应用，提供完整的音乐播放、搜索、歌单管理等功能。

## ✨ 特性

- 🎵 **音乐播放** - 支持在线音乐播放，音量控制，播放进度控制
- 🔍 **音乐搜索** - 快速搜索歌曲、艺术家、专辑
- 📝 **歌单管理** - 创建、编辑、删除个人歌单
- ❤️ **收藏功能** - 收藏喜欢的歌曲
- 👤 **用户系统** - 用户注册、登录、个人资料管理
- 🎨 **现代化UI** - 基于 Naive UI 的精美界面设计
- 📱 **响应式设计** - 适配不同屏幕尺寸
- 💾 **状态持久化** - 用户数据和播放状态本地存储

## 🛠️ 技术栈

### 前端框架
- **Vue 3** - 渐进式 JavaScript 框架
- **Vue Router 4** - 官方路由管理器
- **Pinia** - 状态管理库

### UI 组件库
- **Naive UI** - Vue 3 组件库
- **Tailwind CSS** - 原子化 CSS 框架
- **@vicons** - 图标库

### 开发工具
- **Vite** - 现代化构建工具
- **TypeScript** - 类型安全的 JavaScript
- **Axios** - HTTP 客户端
- **VueUse** - Vue 组合式 API 工具集

## 📦 安装

### 环境要求
- Node.js >= 20.19.0 或 >= 22.12.0
- pnpm (推荐) 或 npm

### 克隆项目
```bash
git clone <repository-url>
cd naviui-music
```

### 安装依赖
```bash
pnpm install
# 或
npm install
```

## 🚀 开发

### 启动开发服务器
```bash
pnpm dev
# 或
npm run dev
```

### 构建生产版本
```bash
pnpm build
# 或
npm run build
```

### 预览生产构建
```bash
pnpm preview
# 或
npm run preview
```

## 📁 项目结构

```
naviui-music/
├── public/                 # 静态资源
│   └── favicon.ico
├── src/
│   ├── api/               # API 接口
│   │   ├── songlist.js    # 歌单相关接口
│   │   └── user.js        # 用户相关接口
│   ├── assets/            # 资源文件
│   │   ├── style.css      # 全局样式
│   │   └── public/        # 公共资源
│   ├── components/        # 公共组件
│   │   ├── AuthModal.vue  # 认证模态框
│   │   ├── HeaderNav.vue  # 头部导航
│   │   └── MusicPlayer.vue # 音乐播放器
│   ├── Layouts/           # 布局组件
│   │   └── MainLayout.vue # 主布局
│   ├── router/            # 路由配置
│   │   └── index.js
│   ├── service/           # 服务层
│   │   └── request.js     # HTTP 请求配置
│   ├── stores/            # 状态管理
│   │   ├── player.js      # 播放器状态
│   │   └── user.js        # 用户状态
│   ├── views/             # 页面组件
│   │   ├── HomeView.vue           # 首页/发现音乐
│   │   ├── SearchView.vue         # 搜索页面
│   │   ├── ProfileView.vue        # 个人资料
│   │   ├── SongListsView.vue      # 我的歌单
│   │   ├── MusicLibView.vue       # 音乐库
│   │   ├── LikeSongView.vue       # 喜欢的音乐
│   │   ├── PlaylistDetailView.vue # 歌单详情
│   │   └── SettingView.vue        # 设置页面
│   ├── App.vue            # 根组件
│   └── main.js            # 应用入口
├── index.html             # HTML 模板
├── package.json           # 项目配置
├── vite.config.js         # Vite 配置
└── README.md              # 项目说明
```

## 🎯 主要功能

### 音乐播放器
- 播放/暂停控制
- 音量调节和静音
- 播放进度控制
- 上一首/下一首切换
- 播放列表管理

### 页面路由
- `/` - 重定向到发现页面
- `/discover` - 发现音乐首页
- `/search` - 音乐搜索
- `/profile` - 个人资料
- `/mysonglists` - 我的歌单
- `/musiclibary` - 音乐库
- `/like` - 喜欢的音乐
- `/playlist/:id` - 歌单详情
- `/settings` - 设置页面

### 状态管理
- **用户状态** - 登录状态、用户信息、Token 管理
- **播放器状态** - 当前播放歌曲、播放列表、播放控制

### API 集成
- 用户认证（登录/注册/登出）
- 歌曲搜索和获取
- 歌单管理
- 音乐 URL 获取

## 🔧 配置说明

### Vite 配置
项目使用 Vite 作为构建工具，支持：
- Vue 3 单文件组件
- TypeScript 支持
- 自动导入配置
- 开发工具集成

### 样式配置
- Tailwind CSS 4.x 原子化样式
- Naive UI 组件主题
- 响应式设计支持

### 状态持久化
使用 `pinia-plugin-persistedstate` 插件实现：
- 用户登录状态持久化
- 播放器状态持久化
- 本地存储管理

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进项目！

## 📄 许可证

本项目采用 MIT 许可证。

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Naive UI](https://www.naiveui.com/) - Vue 3 组件库
- [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具