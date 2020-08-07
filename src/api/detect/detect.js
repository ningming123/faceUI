
import request from '@/utils/request'

  export function list(data) {
    return request({
      url: '/faceRec/face/detect',
      method: 'post',
      data
    })
}
