/*=========================================================================================
  File Name: getters.js
  Description: Vuex Store - getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// added so later we can keep breakpoint in sync automatically using this config file
// import tailwindConfig from "../../tailwind.config.js"

const getters = {

  // COMPONENT
  // vx-autosuggest
  // starredPages: state => state.navbarSearchAndPinList.data.filter((page) => page.highlightAction),
  windowBreakPoint: state => {

    // This should be same as tailwind. So, it stays in sync with tailwind utility classes
    if (state.windowWidth >= 1200) return 'xl'
    else if (state.windowWidth >= 992) return 'lg'
    else if (state.windowWidth >= 768) return 'md'
    else if (state.windowWidth >= 576) return 'sm'
    else return 'xs'
  },

  scrollbarTag: state => {
    return state.is_touch_device ? 'div' : 'VuePerfectScrollbar'
  },

  // Ali's work
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  getToken: (state) => {
    // return state.token
    console.log(localStorage.getItem('user-token'))
    return new Promise(async (resolve, reject) => {
      const token = await localStorage.getItem('user-token')
      // console.log(token)
      resolve(token)
    })
  },
  getId: (state) => {
    return new Promise(async (resolve, reject) => {
      const id = await localStorage.getItem('user-id')
      // console.log(id)
      resolve(id)
    })
  },
  getPhoto: (state) => {
    return new Promise(async (resolve, reject) => {
      const photo = await localStorage.getItem('user-photo')
      resolve(photo)
    })
  },
  getUserDisplayListG: (state) => {
    return state.displayListUser
  }
}

export default getters
