import request from '@/utils/request'

// 查询任务信息详细
export function getTask() {
  return request({
    url: '/dashboard/task',
    method: 'get'
  })
}