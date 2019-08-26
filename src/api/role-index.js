// 引入封装好的axios
import axios from 'axios'

// 获取所有的用户数据
export const getAllRolesList = () => {
  return axios({
    url: 'roles'
  })
}

// 删除角色指定的权限
export const delRightByRoleId = (roleId, rightId) => {
  return axios({
    method: 'delete',
    url: `roles/${roleId}/rights/${rightId}`
  })
}
