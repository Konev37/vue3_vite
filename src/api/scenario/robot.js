import request from '@/utils/request'

// 根据顺序单品拍卖算法得到的包含任务序列的 agent 列表
export function targetAssignment() {
  return request({
    url: '/scenario/robot/assign',
    method: 'get'
  })
}

//得到任务执行列表
export function targetExecution() {
  return request({
    url: '/scenario/robot/execution',
    method: 'get'
  })
}

// 得到很多前端 entity 表
export function getEntityTables() {
  return request({
    url: '/scenario/robot/tables',
    method: 'get'
  })
}

// 得到很多前端 geo 的 entity 表
export function getGeoEntityTables() {
  return request({
    url: '/scenario/robot/geoTables',
    method: 'get'
  })
}

// 获取任务完成时间
export function getMaxTime() {
  return request({
    url: '/scenario/robot/maxTime',
    method: 'get'
  })
}