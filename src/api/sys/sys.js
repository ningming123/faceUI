import request from '@/utils/request'

  export function createMenu() {
    return request({
      url: '/api/sys/module/createMenu',
      method: 'get',
    })
}
