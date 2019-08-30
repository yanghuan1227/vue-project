import axios from '@/utils/myaxois.js'

// 获取所有商品列表数据
export const getAllGoodsList = (params) => {
  return axios({
    url: 'goods',
    params
  })
}
