import request from '@/utils/request'

// 根据顺序单品拍卖算法得到的包含任务序列的 agent 列表
export function targetAssignment() {
  return request({
    url: '/scenario/robotuav/assign_3',
    method: 'get'
  })
}

//得到任务执行列表
export function targetExecution() {
  return request({
    url: '/scenario/robotuav/execution_3',
    method: 'get'
  })
}

// 得到很多前端 entity 表
export function getEntityTables() {
  return request({
    url: '/scenario/robotuav/tables_3',
    method: 'get'
  })
}

// 得到很多前端 geo 的 entity 表
export function getGeoEntityTables() {
  return request({
    url: '/scenario/robotuav/geoTables_3',
    method: 'get'
  })
}

// 获取任务完成时间
export function getMaxTime() {
  return request({
    url: '/scenario/robotuav/maxTime_3',
    method: 'get'
  })
}

// 获取任务成本
export function getCost() {
  return request({
    url: '/scenario/robotuav/Cost',
    method: 'get'
  })
}

// 获取任务完成率
export function getTaskCompRate() {
  return request({
      url: '/scenario/robotuav/taskCompRate_3',
      method: 'get'
  })
}