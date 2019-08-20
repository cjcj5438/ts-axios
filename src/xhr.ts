import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'
import { parseHeaders } from '../helper/header'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    // responseType 在 AxiosRequestConfig接口中有定义的
    const { data = null, url, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    // 初始化一个请求。
    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      // 0: 请求未初始化
      // 1: 服务器连接已建立
      // 2: 请求已接收
      // 3: 请求处理中
      // 4: 请求已完成，且响应已就绪
      if (request.readyState !== 4) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())  // 方法返回所有的响应头
      // 两者其实本质没差别。responseText是后台返回的初始数据，而response会根据responseType的类型来判断要返回什么类型的数据。
      const responseDate = responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseDate,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }
    // 这个是同步方法和上面的promise不再一个js执行队列。所以写在前面后面都一样的
    // 任何报头包括在数据流顶部的都会被当做报文主体。所以，应该在发送请求即调用send（）方法之前使用setRequestHeader() 方法设置 Content-Type头部来指定数据流的MIME类型
    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })
}
