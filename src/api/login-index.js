// 引入封装好的axios
import axios from '@/utils/myaxois'

// 实现登录验证
export const login = (data) => {
  return axios({
    //   axios()返回一个promise对象
    url: 'login',
    method: 'post',
    data
  })
}
