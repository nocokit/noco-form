export default {
  // ==================== 通用 ====================
  common: {
    save: '保存',
    cancel: '取消',
    confirm: '确认',
    delete: '删除',
    edit: '编辑',
    add: '添加',
    search: '搜索',
    reset: '重置',
    submit: '提交',
    back: '返回',
    next: '下一步',
    previous: '上一步',
    close: '关闭',
    loading: '加载中...',
    noData: '暂无数据',
    copy: '复制',
    paste: '粘贴',
    cut: '剪切',
    undo: '撤销',
    redo: '重做',
  },

  // ==================== 导航 ====================
  nav: {
    workspace: 'NOCO FORM',
    editor: '编辑器',
    logic: '逻辑',
    data: '数据',
    publish: '发布',
    preview: '预览',
    settings: '设置',
    help: '帮助',
  },

  // ==================== 编辑器顶部栏 ====================
  header: {
    publish: '发布',
    preview: '预览',
    save: '保存',
    themeToggle: '切换主题',
    languageSwitch: '切换语言',
    github: 'GitHub 仓库',
  },

  // ==================== 组件面板 ====================
  components: {
    title: '组件',
    search: '快速搜索',
    searchPlaceholder: '搜索组件...',
    categories: {
      Layout: '布局组件',
      Media: '媒体内容',
      Inputs: '输入组件',
      Selection: '选择组件',
      Feedback: '反馈组件',
    },
  },

  // ==================== 组件类型 ====================
  componentTypes: {
    // 基础组件
    Input: '单行文本',
    Textarea: '多行文本',
    Number: '数字',
    Select: '下拉选择',
    RadioGroup: '单选框',
    CheckboxGroup: '多选框',
    Switch: '开关',
    Date: '日期',
    DateRange: '日期范围',
    Time: '时间',
    TimeRange: '时间范围',
    Upload: '文件上传',

    // 高级组件
    Rate: '评分',
    NPS: 'NPS评分',
    SelectRate: '选择评分',
    Cascader: '级联选择',
    CountrySelector: '国家选择',
    Captcha: '验证码',
    Payment: '支付',
    TagInput: '标签输入',
    RichText: '富文本',
    LegalTerms: '法律条款',

    // 布局组件
    Divider: '分割线',
    Paging: '分页',
    Grid: '网格布局',
    Stepper: '步骤条',

    // 联系信息
    Name: '姓名',
    Email: '邮箱',
    Phone: '手机号',
    TelePhone: '电话',
    Address: '地址',
    IdCard: '身份证',
    Gender: '性别',
    WX: '微信号',

    // 展示组件
    FormTitle: '表单标题',
    Image: '图片',
    Video: '视频',

    // 其他
    ElectronicSignature: '电子签名',
    Url: '网址链接',
  },

  // ==================== 属性面板 ====================
  properties: {
    title: '属性',
    componentSettings: '组件设置',
    formSettings: '表单设置',
    basicSettings: '基础设置',
    validation: '校验与逻辑',
    advanced: '高级设置',
    style: '样式设置',
    localization: '国际化',
  },

  // ==================== 基础设置 ====================
  settings: {
    // 通用字段
    title: '标题',
    titlePlaceholder: '请输入标题',
    description: '描述',
    descriptionPlaceholder: '请输入描述',
    placeholder: '占位符',
    placeholderPlaceholder: '请输入占位符',
    defaultValue: '默认值',

    // 按钮
    buttonText: '按钮文本',
    buttonTextPlaceholder: '请输入按钮文本',
    buttonIcon: '显示图标',
    buttonPosition: '按钮位置',
    buttonSize: '按钮大小',

    // 位置
    position: '位置',
    positionLeft: '居左',
    positionCenter: '居中',
    positionRight: '居右',

    // 尺寸
    size: '尺寸',
    sizeSmall: '小',
    sizeMedium: '中',
    sizeLarge: '大',

    // 分割线
    dividerText: '分割线文本',
    dividerTextPlaceholder: '请输入分割线文本',
    dividerBorderType: '边框类型',
    borderSolid: '实线',
    borderDashed: '虚线',
    borderDotted: '点线',

    // 分页
    pageTitle: '页标题',
    pageTitlePlaceholder: '请输入页标题',
    pageDescription: '页描述',
    pageDescriptionPlaceholder: '请输入页描述',

    // 图片
    imageUrl: '图片 URL',
    imageUrlPlaceholder: '请输入图片URL',
    imageTitle: '图片标题',
    imageTitlePlaceholder: '请输入图片标题',
    imageDescription: '图片描述',
    imageDescriptionPlaceholder: '请输入图片描述',
    imageBadge: '徽章文本',
    imageBadgePlaceholder: '请输入徽章文本',
    imageAlt: '替代文本',
    imageAltPlaceholder: '请输入替代文本',
    showOverlay: '显示叠加层',
    showBadge: '显示徽章',

    // 视频
    videoUrl: '视频 URL',
    videoUrlPlaceholder: '请输入视频URL (支持 MP4, WebM 等)',
    videoTitle: '视频标题',
    videoTitlePlaceholder: '请输入视频标题',
    videoDescription: '视频描述',
    videoDescriptionPlaceholder: '请输入视频描述',
    videoPoster: '封面图片 URL',
    videoPosterPlaceholder: '请输入视频封面URL',
    videoLabel: '视频标签',
    videoLabelPlaceholder: '请输入视频标签',
    autoplay: '自动播放',
    controls: '显示控制栏',
    loop: '循环播放',

    // 地址
    addressProvince: '省份占位符',
    addressCity: '城市占位符',
    addressDistrict: '区县占位符',
    addressDetail: '详细地址占位符',

    // 日期范围
    startPlaceholder: '开始占位符',
    endPlaceholder: '结束占位符',

    // 评分
    rateCount: '评分数量',
    rateCharacter: '评分字符',
    rateColor: '评分颜色',
    rateAllowHalf: '允许半选',

    // 表单标题
    formTitle: '表单标题',
    formTitlePlaceholder: '请输入表单标题',
    formTitleSize: '标题大小',
    formDescription: '表单描述',
    formDescriptionPlaceholder: '请输入表单描述',
    titleImage: '标题图片',
    titleImageUrl: '标题图片URL',
    titleImageUrlPlaceholder: '请输入图片URL',
    showTitleImage: '显示标题图片',
    showTitleDescription: '显示标题描述',
    descriptionPosition: '描述位置',

    // 数据列表
    dataList: '选项列表',
    addOption: '添加选项',
    addOther: '添加其他选项',
    optionLabel: '选项标签',
    optionValue: '选项值',
    useOtherDataList: '使用其他数据列表',

    // 电子签名
    signType: '签名图片格式',
    signTypePNG: 'PNG',
    signTypeJPG: 'JPG',
  },

  // ==================== 校验 ====================
  validation: {
    required: '必填',
    requiredMessage: '必填提示',
    requiredMessagePlaceholder: '请输入必填提示',
    customErrorMessage: '自定义错误提示',
    customErrorMessagePlaceholder: '请输入自定义错误提示',
    enableCustom: '启用自定义提示',

    // 数字校验
    minValue: '最小值',
    maxValue: '最大值',
    minValuePlaceholder: '请输入最小值',
    maxValuePlaceholder: '请输入最大值',

    // 长度校验
    minLength: '最小长度',
    maxLength: '最大长度',
    minLengthPlaceholder: '请输入最小长度',
    maxLengthPlaceholder: '请输入最大长度',

    // 格式校验
    format: '格式校验',
    formatEmail: '邮箱格式',
    formatPhone: '手机号格式',
    formatUrl: '网址格式',
    formatIdCard: '身份证格式',
    formatCustom: '自定义正则',
    customRegex: '自定义正则表达式',
    customRegexPlaceholder: '请输入正则表达式',

    // 校验消息
    messages: {
      required: '此项为必填项',
      email: '请输入有效的邮箱地址',
      phone: '请输入有效的手机号',
      url: '请输入有效的网址',
      idCard: '请输入有效的身份证号',
      minValue: '值不能小于 {min}',
      maxValue: '值不能大于 {max}',
      minLength: '长度不能少于 {min} 个字符',
      maxLength: '长度不能超过 {max} 个字符',
      pattern: '格式不正确',
    },
  },

  // ==================== 表单设置 ====================
  formSettings: {
    title: '表单设置',
    globalConfig: '全局配置',

    // 显示配置
    displayTitle: '显示标题',
    displayDescription: '显示描述',
    displaySerialNumber: '显示序号',
    displayBtn: '显示提交按钮',
    displayWaterMark: '显示水印',
    waterMarkText: '水印文字',
    waterMarkTextPlaceholder: '请输入水印文字',

    // 品牌配置
    branding: '品牌配置',
    brandingPro: 'Branding PRO',
    paidFeature: '付费功能',
    removePoweredBy: '移除 "Powered by"',
    builtWithNoco: 'Built with NOCO FORM',
    brandingSupport: '保持品牌水印能帮助我们成长。感谢您的支持！',
    unlockNow: '立即解锁',
    upgradeToPro: '升级至 Pro',
    upgradeDesc: '移除 NOCO 品牌并自定义您的 Logo，打造完全白标化的表单体验。',
    removePoweredByBadge: '移除 "Powered by" 徽章',
    uploadCustomLogo: '上传自定义 Logo',
    fullWhiteLabeling: '完全白标化控制',
    prioritySupport: '优先支持',
    freeTrial: '开始您的 14 天免费试用',
    brandingTitle: '品牌标题',
    brandingLogo: '品牌Logo',
    brandingLogoPlaceholder: '请输入Logo URL',
    brandingColor: '品牌色',

    // 语言配置
    respondentLocale: '填写端语言',
    respondentLocaleDesc: '影响按钮文本、日期格式和系统验证消息',
    editorLocale: '编辑器语言',
    editorLocaleDesc: '更改编辑器界面的语言',

    // AI 翻译
    aiLocalize: 'AI 智能翻译',
    aiLocalizeDesc: '将所有字段标签即时翻译为所选语言',
    enableAI: '启用 AI 翻译',
    translateNow: '立即翻译',

    // 配置项
    submitButton: '提交按钮',
    submitButtonDesc: '显示/隐藏表单页脚',
    fieldIndexing: '字段编号',
    fieldIndexingDesc: '显示问题编号',
    watermark: '水印',
    watermarkDesc: '显示品牌水印',
    poweredBy: 'Powered by Noco',
  },

  // ==================== 国际化设置 ====================
  localization: {
    title: '国际化',
    editorLanguage: '编辑器界面语言',
    editorLanguageDesc: '更改 NOCO FORM 界面的语言',
    formLanguage: '表单显示语言',
    formLanguageDesc: '表单填写端显示的语言',
    runtimeLocale: '表单运行端语言',
    autoDetect: '自动检测',
    autoDetectDesc: '匹配用户的浏览器语言',
    regionalStandards: '区域标准',
    currency: '货币',
    weekStart: '周起始日',
    dateFormat: '日期格式',
    timeFormat: '时间格式',

    // AI 翻译
    aiLocalize: 'AI 本地化',
    aiLocalizeDesc: '我们的 AI 引擎可以自动将您的标签和描述翻译为所选语言，准确率达 98%',
    enableAI: '启用 AI 翻译',

    // 页脚
    footer: {
      encoding: 'UTF-8 编码',
      schema: '查看 JSON 架构',
    },
  },

  // ==================== 语言列表 ====================
  languages: {
    zh: '简体中文',
    en: 'English',
  },

  // ==================== 语言区域 ====================
  locales: {
    'zh-CN': '简体中文 (Chinese Simplified)',
    'en-US': 'English (United States)',
  },

  // ==================== 画布 ====================
  canvas: {
    noData: '点击左侧题目 / 拖拽题目到此区域',
    dragHere: '将组件拖拽到此处',
    dropHere: '释放以添加组件',
    emptyForm: '表单为空',
    emptyFormDesc: '从左侧拖拽组件到此处开始创建表单',
  },

  // ==================== 预览 ====================
  preview: {
    title: '预览',
    mobile: '移动端',
    desktop: '桌面端',
    light: '浅色',
    dark: '深色',
    share: '分享预览',
    exit: '退出预览',
    emptyState: '暂无表单字段',
    emptyStateDesc: '从编辑器添加组件',
    schemaInspector: '实时模式检查器',
    submissionData: '表单提交数据',
    submitButton: '提交反馈',
    filled: '已填',
    interactHint: '与表单交互以查看数据',
  },

  // ==================== 操作提示 ====================
  actions: {
    copied: '已复制',
    deleted: '已删除',
    saved: '已保存',
    published: '已发布',
    unpublished: '已取消发布',
    duplicated: '已复制',
    moved: '已移动',
    languageChanged: '语言已切换至',
    themeChanged: '主题已切换',
  },

  // ==================== 确认对话框 ====================
  dialogs: {
    deleteTitle: '确认删除',
    deleteMessage: '确定要删除这个组件吗？此操作不可撤销。',
    discardTitle: '放弃更改',
    discardMessage: '确定要放弃未保存的更改吗？',
    publishTitle: '发布表单',
    publishMessage: '确定要发布这个表单吗？',
  },

  // ==================== 元数据 ====================
  metadata: {
    schema: 'Schema v2.4',
    build: 'Build 76603010',
    version: '版本',
    lastModified: '最后修改',
    createdAt: '创建时间',
    author: '作者',
  },

  // ==================== 错误消息 ====================
  errors: {
    loadFailed: '加载失败',
    saveFailed: '保存失败',
    publishFailed: '发布失败',
    networkError: '网络错误',
    unknownError: '未知错误',
    invalidData: '数据格式不正确',
    notFound: '未找到',
  },

  // ==================== 成功消息 ====================
  success: {
    saved: '保存成功',
    published: '发布成功',
    deleted: '删除成功',
    copied: '复制成功',
    updated: '更新成功',
  },
}
