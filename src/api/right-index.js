import axios from '@/utils/myaxois'

// 获取所有权限列表数据
export const getAllRightsList = (type) => {
  return axios({
    url: `rights/${type}`
  })
}
