import request from '@/utils/request'

// 查询场景实体信息列表
export function getUav() {
  return request({
    url: '/scenario/uav/list',
    method: 'get'
  })
}