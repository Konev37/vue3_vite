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

export function postSliderVal(val) {
  return request({
    url: '/dashboard/migration/postval',
    method: 'post',
    data: val
  })
}

// 获取每个 agent 上能被迁移的任务
export function TasksCanBeMigrated() {
  return request({
    url: '/dashboard/migration/tasks',
    method: 'get'
  })
}

// 进行任务迁移，修改迁移表
export function migrateTask(val) {
  return request({
    url: '/dashboard/migration/changeVal',
    method: 'post',
    data: val
  })
}

// 最小迁移成本
export function getMinCost() {
  return request({
    url: '/dashboard/migration/mincost',
    method: 'get'
  })
}