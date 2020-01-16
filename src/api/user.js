import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'user/login',
    method: 'POST',
    data
  })
}

export function getInfo() {
  return request({
    url: 'user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'user/logout',
    method: 'get'
  })
}

export function regain_token() {
  return request({
    url: 'token',
    method: 'get'
  })
}

export function get_auth_list() {
  return request({
    url: 'user/auth_list',
    method: 'get'
  })
}

export function creat_user(data) {
  return request({
    url: 'user',
    method: 'post',
    data
  })
}

export function get_user_list(data) {
  return request({
    url: 'user/list',
    method: 'post',
    data
  })
}

