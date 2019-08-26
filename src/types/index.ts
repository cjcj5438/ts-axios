// 项目中所有定义的公共文件
import any = jasmine.any

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
  url?: string
  method?: Method // 请求方法类型
  data?: any // 请举起参数
  params?: any // url参数
  headers?: any // 请求头
  timeout?: number,// 处理超时 ms
  responseType?: XMLHttpRequestResponseType // 它允许我们手动的设置返回数据的类型 ，所以是指定它的响应的数据类型的
  // "" | "arraybuffer" | "blob" | "document" | "json" | "text";
}

export interface AxiosResponse<T=any> {
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
export interface AxiosPromise<T=any> extends Promise<AxiosResponse<T>> {
}

// 为了用户更加方便地使用 axios 发送请求，我们可以为所有支持请求方法扩展一些接口
export interface Axios {
  interceptors:{
    request:AxiosInterceptorManager<AxiosRequestConfig>
    response:AxiosInterceptorManager<AxiosResponse>
  }
  request<T=any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 接口继承接口
export interface AxiosInstance extends Axios {
  <T=any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 拦截器接口定义
export interface AxiosInterceptorManager<T> {
  use(resolved:ResolvedFn<T>,rejected?:RejectedFn):number
  eject(id:number):void
}
export interface ResolvedFn<T=any> {
  (val:T):T|Promise<T>
}
export interface RejectedFn {
  (error:any):any
}
