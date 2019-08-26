/**
 *
 */
export interface ResponseData<T= any> {
  code:number
  result:T
  message:string
}
