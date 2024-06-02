import request from '@/utils/request'

// 根据顺序单品拍卖算法得到的包含任务序列的 agent 列表
export function targetAssignment() {
  return request({
    url: '/scenario/robot_2/assign',
    method: 'get'
  })
}

//得到任务执行列表
export function targetExecution() {
  return request({
    url: '/scenario/robot_2/execution',
    method: 'get'
  })
}

// 得到很多前端 entity 表
export function getEntityTables() {
  return request({
    url: '/scenario/robot_2/tables',
    method: 'get'
  })
}

// 得到很多前端 geo 的 entity 表
export function getGeoEntityTables() {
  return request({
    url: '/scenario/robot_2/geoTables',
    method: 'get'
  })
}

// 获取任务完成时间
export function getMaxTime() {
  return request({
    url: '/scenario/robot_2/maxTime',
    method: 'get'
  })
}

// 获取任务完成率
export function getTaskCompRate() {
    return request({
        url: '/scenario/robot_2/taskCompRate',
        method: 'get'
    })
}

// 获取智能体集群损失率
export function getAgentsLossRate() {
    return request({
        url: '/scenario/robot_2/agentsLossRate',
        method: 'get'
    })
}

// 设置智能体集群损失率
export function editAgentsLossRate(data) {
    return request({
        url: '/scenario/robot_2/setAgentsLossRate',
        method: 'put',
        data: data,
    })
}