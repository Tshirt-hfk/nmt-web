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

export function downloadExample(data) {
  return request({
    url: '/example/download',
    method: 'post',
    responseType: 'blob',
    data
  })
}
