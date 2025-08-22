# Seven Music

一个基于Vue 3的现代化音乐播放器应用，提供丰富的音乐体验和美观的用户界面。

## 功能特性

### 核心功能
- 🎵 音乐播放与暂停控制
- 📋 歌单创建与管理
- 🔍 音乐搜索功能
- ❤️ 喜欢音乐收藏
- 📅 每日推荐音乐
- 🎼 专辑与艺术家详情查看
- 📱 响应式设计，适配不同设备

### 界面组件
- 顶部导航栏：提供搜索、用户信息展示
- 侧边栏菜单：快速访问各功能模块
- 音乐播放器：底部固定的播放控制条
- 歌曲列表：支持排序、筛选和播放操作
- 专辑展示：网格布局展示专辑封面

## 技术栈

### 前端框架
- Vue 3
- Vue Router
- Pinia (状态管理)
- Pinia Plugin Persistedstate (状态持久化)

### UI组件库
- Naive UI
- VIcons (图标库)

### 样式与工具
- Tailwind CSS
- VueUse (工具函数库)
- Axios (HTTP请求)
- Day.js (日期处理)

### 构建工具
- Vite
- pnpm

## 项目结构

```
seven-music/
├── index.html
├── package.json
├── pnpm-lock.yaml
├── public/
├── src/
│   ├── App.vue
│   ├── Layouts/
│   │   └── MainLayout.vue
│   ├── api/
│   │   ├── albums.js
│   │   ├── artist.js
│   │   ├── everyday.js
│   │   ├── songlist.js
│   │   └── user.js
│   ├── assets/
│   ├── components/
│   │   ├── AlbumsList.vue
│   │   ├── AuthModal.vue
│   │   ├── HeaderNav.vue
│   │   ├── MusicPlayer.vue
│   │   ├── SongListsView.vue
│   │   └── SongsTable.vue
│   ├── main.js
│   ├── router/
│   │   └── index.js
│   ├── service/
│   │   └── request.js
│   ├── stores/
│   │   ├── player.js
│   │   ├── songlist.js
│   │   └── user.js
│   └── views/
│       ├── AlbumDetailView.vue
│       ├── ArtistProfile.vue
│       ├── EverDayView.vue
│       ├── HomeView.vue
│       ├── LikeSongView.vue
│       ├── MusicLibView.vue
│       ├── PlaylistDetailView.vue
│       ├── SearchView.vue
│       ├── SettingView.vue
│       └── UserProfileView.vue
├── tsconfig.json
└── vite.config.js
```

## 安装与运行

### 环境要求
- Node.js >= 20.19.0 或 >= 22.12.0
- pnpm

### 安装依赖
```bash
pnpm install
```

### 运行开发服务器
```bash
pnpm dev
```

### 构建生产版本
```bash
pnpm build
```

### 预览生产构建
```bash
pnpm preview
```

## 实现细节

### 音乐播放功能
音乐播放功能通过`MusicPlayer.vue`组件实现，使用HTML5 Audio API控制音频播放。播放状态通过Pinia的`player` store进行管理，支持播放、暂停、上一首、下一首等操作。

### 歌单管理
歌单数据通过API接口获取，使用`songlist` store管理歌单状态。用户可以查看、创建、编辑和删除歌单，歌单数据会持久化到本地存储。

### 用户认证
应用实现了简单的登录验证机制，通过localStorage存储token。路由守卫确保未登录用户只能访问首页，其他页面需要登录后才能访问。

### API请求封装
所有API请求通过`service/request.js`进行封装，使用Axios拦截器处理请求和响应，统一管理API基础URL、请求头和错误处理。

## 贡献指南
欢迎对项目进行贡献！请遵循以下步骤：
1. Fork项目
2. 创建特性分支
3. 提交修改
4. 发起Pull Request

## 许可证
本项目使用MIT许可证。详情请见LICENSE文件。