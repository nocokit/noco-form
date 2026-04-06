import Checkout from '/src/assets/form/checkout.svg'
import Email from '/src/assets/form/email.svg'
import Switch from '/src/assets/form/switch.svg'
import Date from '/src/assets/form/date.svg'
import DateRange from '/src/assets/form/dateRange.svg'
import Input from '/src/assets/form/input.svg'
import Radio from '/src/assets/form/radio.svg'
import Select from '/src/assets/form/select.svg'
import Text from '/src/assets/form/text.svg'
import TextArea from '/src/assets/form/textarea.svg'
import Url from '/src/assets/form/url.svg'
import Time from '/src/assets/form/time.svg'
import TimeRange from '/src/assets/form/timeRange.svg'
import Upload from '/src/assets/form/upload.svg'
import Number from '/src/assets/form/number.svg'
import Rate from '/src/assets/form/score.svg'
import Divider from '/src/assets/form/divider.svg'
import Paging from '/src/assets/form/paging.svg'
import WX from '/src/assets/form/wx.svg'
import Name from '/src/assets/form/name.svg'
import Gender from '/src/assets/form/gender.svg'
import Phone from '/src/assets/form/phone.svg'
import Address from '/src/assets/form/address.svg'
import ID from '/src/assets/form/id.svg'
import TelePhone from '/src/assets/form/telePhone.svg'
import Preview from '/src/assets/form/preview.svg'
import NPS from '/src/assets/form/nps.svg'
import Button from '/src/assets/form/button.svg'
import Sign from '/src/assets/form/sign.svg'

// 编辑器Icon
import Logic from '/src/assets/form-editor/logic.svg'
import Theme from '/src/assets/form-editor/theme.svg'
import Question from '/src/assets/form-editor/question.svg'
import Outline from '/src/assets/form-editor/Outline.svg'

// 显示组件
import Title from '/src/assets/form-editor/title.svg'
import ImgText from '/src/assets/form-editor/img.svg'
import Video from '/src/assets/form-editor/video.svg'
import Img from '/src/assets/form-editor/img.svg'

const Icon = {
  Checkout,
  Email,
  Select,
  Switch,
  Date,
  DateRange,
  Input,
  Radio,
  Text,
  TextArea,
  Url,
  Time,
  TimeRange,
  Upload,
  Number,
  Rate,
  Divider,
  Paging,
  WX,
  Name,
  Gender,
  Phone,
  Address,
  ID,
  TelePhone,
  Preview,
  NPS,
  Button,
  Logic,
  Theme,
  Question,
  Outline,
  Sign,
  ImgText,
  Video,
  Img,
  Title,
} as const

/** Icon key 类型，用于消除消费侧的 (Icon as any)[key] 强制转换 */
export type IconKey = keyof typeof Icon

export default Icon