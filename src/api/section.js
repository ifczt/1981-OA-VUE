import request from '@/utils/request'
const prefix = 'section'
export function get_list() {
  return request({
    url: prefix + '/list',
    method: 'get'
  })
}
export function add_section(data) {
  return request({
    url: prefix,
    method: 'post',
    data
  })
}
export function del_section(data) {
  return request({
    url: prefix,
    method: 'delete',
    data
  })
}


