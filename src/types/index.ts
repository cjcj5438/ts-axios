// 项目中所有定义的公共文件
export type Method =
  | 'get'
  | 'delete'
  | 'head'
  | 'options'
  | 'post'
  | 'put'
  | 'patch'
  | 'GET'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'POST'
  | 'put'
  | 'patch'

export interface AxiosRequestConfig {
  url: string
  method?: Method // 请求方法类型
  data?: any // 请举起参数
  params?: any // url参数
  headers?: any // 请求头
  timeout?:number,// 处理超时 ms
  responseType?: XMLHttpRequestResponseType // 它允许我们手动的设置返回数据的类型 ，所以是指定它的响应的数据类型的
  // "" | "arraybuffer" | "blob" | "document" | "json" | "text";
}

export interface AxiosResponse {
  data: any // 返回值
  status: number // 状态200
  statusText: string // 状态的文字说明
  headers: any  // 响应头
  config: AxiosRequestConfig  // 请求头的
  request: any // 这个是什么？
}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}
// 继承Promise泛型的接口
export interface AxiosPromise extends Promise<AxiosResponse> {
}
