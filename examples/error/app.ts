// 在 catch 的函数体中不能判断出e 的为 AxiosError 的类型，那么就要手动指名类型
import axios, { AxiosError } from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

axios({
  method: 'get',
  url: '/error/get'
}).then((res) => {
  console.log(res)
}).catch((e:AxiosError) => {
  console.log(e)
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then((res) => {
    console.log(res)
  }).catch((e:AxiosError) => {
    console.log(e)
  })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e:AxiosError) => {
  console.log(e.message)
  console.log(e.code)
  console.log(e.config)
  console.log(e.request)
  console.log(e.response)
})
