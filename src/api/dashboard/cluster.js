import request from '@/utils/request'

// 查询集群信息详细
export function getCluster() {
  return request({
    url: '/dashboard/cluster',
    method: 'get'
  })
}

// 修改滑块值
export function updateSlider(val) {
  return request({
    url: '/dashboard/cluster',
    method: 'put',
    data: val
  })
}