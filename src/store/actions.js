/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import getters from './getters'
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
  
  // Ali's work
  // login: ({commit, dispatch}, user) => {
  login: ({commit}, user) => {
    console.log(user)
    return new Promise((resolve, reject) => { // The Promise used for router redirect in login
      commit('AUTH_REQUEST')
      axios.post('/user/login', {
      // axios.post('/user/login', {
        email: user.email,
        password: user.password
      })
        .then(resp => {
          const token = resp.data.token
          localStorage.setItem('user-token', token) // store the token in localstorage
          localStorage.setItem('user-id', resp.data._id)
          localStorage.setItem('user-photo', resp.data.photo)
          localStorage.setItem('user-email', resp.data.email)
          localStorage.setItem('user-firstname', resp.data.firstname)
          localStorage.setItem('user-lastname', resp.data.lastname)
          localStorage.setItem('user-usertype', resp.data.usertype)
          commit('AUTH_SUCCESS', token, resp.data._id, resp.data.photo, resp.data.email, resp.data.firstname, resp.data.lastname, resp.data.usertype)
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
  },

  // logout: ({commit, dispatch, state}) => {
  logout: ({commit}) => {
    
    return new Promise((resolve, reject) => {
      axios.post('/user/logout')
        .then(res => {
          console.log(res)
          commit('AUTH_LOGOUT')
          localStorage.removeItem('user-token') // clear your user's token from localstorage
          localStorage.removeItem('user-id')
          localStorage.removeItem('user-photo')
          localStorage.removeItem('user-email')
          localStorage.removeItem('user-firstname')
          localStorage.removeItem('user-lastname')
          localStorage.removeItem('user-usertype')
          resolve()
        })
        .catch(err => {
          commit('AUTH_ERROR', err)
          reject(err)
        })
    })
    // getters.getToken().then((token) => {
    //   console.log(token)
    //   axios.defaults.headers.common['x-auth'] = token
      
    //   return new Promise((resolve, reject) => {
    //     axios.post('/user/logout')
    //       .then(res => {
    //         console.log(res)
    //         commit('AUTH_LOGOUT')
    //         localStorage.removeItem('user-token') // clear your user's token from localstorage
    //         localStorage.removeItem('user-id')
    //         localStorage.removeItem('user-photo')
    //         localStorage.removeItem('user-email')
    //         localStorage.removeItem('user-firstname')
    //         localStorage.removeItem('user-lastname')
    //         localStorage.removeItem('user-usertype')
    //         resolve()
    //       })
    //       .catch(err => {
    //         commit('AUTH_ERROR', err)
    //         reject(err)
    //       })
    //   })
    // })
  }
}

export default actions
