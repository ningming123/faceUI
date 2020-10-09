import request from '@/utils/request'

  export function createMenu() {
    return request({
      url: '/api/createMenu',
      method: 'post',
    })
}
