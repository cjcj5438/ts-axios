import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  /**
   *
   * @param message
   * @param config
   * @param code
   * @param request
   * @param response
   */
  constructor(message: string, config: AxiosRequestConfig, code?: string | null, request?: any, response?: AxiosResponse) {
    super(message)
    this.config = config // 请求对象配置
    this.code = code // 错误代码
    this.request = request // XMLHttpRequest.request
    this.response = response // XMLHttpRequest.response
    this.isAxiosError = true
    // 这个是主要解决ts的坑。 在继承 error array map 等内置对象的时候， 为了可以使用其中的方法
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

/*然后我们写一个工厂函数*/
export function createError(message: string, config: AxiosRequestConfig, code?: string | null, request?: any, response?: AxiosResponse): AxiosError {
  return new AxiosError(message, config, code, request, response)
}
