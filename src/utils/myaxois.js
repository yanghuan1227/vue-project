import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 添加请求拦截器
// 拦截器的本质并不是来发起请求的，而是对请求报文进行处理
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么:获取token，设置请求头
  //   1.获取token
  let mytoken = localStorage.getItem('itcast-35-token')
  if (mytoken) {
    // 2.设置请求头:config.headers是一个对象，里面就包含着当前的请求头的设置
    //   console.log(config)
    config.headers.Authorization = mytoken
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  //   Promise.reject(error):中止本次请求
  return Promise.reject(error)
})

// 返回一个默认对象，这种默认对象在后期这个文件被引入的时候自动的返回，意味着引入这个只会返回一个默认对象，不用再使用{}来解析接收
export default axios
