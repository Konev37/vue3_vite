import request from '@/utils/request'

// 查询Migration信息详细
export function getMigration() {
  return request({
    url: '/dashboard/migration/list',
    method: 'get'
  })
}

// 获取迁移成本
export function migrationCost() {
  return request({
    url: '/dashboard/migration/cost',
    method: 'get'
  })
}