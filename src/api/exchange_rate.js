import request from '@/utils/request'
const prefix = 'exchange_rate'
export function get_list() {
  return request({
    url: prefix + '/list',
    method: 'get'
  })
}

export function add_rate(data) {
  return request({
    url: prefix,
    method: 'post',
    data
  })
}

