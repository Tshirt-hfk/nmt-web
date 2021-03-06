import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/tourist/login',
    method: 'post',
    data
  })
}

export function modifyInfo(data) {
  return request({
    url: '/user/modify',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/user/info',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}


