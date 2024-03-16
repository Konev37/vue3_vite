import request from '@/utils/request'

// 查询集群信息详细
export function getTest() {
  return request({
    url: '/dashboard/test',
    method: 'get'
  })
}

// 修改滑块值
export function updateSlider(val) {
  return request({
    url: '/dashboard/test/updateval',
    method: 'put',
    data: val
  })
}

