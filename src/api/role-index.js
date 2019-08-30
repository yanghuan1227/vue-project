// 引入封装好的axios
import axios from 'axios'

// 获取所有的用户数据
export const getAllRoleList = () => {
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

// 为指定角色授权
export const grantRoleById = (roleId, rids) => {
  return axios({
    method: 'post',
    url: `roles/${roleId}/rights`,
    data: { rids }
  })
}

// 添加角色
export const addRole = (data) => {
  return axios({
    url: `roles`,
    method: 'post',
    data

  })
}
