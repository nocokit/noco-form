# noco-form 表单编辑器 📝

noco-form 是一个基于 `Vue3` 和 `TypeScript` 开发的**纯表单编辑器**产品，作为一个 🟢 **重前端**产品形态，表单编辑器和表单组件库所有代码完全开源。

## 🚀 快速开始

### 在线预览

[OnLine 在线预览](https://bojue.github.io/noco-form)

![image](https://github.com/user-attachments/assets/8afe0a8b-3147-4769-8aa0-4077723b093b)

### 本地运行

```bash
git clone git@github.com:bojue/noco-form.git
cd noco-form
yarn
npm run dev
```

访问: http://localhost:3001/

## ✨ 核心特性

- **🎯 纯表单编辑器**：专注于表单编辑功能,移除所有非编辑器模块
- **🎨 拖拽式设计**：直观的拖拽交互,降低使用门槛
- **📱 响应式预览**：支持移动端/桌面端实时预览
- **🧩 57种组件**：涵盖基础输入、个人信息、高级功能等7大分类
- **⚙️ 完整配置**：31个配置组件支持全方位表单设置
- **💾 完全开源**：表单编辑器核心代码100%开源

## 📦 项目结构

```
src/
├── views/
│   ├── FormEditor/           # 表单编辑器主模块 (7个文件)
│   │   ├── index.vue         # 编辑器主界面
│   │   ├── comp-data.ts      # 组件数据定义 (57种组件类型)
│   │   ├── comp-config-data.ts  # 组件配置逻辑
│   │   ├── comp-icon.ts      # 组件图标映射
│   │   ├── comp-address-data.ts # 地址级联数据 (435KB)
│   │   ├── form-setting.vue  # 右侧配置面板
│   │   └── form-sidebar.vue  # 左侧题库面板
│   └── Preview/              # 预览组件
│       └── index.vue         # 移动端/桌面端预览
│
├── components-form/          # 表单渲染组件库 (32个组件)
│   ├── index.vue             # 组件统一渲染器
│   ├── base/                 # 19个基础组件
│   │   ├── Input.vue         # 单行输入
│   │   ├── Radio.vue         # 单选
│   │   ├── Checkout.vue      # 多选
│   │   ├── Date.vue          # 日期
│   │   ├── Upload.vue        # 上传
│   │   └── ...
│   ├── contact-information/  # 8个个人信息组件
│   │   ├── Name.vue          # 姓名
│   │   ├── Phone.vue         # 手机
│   │   ├── Address.vue       # 地址
│   │   └── ...
│   ├── advanced/             # 高级组件
│   │   └── Sign.vue          # 电子签名
│   └── show/                 # 显示组件
│       ├── FormTitle.vue     # 表单标题
│       └── ...
│
├── components-form-setting/  # 配置面板组件 (31个组件)
│   ├── base/                 # 15个基础设置
│   │   ├── Title.vue         # 标题设置
│   │   ├── Description.vue   # 描述设置
│   │   ├── Placeholder.vue   # 占位符
│   │   └── ...
│   ├── form-validation/      # 5个表单验证
│   │   ├── Required.vue      # 必填设置
│   │   ├── ValidationFormat.vue  # 系统验证
│   │   └── ...
│   ├── data/                 # 3个数据设置
│   │   ├── DataList.vue      # 选项数据
│   │   └── ...
│   ├── common-global-configurations/  # 5个全局配置
│   │   ├── DisplayBtn.vue    # 显示按钮
│   │   ├── DisplaySerialNumber.vue  # 显示序号
│   │   └── ...
│   └── show/                 # 显示设置
│       └── FormTitle.vue     # 标题配置
│
├── components/               # 辅助组件
│   ├── Support.vue           # 支持信息
│   └── form/
│       └── BatchOperationData.vue  # 批量操作
│
├── stores/
│   └── selectCompStore.ts    # 组件选择状态管理
│
├── router/
│   └── index.ts              # 路由配置
│
└── utils/                    # 工具函数
    ├── http.ts               # HTTP请求
    └── ...
```

## 🎯 组件分类

### 基础组件 (19个)
单行输入、多行输入、数字、开关、单选、多选、下拉、日期、时间、上传、网址、分割线、分页、评分等

### 个人信息组件 (8个)
姓名、性别、手机、固话、身份证、邮箱、微信、地址

### 高级组件
电子签名、NPS满意度调查

### 显示组件
表单标题、图片、视频

## 🔧 核心功能

### 表单编辑器
- ✅ 拖拽式组件添加
- ✅ 组件复制/删除/排序
- ✅ 实时预览 (PC/移动端)
- ✅ 序号自动编排
- ✅ 批量操作选项

### 表单配置
- ✅ 基础属性设置 (标题、描述、占位符)
- ✅ 布局类型 (横向/纵向)
- ✅ 表单验证 (必填、格式、自定义)
- ✅ 全局配置 (序号、描述、按钮、水印)

### 组件能力
- ✅ 57种组件类型
- ✅ 7大分类体系
- ✅ 完整配置支持
- ✅ 地址级联数据

## 🛠️ 技术栈

- **框架**: Vue 3.5 + TypeScript
- **UI组件**: Ant Design Vue 4.2
- **状态管理**: Pinia 3.0
- **路由**: Vue Router 4.4
- **拖拽**: vue-draggable-plus 0.5
- **构建工具**: Vite 5.4

## 📊 项目统计

| 模块 | 文件数 | 说明 |
|------|--------|------|
| FormEditor 主模块 | 7 | 包含435KB地址数据 |
| 表单组件库 | 32 | 可复用渲染组件 |
| 配置组件 | 31 | 右侧设置面板 |
| 状态管理 | 1 | Pinia store |
| 辅助组件 | 2 | 批量操作等 |
| **总计** | **83** | 纯表单编辑功能 |

## 🗺️ 路由配置

```typescript
routes: [
  {
    path: '/',
    component: FormEditor      // 根路径即表单编辑器
  },
  {
    path: '/:id',
    component: FormEditor      // 带ID的表单编辑器
  }
]
```

## 📝 开发说明

### 添加新组件

1. 在 `components-form/base/` 创建组件文件
2. 在 `comp-data.ts` 注册组件类型
3. 在 `comp-config-data.ts` 配置默认属性
4. 在 `components-form/index.vue` 导入组件

### 添加配置项

1. 在 `components-form-setting/base/` 创建配置组件
2. 在 `form-setting.vue` 中引入并使用

## 🛡️ 许可证

noco-form 基于 MIT 许可证发布。详细信息请参阅 [LICENSE](https://github.com/bojue/noco-form/blob/main/LICENSE) 文件。

## 🙏 致谢

感谢所有为 noco-form 做出贡献的开发者!

---

**📝 noco-form - 让表单编辑更简单**
