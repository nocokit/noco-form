// 示例：如何添加自定义组件插件

// 1. 创建组件配置文件 src/components-config/custom.json
{
  "type": "CustomComponent",
  "name": "自定义组件",
  "label": "自定义组件",
  "icon": "Custom",
  "category": "basic",
  "defaultConfig": {
    "isRequired": true,
    "description": "描述",
    "placeholder": "请输入",
    "customField": "自定义字段"
  }
}

// 2. 系统会自动扫描并加载配置
// 3. 组件立即可用，无需修改其他代码
