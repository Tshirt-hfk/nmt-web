import request from '@/utils/request'

export function getAllRecord(data) {
    return request({
        url: '/record/all',
        method: 'post',
        data
    })
}