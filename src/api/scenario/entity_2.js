import request from '@/utils/request'

// 查询场景实体信息列表
export function getEntity() {
  return request({
    url: '/scenario/entity_2/list',
    method: 'get'
  })
}

// 查询场景实体 geo 数组信息
export function getGeoEntity() {
  return request({
    url: '/scenario/entity_2/geoList',
    method: 'get'
  })
}

// 新增实体元素
export function insertEntity(data) {
  return request({
    url: '/scenario/entity_2/insert',
    method: 'post',
    data: data,
  })
}

// 删除实体元素
export function deleteEntity(id) {
  return request({
    url: '/scenario/entity_2/delete' + id,
    method: 'delete',
  })
}
