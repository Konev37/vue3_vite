import request from '@/utils/request'

// 查询任务信息详细
export function getTask() {
  return request({
    url: '/dashboard/task/list',
    method: 'get'
  })
}

// 获取总任务完成率
export function allTaskRatio() {
  return request({
    url: '/dashboard/task/allRatio',
    method: 'get'
  })
}

// 获取每一个 Agent 的任务完成率
export function eachAgentRatio() {
  return request({
    url: '/dashboard/task/eachAgentRatio',
    method: 'get'
  })
}

// 获取每一个 集群 的任务完成率
export function eachClusterRatio() {
  return request({
    url: '/dashboard/task/eachClusterRatio',
    method: 'get'
  })
}

// 获取每一个 集群 的任务详情
export function eachClusterTask() {
  return request({
    url: '/dashboard/task/eachClusterTask',
    method: 'get'
  })
}