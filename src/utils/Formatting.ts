import { MsgEnum } from '@/enums'

/**
 * 文件大小格式化
 */
export const formatBytes = (bytes: number): string => {
  if (bytes === 0 || !bytes) {
    return '0 B'
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const base = 1024
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(base))
  const size = parseFloat((bytes / Math.pow(base, unitIndex)).toFixed(2))

  return size + ' ' + units[unitIndex]
}

/** 注意！这是文件图标映射关系表，如有修改需求-请联系前端管理同学 */
const fileSuffixMap: Record<string, string> = {
  jpg: 'jpg',
  jpeg: 'jpg',
  png: 'jpg',
  webp: 'jpg',
  mp4: 'mp4',
  mov: 'mp4',
  avi: 'mp4',
  rmvb: 'mp4',
  doc: 'doc',
  docx: 'doc',
  mp3: 'mp3',
  wav: 'mp3',
  aac: 'mp3',
  flac: 'mp3',
  pdf: 'pdf',
  ppt: 'ppt',
  pptx: 'ppt',
  xls: 'xls',
  xlsx: 'xls',
  zip: 'zip',
  rar: 'zip',
  '7z': 'zip',
  txt: 'txt',
  log: 'log',
  svg: 'svg',
  sketch: 'sketch',
  exe: 'exe',
  md: 'md'
}
/**
 * 获取文件对应的Icon
 * @param fileName 文件名
 * @returns Icon
 */
export const getFileSuffix = (fileName: string): string => {
  if (!fileName) return 'other'

  const suffix = fileName.toLowerCase().split('.').pop()
  if (!suffix) return 'other'

  return fileSuffixMap[suffix] || 'other'
}

// 生成消息体
export const generateBody = (fileInfo: any, msgType: MsgEnum, isMock?: boolean) => {
  const { size, width, height, downloadUrl, name, second, tempUrl, thumbWidth, thumbHeight, thumbUrl, thumbSize } =
    fileInfo
  const url = isMock ? tempUrl : downloadUrl
  const baseBody = { size, url }
  let body = {}

  if (msgType === MsgEnum.IMAGE) {
    body = { ...baseBody, width, height }
  } else if (msgType === MsgEnum.VOICE) {
    body = { ...baseBody, second }
  } else if (msgType === MsgEnum.VIDEO) {
    body = { ...baseBody, thumbWidth, thumbHeight, thumbUrl, thumbSize }
  } else if (msgType === MsgEnum.FILE) {
    body = { ...baseBody, fileName: name, url: downloadUrl }
  }
  return { body, type: msgType }
}

/**
 * 地址转Blob
 */
export const urlToBlob = async (url: string): Promise<Blob> => {
  const response = await fetch(url)
  return await response.blob()
}

/**
 * 地址转文件
 */
export const urlToFile = async (url: string, fileName?: string): Promise<File> => {
  const blob = await urlToBlob(url)
  const fileType = blob.type
  const name = fileName || Date.now() + '_emoji.png' // 时间戳生成唯一文件名
  return new File([blob], name, { type: fileType })
}
