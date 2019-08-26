import { RejectedFn, ResolvedFn } from '../types'

/*添加拦截器接口*/
interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}
/*定义泛型类*/
export default class InterceptorManager<T> {
  /* 维护内部私有属性，用来储存拦截器  */
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }
  // 添加拦截器
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved, rejected
    })
    return this.interceptors.length - 1
  }
  // 使用每个拦截器
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
  // 删除拦截器
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
