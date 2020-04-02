// axios
import Store from './store/store'
import getters from './store/getters'
import state from './store/state'
import axios from 'axios'

// const baseURL = 'http://localhost:3000'

axios.defaults.baseURL = 'http://localhost:3000'

// The good way of setting x-auth headers is here...
// But if you click logout at once after login then, the request goes before time to set and get from the local storage...
// And I don't know the way to check if the header is set or not (for universal)
// So the best solutoin is to set the header before you confirm it in the action.js file..

getters.getToken().then((token) => {
  console.log(token)
  axios.defaults.headers.common['x-auth'] = token
})
// axios.defaults.headers.common['x-auth'] = localStorage.getItem('user-token')

axios.interceptors.request.use(config => {
  console.log('Request Interceptor', config)
  return config
})
axios.interceptors.response.use(res => {
  console.log('Response Interceptor', res)
  return res
})

export default axios.create({
  // baseURL
  // ,
  // You can add your headers here
  // headers: {
  //   'x-auth': Store.getters.getToken
  // }
})
