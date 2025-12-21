export default {
  // ==================== Common ====================
  common: {
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    reset: 'Reset',
    submit: 'Submit',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    loading: 'Loading...',
    noData: 'No Data',
    copy: 'Copy',
    paste: 'Paste',
    cut: 'Cut',
    undo: 'Undo',
    redo: 'Redo',
  },

  // ==================== Navigation ====================
  nav: {
    workspace: 'NOCO FORM',
    editor: 'Editor',
    logic: 'Logic',
    data: 'Data',
    publish: 'Publish',
    preview: 'Preview',
    settings: 'Settings',
    help: 'Help',
  },

  // ==================== Header Bar ====================
  header: {
    publish: 'Publish',
    preview: 'Preview',
    save: 'Save',
    themeToggle: 'Toggle Theme',
    languageSwitch: 'Switch Language',
    github: 'GitHub Repository',
  },

  // ==================== Components Panel ====================
  components: {
    title: 'Components',
    search: 'Quick Search',
    searchPlaceholder: 'Search components...',
    categories: {
      basic: 'Basic',
      advanced: 'Advanced',
      layout: 'Layout',
      identity: 'Contact Info',
      display: 'Display',
    },
  },

  // ==================== Component Types ====================
  componentTypes: {
    // Basic Components
    Input: 'Text Input',
    Textarea: 'Textarea',
    Number: 'Number',
    Select: 'Select',
    RadioGroup: 'Radio Group',
    CheckboxGroup: 'Checkbox Group',
    Switch: 'Switch',
    Date: 'Date',
    DateRange: 'Date Range',
    Time: 'Time',
    TimeRange: 'Time Range',
    Upload: 'File Upload',

    // Advanced Components
    Rate: 'Rating',
    NPS: 'NPS Score',
    SelectRate: 'Select Rating',
    Cascader: 'Cascader',
    CountrySelector: 'Country Selector',
    Captcha: 'Captcha',
    Payment: 'Payment',
    TagInput: 'Tag Input',
    RichText: 'Rich Text',
    LegalTerms: 'Legal Terms',

    // Layout Components
    Divider: 'Divider',
    Paging: 'Page Break',
    Grid: 'Grid Layout',
    Stepper: 'Stepper',

    // Contact Info
    Name: 'Name',
    Email: 'Email',
    Phone: 'Phone',
    TelePhone: 'Telephone',
    Address: 'Address',
    IdCard: 'ID Card',
    Gender: 'Gender',
    WX: 'WeChat',

    // Display Components
    FormTitle: 'Form Title',
    Image: 'Image',
    Video: 'Video',

    // Others
    ElectronicSignature: 'E-Signature',
    Url: 'URL Link',
  },

  // ==================== Properties Panel ====================
  properties: {
    title: 'Properties',
    componentSettings: 'Component Settings',
    formSettings: 'Form Settings',
    basicSettings: 'Basic Settings',
    validation: 'Validation & Logic',
    advanced: 'Advanced Settings',
    style: 'Style Settings',
    localization: 'Localization',
  },

  // ==================== Basic Settings ====================
  settings: {
    // Common Fields
    title: 'Title',
    titlePlaceholder: 'Enter title',
    description: 'Description',
    descriptionPlaceholder: 'Enter description',
    placeholder: 'Placeholder',
    placeholderPlaceholder: 'Enter placeholder',
    defaultValue: 'Default Value',

    // Button
    buttonText: 'Button Text',
    buttonTextPlaceholder: 'Enter button text',
    buttonIcon: 'Show Icon',
    buttonPosition: 'Button Position',
    buttonSize: 'Button Size',

    // Position
    position: 'Position',
    positionLeft: 'Left',
    positionCenter: 'Center',
    positionRight: 'Right',

    // Size
    size: 'Size',
    sizeSmall: 'Small',
    sizeMedium: 'Medium',
    sizeLarge: 'Large',

    // Divider
    dividerText: 'Divider Text',
    dividerTextPlaceholder: 'Enter divider text',
    dividerBorderType: 'Border Type',
    borderSolid: 'Solid',
    borderDashed: 'Dashed',
    borderDotted: 'Dotted',

    // Page Break
    pageTitle: 'Page Title',
    pageTitlePlaceholder: 'Enter page title',
    pageDescription: 'Page Description',
    pageDescriptionPlaceholder: 'Enter page description',

    // Image
    imageUrl: 'Image URL',
    imageUrlPlaceholder: 'Enter image URL',
    imageTitle: 'Image Title',
    imageTitlePlaceholder: 'Enter image title',
    imageDescription: 'Image Description',
    imageDescriptionPlaceholder: 'Enter image description',
    imageBadge: 'Badge Text',
    imageBadgePlaceholder: 'Enter badge text',
    imageAlt: 'Alt Text',
    imageAltPlaceholder: 'Enter alt text',
    showOverlay: 'Show Overlay',
    showBadge: 'Show Badge',

    // Video
    videoUrl: 'Video URL',
    videoUrlPlaceholder: 'Enter video URL (MP4, WebM, etc.)',
    videoTitle: 'Video Title',
    videoTitlePlaceholder: 'Enter video title',
    videoDescription: 'Video Description',
    videoDescriptionPlaceholder: 'Enter video description',
    videoPoster: 'Poster Image URL',
    videoPosterPlaceholder: 'Enter poster image URL',
    videoLabel: 'Video Label',
    videoLabelPlaceholder: 'Enter video label',
    autoplay: 'Autoplay',
    controls: 'Show Controls',
    loop: 'Loop',

    // Address
    addressProvince: 'Province Placeholder',
    addressCity: 'City Placeholder',
    addressDistrict: 'District Placeholder',
    addressDetail: 'Detail Placeholder',

    // Date Range
    startPlaceholder: 'Start Placeholder',
    endPlaceholder: 'End Placeholder',

    // Rating
    rateCount: 'Rating Count',
    rateCharacter: 'Rating Character',
    rateColor: 'Rating Color',
    rateAllowHalf: 'Allow Half',

    // Form Title
    formTitle: 'Form Title',
    formTitlePlaceholder: 'Enter form title',
    formTitleSize: 'Title Size',
    formDescription: 'Form Description',
    formDescriptionPlaceholder: 'Enter form description',
    titleImage: 'Title Image',
    titleImageUrl: 'Title Image URL',
    titleImageUrlPlaceholder: 'Enter image URL',
    showTitleImage: 'Show Title Image',
    showTitleDescription: 'Show Title Description',
    descriptionPosition: 'Description Position',

    // Data List
    dataList: 'Options',
    addOption: 'Add Option',
    addOther: 'Add Other Option',
    optionLabel: 'Option Label',
    optionValue: 'Option Value',
    useOtherDataList: 'Use Other Data List',

    // E-Signature
    signType: 'Signature Format',
    signTypePNG: 'PNG',
    signTypeJPG: 'JPG',
  },

  // ==================== Validation ====================
  validation: {
    required: 'Required',
    requiredMessage: 'Required Message',
    requiredMessagePlaceholder: 'Enter required message',
    customErrorMessage: 'Custom Error Message',
    customErrorMessagePlaceholder: 'Enter custom error message',
    enableCustom: 'Enable Custom Message',

    // Number Validation
    minValue: 'Min Value',
    maxValue: 'Max Value',
    minValuePlaceholder: 'Enter min value',
    maxValuePlaceholder: 'Enter max value',

    // Length Validation
    minLength: 'Min Length',
    maxLength: 'Max Length',
    minLengthPlaceholder: 'Enter min length',
    maxLengthPlaceholder: 'Enter max length',

    // Format Validation
    format: 'Format Validation',
    formatEmail: 'Email Format',
    formatPhone: 'Phone Format',
    formatUrl: 'URL Format',
    formatIdCard: 'ID Card Format',
    formatCustom: 'Custom Regex',
    customRegex: 'Custom Regular Expression',
    customRegexPlaceholder: 'Enter regex pattern',

    // Validation Messages
    messages: {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      phone: 'Please enter a valid phone number',
      url: 'Please enter a valid URL',
      idCard: 'Please enter a valid ID card number',
      minValue: 'Value must be at least {min}',
      maxValue: 'Value must be at most {max}',
      minLength: 'Length must be at least {min} characters',
      maxLength: 'Length must be at most {max} characters',
      pattern: 'Invalid format',
    },
  },

  // ==================== Form Settings ====================
  formSettings: {
    title: 'Form Settings',
    globalConfig: 'Global Configuration',

    // Display Config
    displayTitle: 'Show Title',
    displayDescription: 'Show Description',
    displaySerialNumber: 'Show Serial Number',
    displayBtn: 'Show Submit Button',
    displayWaterMark: 'Show Watermark',
    waterMarkText: 'Watermark Text',
    waterMarkTextPlaceholder: 'Enter watermark text',

    // Branding Config
    branding: 'Branding',
    brandingTitle: 'Brand Title',
    brandingLogo: 'Brand Logo',
    brandingLogoPlaceholder: 'Enter logo URL',
    brandingColor: 'Brand Color',

    // Language Config
    respondentLocale: 'Respondent Locale',
    respondentLocaleDesc: 'Affects button text, date formats and system validation messages',
    editorLocale: 'Editor Locale',
    editorLocaleDesc: 'Changes the language of the editor interface',

    // AI Translation
    aiLocalize: 'AI Localize',
    aiLocalizeDesc: 'Translate all field labels to the selected locale instantly',
    enableAI: 'Enable AI Translation',
    translateNow: 'Translate Now',

    // Others
    submitButton: 'Submit Button',
    submitButtonDesc: 'Show/Hide form footer',
    fieldIndexing: 'Field Indexing',
    watermark: 'Powered by Noco',
  },

  // ==================== Localization Settings ====================
  localization: {
    title: 'Localization',
    editorLanguage: 'Editor UI Language',
    editorLanguageDesc: 'Changes the language of the NOCO FORM interface',
    formLanguage: 'Form Display Language',
    formLanguageDesc: 'Language displayed to form respondents',
    runtimeLocale: 'Form Runtime Locale',
    autoDetect: 'Auto-detect',
    autoDetectDesc: "Match user's browser language",
    regionalStandards: 'Regional Standards',
    currency: 'Currency',
    weekStart: 'Week Start',
    dateFormat: 'Date Format',
    timeFormat: 'Time Format',

    // AI Translation
    aiLocalize: 'AI Localize',
    aiLocalizeDesc: 'Our AI engine can automatically translate your labels and descriptions to the selected locale with 98% accuracy',
    enableAI: 'Enable AI Translation',

    // Footer
    footer: {
      encoding: 'UTF-8 ENCODING',
      schema: 'VIEW JSON SCHEMA',
    },
  },

  // ==================== Languages ====================
  languages: {
    zh: '简体中文',
    en: 'English',
    ja: '日本語',
    es: 'Español',
    de: 'Deutsch',
    fr: 'Français',
    pt: 'Português',
  },

  // ==================== Locales ====================
  locales: {
    'zh-CN': '简体中文 (Chinese Simplified)',
    'en-US': 'English (United States)',
    'ja-JP': '日本語 (Japanese)',
    'es-ES': 'Español (Spanish)',
    'de-DE': 'Deutsch (German)',
    'fr-FR': 'Français (French)',
    'pt-BR': 'Português (Portuguese)',
  },

  // ==================== Canvas ====================
  canvas: {
    noData: 'Click or drag components to this area',
    dragHere: 'Drag components here',
    dropHere: 'Drop to add component',
    emptyForm: 'Empty Form',
    emptyFormDesc: 'Drag components from the left to start building your form',
  },

  // ==================== Action Messages ====================
  actions: {
    copied: 'Copied',
    deleted: 'Deleted',
    saved: 'Saved',
    published: 'Published',
    unpublished: 'Unpublished',
    duplicated: 'Duplicated',
    moved: 'Moved',
    languageChanged: 'Language changed to',
    themeChanged: 'Theme changed',
  },

  // ==================== Dialogs ====================
  dialogs: {
    deleteTitle: 'Confirm Delete',
    deleteMessage: 'Are you sure you want to delete this component? This action cannot be undone.',
    discardTitle: 'Discard Changes',
    discardMessage: 'Are you sure you want to discard unsaved changes?',
    publishTitle: 'Publish Form',
    publishMessage: 'Are you sure you want to publish this form?',
  },

  // ==================== Metadata ====================
  metadata: {
    schema: 'Schema v2.4',
    build: 'Build 76603010',
    version: 'Version',
    lastModified: 'Last Modified',
    createdAt: 'Created At',
    author: 'Author',
  },

  // ==================== Error Messages ====================
  errors: {
    loadFailed: 'Failed to load',
    saveFailed: 'Failed to save',
    publishFailed: 'Failed to publish',
    networkError: 'Network error',
    unknownError: 'Unknown error',
    invalidData: 'Invalid data format',
    notFound: 'Not found',
  },

  // ==================== Success Messages ====================
  success: {
    saved: 'Saved successfully',
    published: 'Published successfully',
    deleted: 'Deleted successfully',
    copied: 'Copied successfully',
    updated: 'Updated successfully',
  },
}
