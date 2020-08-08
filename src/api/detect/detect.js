
import request from '@/utils/request'

  export function list(data) {
    return request({
      url: '/api/face/detect',
      method: 'post',
      data
    })
}
