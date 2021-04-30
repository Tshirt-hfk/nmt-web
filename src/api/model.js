import request from '@/utils/request'

export function searchModel(data) {
  return request({
    url: '/model/search',
    method: 'post',
    data
  })
}

export function uploadModel(data, uploader) {
  return request({
    url: '/model/upload',
    method: 'post',
    timeout: 0,
    onUploadProgress: (progressEvent) => {
      let num = progressEvent.loaded / progressEvent.total * 100 | 0;  //百分比
      uploader.onProgress({percent: num})     //进度条
    },
    data
  })
}

export function downloadModel(data) {
  return request({
    url: '/model/download',
    method: 'post',
    responseType: 'blob',
    timeout: 0,
    // onDownloadProgress: (evt) => {

    // },
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

export function existModel(data) {
  return request({
    url: '/model/exist',
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