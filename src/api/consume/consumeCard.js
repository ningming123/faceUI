
import request from '@/utils/request'

export function findList(data) {
  return request({
    url: '/api/consume/findList',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/api/consume/save',
    method: 'post',
    data
  })
}
export function view(data) {
  return request({
    url: '/api/consume/view',
    method: 'post',
    data
  })
}

  export function deleteById(data) {
    return request({
      url: '/api/consume/delete',
      method: 'post',
      data
    })
}
