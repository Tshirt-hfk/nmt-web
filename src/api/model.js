import request from '@/utils/request'

export function uploadModel(data) {
  return request({
    url: '/model/upload',
    method: 'post',
    data
  })
}

export function addModel(data) {
    return request({
      url: '/model/add',
      method: 'post',
      data
    })
  }

  export function getAllModel(data) {
    return request({
      url: '/model/all',
      method: 'post',
      data
    })
  }