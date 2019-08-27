const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object object]'
}

/*判断 typeof 之后 是不是对象》formDate array buffer 等执行的时候都是object对象 */
// export function isObject(val: any): val is object {
//   return val !== null && typeof val === 'object'
// }

/*判断普通对象的方法*/
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

/*extend 方法的实现用到了交叉类型，并且用到了类型断言。extend 的最终目的是把 from 里的属性都扩展到 to 中，包括原型上的属性*/
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge({}, val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
