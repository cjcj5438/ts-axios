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
