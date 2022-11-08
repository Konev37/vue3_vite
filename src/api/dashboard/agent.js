import request from '@/utils/request'

// 查询Agent信息详细
export function getAgent() {
  return request({
    url: '/dashboard/agent/list',
    method: 'get'
  })
}

// 查询Agent损失率
export function getLossRatio() {
  return request({
    url: '/dashboard/agent/loss',
    method: 'get'
  })
}

// 查询某个集群的Agent损失率
export function getClusterLossRatio() {
  return request({
    url: '/dashboard/agent/clusterloss',
    method: 'get'
  })
}

// 获取总的任务执行成本
export function allTaskExecCost() {
  return request({
    url: '/dashboard/agent/allCost',
    method: 'get'
  })
}

// 获取每个集群的任务执行成本
export function eachTaskExecCost() {
  return request({
    url: '/dashboard/agent/eachCost',
    method: 'get'
  })
}

// 获取每个集群负责的每个任务的任务执行成本
export function eachExecCost() {
  return request({
    url: '/dashboard/agent/innerEachCost',
    method: 'get'
  })
}

// 得到每个agent的存活率
export function eachAgentSurvivability() {
  return request({
    url: '/dashboard/agent/eachSur',
    method: 'get'
  })
}

// 得到所有agent的总存活率
export function allAgentSurvivability() {
  return request({
    url: '/dashboard/agent/allSur',
    method: 'get'
  })
}

// 得到所有agent的总存活率
export function agentTaskExecutionTime() {
  return request({
    url: '/dashboard/agent/execution',
    method: 'get'
  })
}

// 得到当前所有agent的名字
export function getAgentName() {
  return request({
    url: '/dashboard/agent/agentname',
    method: 'get'
  })
}

// 得到当前所有agent的负载率
export function agentLoadRate() {
  return request({
    url: '/dashboard/agent/loadrate',
    method: 'get'
  })
}

// 得到迁移过程中所有agent的负载率
export function agentLoadRates() {
  return request({
    url: '/dashboard/agent/loadrates',
    method: 'get'
  })
}

// 得到当前所有agent的ID
export function getAgentId() {
  return request({
    url: '/dashboard/agent/agentid',
    method: 'get'
  })
}