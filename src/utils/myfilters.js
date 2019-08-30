import moment from 'moment'
// 添加一个全局的事件处理过滤器
export const timeFormat = (time) => {
  time = new Date(time * 1000)
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}
