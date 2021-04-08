import request from '@/utils/request'

export function createExample(data) {
    return request({
      url: '/example/create',
      method: 'post',
      data
    })
  }

export function getAllExample(data) {
  return request({
    url: '/example/all',
    method: 'post',
    data
  })
}