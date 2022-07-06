
import request from '@/utils/request'

export function findList(data) {
  return request({
    url: '/api/credit/findList',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/api/credit/save',
    method: 'post',
    data
  })
}
export function view(data) {
  return request({
    url: '/api/credit/view',
    method: 'post',
    data
  })
}

  export function deleteById(data) {
    return request({
      url: '/api/credit/delete',
      method: 'post',
      data
    })
}
