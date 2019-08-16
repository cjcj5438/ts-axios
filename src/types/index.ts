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
  method?: Method
  data?: any
  params?: any
}
