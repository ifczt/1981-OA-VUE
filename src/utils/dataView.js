import {isArray, isString} from '@/utils/validate'

export const rules = {
  account: [{ required: true, message: '请输入账号', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', trigger: 'change' }],
  password_ver: [{ required: true, message: '请重新输入密码', trigger: 'change' }],
  auth: [{ required: true, message: '请选择用户类别', trigger: 'change' }]
}

/**
 * @param {*} data.msg
 * @param {string} data.request
 */
export function serverCodeReturn(data) {
  if (isString(data.msg)) {
    return addHtmlSpan(data.msg) + '<br/>' + addHtmlSpan('接口：' + data.request)
  } else {
    let msg = ''
    for (const key of Object.keys(data.msg)) {
      msg += addHtmlSpan(key + ':' + data.msg[key]) + '<br/>'
    }
    return msg || '链接拒绝访问'
  }
}

function addHtmlSpan(str) {
  return '<span style="line-height: 20px">' + str + '</span>'
}

const auth_dict = {'SUPER_ADMIN': '超级管理员', 'ADMIN': '管理员', 'OPERATOR': '操作员', 'USER': '用户'}

export function serverData_in(data) {
  if (isArray(data)) {
    if (data.includes('USER')) {
      const auth_data = []
      for (const item of data) {
        auth_data.push({value: auth_dict[item] || item, key: item})
      }
      return auth_data
    }
  }
}
