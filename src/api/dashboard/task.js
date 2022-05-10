import request from '@/utils/request'

// 查询任务信息详细
export function getTask() {
  return request({
    url: '/dashboard/task/list',
    method: 'get'
  })
}

// 获取任务完成率
export function taskRatio() {
  return request({
    url: '/dashboard/task/ratio',
    method: 'get'
  })
}