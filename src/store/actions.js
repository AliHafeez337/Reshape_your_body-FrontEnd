/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from 'axios'
const actions = {

  // /////////////////////////////////////////////
  // COMPONENTS
  // /////////////////////////////////////////////

  // Vertical NavMenu
  updateVerticalNavMenuWidth ({ commit }, width) {
    commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
  },

  // VxAutoSuggest
  updateStarredPage ({ commit }, payload) {
    commit('UPDATE_STARRED_PAGE', payload)
  },

  // The Navbar
  arrangeStarredPagesLimited ({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_LIMITED', list)
  },
  arrangeStarredPagesMore ({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_MORE', list)
  },

  // /////////////////////////////////////////////
  // UI
  // /////////////////////////////////////////////

  toggleContentOverlay ({ commit }) {
    commit('TOGGLE_CONTENT_OVERLAY')
  },
  updateTheme ({ commit }, val) {
    commit('UPDATE_THEME', val)
  },

  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  updateUserInfo ({ commit }, payload) {
    commit('UPDATE_USER_INFO', payload)
  },
  updateUserRole ({ dispatch }, payload) {
    // Change client side
    payload.aclChangeRole(payload.userRole)

    // Make API call to server for changing role

    // Change userInfo in localStorage and store
    dispatch('updateUserInfo', {userRole: payload.userRole})
  },
  
  login: ({commit, dispatch}, user) => {
    console.log(user)
    return new Promise((resolve, reject) => { // The Promise used for router redirect in login
      commit('AUTH_REQUEST')
      axios.post('http://localhost:3000/user/login', {
        email: user.email,
        password: user.password
      })
        .then(resp => {
          console.log(resp)
          const token = resp.data.token
          localStorage.setItem('user-token', token) // store the token in localstorage
          localStorage.setItem('user-id', resp.data._id)
          localStorage.setItem('user-photo', resp.data.photo)
          localStorage.setItem('user-email', resp.data.email)
          commit('AUTH_SUCCESS', token, resp.data._id, resp.data.photo, resp.data.email)
          // you have your token, now log in your user :)
          // dispatch('USER_REQUEST')
          resolve(resp)
        })
        .catch(err => {
          commit('AUTH_ERROR', err)
          localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
          reject(err)
        })
    })
  }
}

export default actions
