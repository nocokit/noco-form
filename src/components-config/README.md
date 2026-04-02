# 组件插件化配置系统

## 添加新组件

在 `components-config` 目录下创建 JSON 配置文件：

```json
{
  "type": "ComponentType",
  "name": "组件名称",
  "label": "显示标签",
  "icon": "IconName",
  "category": "basic|personal|advanced|layout",
  "defaultConfig": {
    "isRequired": true,
    "placeholder": "请输入",
    ...其他配置
  }
}
```

## 配置说明

- `type`: 组件类型，需在 CompType 枚举中定义
- `name`: 组件名称
- `label`: 显示标签
- `icon`: 图标名称（对应 comp-icon.ts）
- `category`: 组件分类
- `defaultConfig`: 默认配置项

## 优势

- ✅ 插件化：每个组件独立配置
- ✅ 易扩展：新增组件只需添加 JSON 文件
- ✅ 热更新：支持动态加载配置
- ✅ 向后兼容：自动回退到旧配置系统
