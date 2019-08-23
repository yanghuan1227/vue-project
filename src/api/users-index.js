// 引入封装好的axios
import axios from '@/utils/myaxois'

// 获取所有用户数据
export const getAllUsers = (params) => {
  return axios({
    url: 'users',
    params
  })
}
