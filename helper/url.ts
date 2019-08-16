/**
 * url 参数处理方法
 * @param url
 * @param params
 */
import { isDate, isObject } from './util'

function encode (val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
export function bulidURL(url: string, params?: any): string {
  if (!params) return url
  const parts: string[] = []
  Object.keys(params).forEach((key) => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') return
    // val会有两种情况，数组和非数组 所有 用一个 values 的临时变量来处理
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'  // 给key加个标记
    } else {
      values = [val]
    }
    values.forEach((val) => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) val = JSON.stringify(val)
      parts.push(`${encode(key)}=${encode(val)}`)
    })
    let serializedParams=parts.join('&')
    if(serializedParams){
      const markIndex=url.indexOf('#')
      if(markIndex!==-1){
        url=url.slice(0,markIndex)
      }
    url+=(url.indexOf('?')===-1?'?':'&')+serializedParams
    }
  })
  return url
}

