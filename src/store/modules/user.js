import {login, logout, getInfo, regain_token} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

function RegainTokenContr() {
  setInterval(function () {
    regain_token().then(response => {
      setToken(response.data)
    })
  }, token_exp * 1000)
}

let token_exp = 0
const actions = {
  // user login
  login({commit}, userInfo) {
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {
      login({account: username.trim(), password: password}).then(response => {
        const {data} = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {data} = response
        const timestamp = Date.parse(new Date()) / 1000
        token_exp = parseInt((data.token_exp - timestamp) * 0.95)
        RegainTokenContr()
        if (!data) {
          reject('无法从服务器获取到个人信息，请重新登录.')
        }

        const {name} = data
        const avatar = 'http://zn.net/img/avatar/' + (Math.floor(Math.random() * 8) + 1) + '.gif'
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({commit, state}) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({commit}) {
    console.log('resetToken')
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

