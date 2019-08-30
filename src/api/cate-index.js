import axios from '@/utils/myaxois'

// 获取所有商品列表数据
export const getAllCateList = (type) => {
  return axios({
    url: 'categories',
    params:{ type }
  })
}
