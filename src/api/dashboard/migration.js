import request from '@/utils/request'

// 查询Migration信息详细
export function getMigration() {
  return request({
    url: '/dashboard/migration/list',
    method: 'get'
  })
}

// 获取总迁移成本
export function allMigrationCost() {
  return request({
    url: '/dashboard/migration/allCost',
    method: 'get'
  })
}

// 获取每个集群内部的迁移成本
export function eachMigrationCost() {
  return request({
    url: '/dashboard/migration/eachCost',
    method: 'get'
  })
}