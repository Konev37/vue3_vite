import request from '@/utils/request'

// 查询场景实体信息列表
export function getEntity() {
  return request({
    url: '/scenario/entity/list_2',
    method: 'get'
  })
}

// 查询场景实体 geo 数组信息
export function getGeoEntity() {
  return request({
    url: '/scenario/entity/geoList_2',
    method: 'get'
  })
}

// 新增实体元素
export function insertEntity(data) {
  return request({
    url: '/scenario/entity/insert_2',
    method: 'post',
    data: data,
  })
}

// 删除实体元素
export function deleteEntity(id) {
  return request({
    url: '/scenario/entity/delete_2' + id,
    method: 'delete',
  })
}
