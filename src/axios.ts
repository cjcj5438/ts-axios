import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helper/util'
import defaults from './default'

// 工厂模式创建一个axios 混合对象
function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  /*class 的语法糖 属性都是加在 类的prototype 上面的*/
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}
const axios = createInstance(defaults)
export default axios
