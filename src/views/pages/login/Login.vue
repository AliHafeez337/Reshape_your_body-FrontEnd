<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">

          <div class="vx-row no-gutter justify-center items-center">

            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto">
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">

                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Login</h4>
                  <p>Welcome back, please login to your account.</p>
                </div>

                <div>
                  <span class="text-danger text-sm" v-show="isEmailValid()">Email must be valid.</span>
                  <br />
                  <vs-input
                      name="email"
                      icon-no-border
                      icon="icon icon-mail"
                      icon-pack="feather"
                      label-placeholder="Email"
                      v-model="email"
                      class="w-full"/>

                  <br />
                  <span class="text-danger text-sm" v-show="isPasswordValid()">Password lenght must be greater than 6.</span>
                  <vs-input
                      type="password"
                      name="password"
                      icon-no-border
                      icon="icon icon-lock"
                      icon-pack="feather"
                      label-placeholder="Password"
                      v-model="password"
                      class="w-full mt-6" />
                  
                  <div class="flex flex-wrap justify-between my-5">
                      <!-- <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox> -->
                      <router-link to="/pages/forget">Forgot Password?</router-link>
                  </div>
                  <vs-button 
                    v-validate="'required|email'" 
                    placeholder="Your Email" 
                    name="email" 
                    class="float-left" 
                    @click.prevent="submitted"
                    :disabled="isDisabled()">Login</vs-button>
                  <vs-button 
                    class="float-right"  
                    type="border"
                    @click="()=>$router.push('/pages/register')"
                    >Register</vs-button>

                  <vs-divider>OR</vs-divider>

                  <div class="social-login-buttons flex flex-wrap items-center mt-4">

                    <p>Connect with &nbsp;&nbsp;&nbsp;</p>
                    <!-- facebook -->
                    <div 
                    @click.prevent="facebook"
                    class="bg-facebook pt-3 pb-2 px-4 rounded-lg cursor-pointer mr-4">
                      <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" class="text-white h-4 w-4 svg-inline--fa fa-facebook-f fa-w-9" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264 512"><path fill="currentColor" d="M215.8 85H264V3.6C255.7 2.5 227.1 0 193.8 0 124.3 0 76.7 42.4 76.7 120.3V192H0v91h76.7v229h94V283h73.6l11.7-91h-85.3v-62.7c0-26.3 7.3-44.3 45.1-44.3z"></path></svg>
                    </div>

                    <p>or &nbsp;&nbsp;&nbsp;</p>
                    <!-- GOOGLE -->
                    <div class="bg-google pt-3 pb-2 px-4 rounded-lg cursor-pointer mr-4">
                      <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" class="text-white h-4 w-4 svg-inline--fa fa-google fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                    </div>
                    <!-- <a href="http://localhost:3000/user/auth/facebook" v-on:click.right="copy">Login with Facebook</a> -->
                    <a v-on:click.left="copy" v-on:click.right="copy">Login with Facebook</a>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import * as http from "http";
import cryptoRandomString from'crypto-random-string'

export default {
  data () {
    return {
      email: '',
      password: '',
      code: '',
      // eslint-disable-next-line no-useless-escape
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },
  created () {
    this.getCode()
  },
  methods: {
    getCode() {
      this.code = cryptoRandomString({length: 10, type: 'url-safe'}),
      console.log(this.code)
    },
    copy () {
      console.log('left clicked')
      window.open("http://localhost:3000/user/auth/facebook", "_blank"); 
      // axios.get('/user/auth/facebook').then(res => console.log(res))
    },
    facebook () {
      // http.request({
      //   url: "http://localhost:3000/user/auth/facebook",
      //   method: "GET",
      //   // headers: { "Content-Type": "application/json" }
      // })
      // .then(response => {
      //   console.log(response)
      //   // var result = response.content.toJSON();
      // }, error => {
      //   console.error(error);
      // });


      // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
      // axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
      
      // axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://www.facebook.com/*'
      axios.get('http://localhost:3000/user/auth/facebook'
      // axios.get('http://localhost:3000/user/auth/facebook/callback'
      // , {
      //       headers: {'Access-Control-Allow-Origin': '*'}
      //   }
      // , { crossdomain: true }
      )
    },
    isEmailValid () {
      // return ((this.email === '') ? '' : (this.reg.test(this.email))? false : true)
      return !((this.email === '') ? '' : (this.reg.test(this.email)))
    },
    isPasswordValid () {
      return (!(this.password.length === 0 || this.password.length >= 6))
    },
    isDisabled () {
      return (!(this.reg.test(this.email) && this.password.length >= 6))
    },
    submitted () {
      const { email, password } = this
      this.$store.dispatch('login', { email, password}).then(() => {
        this.$vs.notify({
          title: 'Success',
          text: 'You logged in successfully',
          color: 'success',
          iconPack: 'feather',
          position: 'top-center',
          icon:'icon-check'
        })
        this.$router.push('/')
      })
      .catch(e => {
        this.colorAlert = 'danger'
        this.$vs.dialog({
          color: this.colorAlert,
          title: `Unable to login`,
          text: `You must be providing the wrong credentials...`,
          accept: this.acceptAlert
        })
      })
    }
  },
  components: {
  }
}
</script>

<style lang="scss">
#page-login {
  .social-login-buttons {
    .bg-facebook { background-color: #1551b1 }
    .bg-twitter { background-color: #00aaff }
    .bg-google { background-color: #4285F4 }
    .bg-github { background-color: #333 }
  }
}
</style>
