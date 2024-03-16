import request from '@/utils/request'

// 查询集群信息详细
export function getCluster() {
  return request({
    url: '/dashboard/cluster/list',
    method: 'get'
  })
}

// 获取每个集群的生命力
export function clusterSurvivability() {
  return request({
    url: '/dashboard/cluster/sur',
    method: 'get'
  })
}