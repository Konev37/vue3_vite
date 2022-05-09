import request from '@/utils/request'

// 查询Migration信息详细
export function getMigration() {
  return request({
    url: '/dashboard/migration',
    method: 'get'
  })
}