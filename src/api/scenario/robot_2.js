import request from '@/utils/request'

// 根据顺序单品拍卖算法得到的包含任务序列的 agent 列表
export function targetAssignment() {
  return request({
    url: '/scenario/robot/assign_2',
    method: 'get'
  })
}

//得到任务执行列表
export function targetExecution() {
  return request({
    url: '/scenario/robot/execution_2',
    method: 'get'
  })
}

// 得到很多前端 entity 表
export function getEntityTables() {
  return request({
    url: '/scenario/robot/tables_2',
    method: 'get'
  })
}

// 得到很多前端 geo 的 entity 表
export function getGeoEntityTables() {
  return request({
    url: '/scenario/robot/geoTables_2',
    method: 'get'
  })
}

// 获取任务完成时间
export function getMaxTime() {
  return request({
    url: '/scenario/robot/maxTime_2',
    method: 'get'
  })
}

// 获取任务完成率
export function getTaskCompRate() {
    return request({
        url: '/scenario/robot/taskCompRate_2',
        method: 'get'
    })
}

// 获取智能体集群损失率
export function getAgentsLossRate() {
    return request({
        url: '/scenario/robot/agentsLossRate_2',
        method: 'get'
    })
}

// 设置智能体集群损失率
export function editAgentsLossRate(data) {
    return request({
        url: '/scenario/robot/setAgentsLossRate_2',
        method: 'put',
        data: data,
    })
}