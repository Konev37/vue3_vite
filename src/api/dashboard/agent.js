import request from '@/utils/request'

// 查询Agent信息详细
export function getAgent() {
  return request({
    url: '/dashboard/agent/list',
    method: 'get'
  })
}

// 查询Agent损失率
export function getLossRatio() {
  return request({
    url: '/dashboard/agent/loss',
    method: 'get'
  })
}

// 查询某个集群的Agent损失率
export function getClusterLossRatio() {
  return request({
    url: '/dashboard/agent/clusterloss',
    method: 'get'
  })
}