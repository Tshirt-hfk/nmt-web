import request from '@/utils/request'

export function searchModel(data) {
  return request({
    url: '/model/search',
    method: 'post',
    data
  })
}

export function uploadModel(data) {
  return request({
    url: '/model/upload',
    method: 'post',
    data
  })
}

export function downloadModel(data) {
  return request({
    url: '/model/download',
    method: 'post',
    responseType: 'blob',
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