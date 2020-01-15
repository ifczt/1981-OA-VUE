import { isString } from '@/utils/validate'

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
