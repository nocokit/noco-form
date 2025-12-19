# 样式优化文档 - 右侧配置面板

## 已完成的优化

### 1. 统一设计变量 (Design Tokens)

所有样式现在使用统一的 CSS 变量系统：

#### 颜色系统
```css
--bg-deep: #09090B           /* 深黑背景 */
--bg-panel: #18181B          /* 面板背景 */
--bg-card: #121214           /* 卡片背景 */
--bg-glass: rgba(24, 24, 27, 0.6)  /* 毛玻璃效果 */
--bg-hover: rgba(255, 255, 255, 0.03)  /* 悬停背景 */
```

#### 边框系统
```css
--border-subtle: rgba(255, 255, 255, 0.08)
--border-medium: rgba(255, 255, 255, 0.15)
--border-strong: rgba(255, 255, 255, 0.2)
```

#### 主题色
```css
--primary: #6366F1           /* Electric Indigo */
--primary-hover: #8B5CF6     /* Violet */
--primary-light: rgba(99, 102, 241, 0.1)
--primary-glow: rgba(99, 102, 241, 0.4)
```

#### 文字颜色
```css
--text-primary: #FAFAFA      /* 主要文字 */
--text-secondary: #A1A1AA    /* 次要文字 */
--text-tertiary: #71717A     /* 辅助文字 */
--text-dim: #52525B          /* 极淡文字 */
```

### 2. 右侧配置面板优化

#### form-setting.vue
- ✅ 添加自定义滚动条样式（细窄透明）
- ✅ 优化分类标题：11px、大写、紫色标记条
- ✅ 统一间距使用 `--spacing-*` 变量
- ✅ 组件图标改用 Remix Icon，主题色高亮

#### Ant Design 组件深色主题覆盖
在 `main.css` 和 `form-setting.vue` 中添加了全局样式：

```css
/* 输入框 */
.ant-input {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
}

/* Focus 状态 */
.ant-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
}

/* 开关 */
.ant-switch-checked {
  background: var(--primary);
}

/* 下拉菜单 */
.ant-select-dropdown {
  background: var(--bg-panel);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-lg);
}

/* 选中项 */
.ant-select-item-option-selected {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary);
}
```

### 3. 配置组件通用样式

创建了 `setting-common.css` 提供统一的组件样式：

#### 基础结构
```css
.setting-item          /* 配置项容器 */
.setting-label         /* 配置项标签 */
.setting-description   /* 配置项说明 */
```

#### 字段组
```css
.field-group          /* 字段组容器 */
.field-row            /* 字段行 */
.field-label          /* 字段标签 */
```

#### 开关字段
```css
.toggle-field              /* 开关容器 */
.toggle-field-label        /* 开关标签 */
.toggle-field-description  /* 开关说明 */
```

#### 工具类
```css
.setting-divider      /* 分割线 */
.info-box            /* 提示框 */
.warning-box         /* 警告框 */
.code-display        /* 代码显示 */
.setting-badge       /* 徽章 */
.icon-btn            /* 图标按钮 */
```

### 4. 已优化的配置组件

#### Title.vue (标题)
- ✅ 使用 `.setting-item` 和 `.setting-label`
- ✅ 移除内联样式
- ✅ 导入通用样式

#### Required.vue (必填)
- ✅ 使用 `.toggle-field` 布局
- ✅ 添加说明文字
- ✅ 移除绝对定位布局

#### Placeholder.vue (占位符)
- ✅ 使用 `.setting-item` 结构
- ✅ 统一标签样式
- ✅ 简化代码

## 视觉改进

### 滚动条
- 宽度：6px
- 颜色：与边框系统统一
- 悬停效果：变亮

### 分类标题
- 字号：11px
- 样式：大写、字母间距 1px
- 标记：3px 宽紫色竖条

### 输入组件
- 背景：半透明深色
- 边框：subtile → medium → primary (静态→悬停→聚焦)
- 圆角：var(--radius-md) = 6px
- 过渡动画：200ms cubic-bezier

### 开关组件
- 未选中：深灰背景
- 选中：紫色渐变
- 按钮：灰→白（状态变化）

## 字体系统

- 主字体：Inter（UI）
- 代码字体：JetBrains Mono（代码/正则表达式）
- 抗锯齿：-webkit-font-smoothing: antialiased

## 使用示例

### 创建新的配置组件

```vue
<template>
  <div class="setting-item">
    <label class="setting-label">配置项名称</label>
    <a-input placeholder="请输入..." />
    <div class="setting-description">这是配置说明</div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/components-form-setting/setting-common.css';
</style>
```

### 开关类配置

```vue
<template>
  <div class="toggle-field">
    <div>
      <div class="toggle-field-label">功能名称</div>
      <div class="toggle-field-description">功能说明</div>
    </div>
    <a-switch v-model:checked="value" />
  </div>
</template>
```

## 待优化组件列表

以下组件仍需应用新样式系统：

- [ ] Description.vue
- [ ] ButtonText.vue
- [ ] LayoutType.vue
- [ ] Position.vue
- [ ] Size.vue
- [ ] DataList.vue
- [ ] ValidationCustom.vue
- [ ] NumberConfig.vue
- [ ] 其他 20+ 个配置组件

## 下一步

1. 逐步将所有配置组件迁移到新样式系统
2. 添加更多通用组件模式（如：颜色选择器、图片上传等）
3. 优化响应式布局
4. 添加暗黑模式切换动画
