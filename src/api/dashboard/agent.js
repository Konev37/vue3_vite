import request from '@/utils/request'

// 查询Agent信息详细
export function getAgent() {
  return request({
    url: '/dashboard/agent/list',
<<<<<<< HEAD
=======
    method: 'get'
  })
}

// 查询Agent损失率
export function getLossRatio() {
  return request({
    url: '/dashboard/agent/loss',
>>>>>>> a750f112d95fdbfbc6e9c98f3ed1b9e6e3bffa31
    method: 'get'
  })
}