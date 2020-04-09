<!-- =========================================================================================
    File Name: Register.vue
    Description: Register Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div>
    <div class="formRegister h-screen flex w-full bg-img vx-row no-gutter items-center justify-center">
        <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row no-gutter">
                        <!-- <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center"> -->
                        <div class="img vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto">
                            <img src="@/assets/images/pages/register.jpg" alt="register" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg">
                            <div class="px-8 pt-8 register-tabs-container">
                              <div class="vx-card__title mb-4">
                                  <h4 class="mb-4">Create Account</h4>
                                  <p>Fill the below form to create a new account.</p>
                              </div>
                              <div class="clearfix">
                                <vs-input
                                  v-validate="'required|alpha_spaces'"
                                  data-vv-validate-on="blur"
                                  label-placeholder="First Name"
                                  name="firstname"
                                  placeholder="First Name"
                                  v-model="firstname"
                                  class="w-full" />
                                <span class="text-danger text-sm">{{ errors.first('firstname') }}</span>

                                <vs-input
                                  v-validate="'required|alpha_spaces'"
                                  data-vv-validate-on="blur"
                                  label-placeholder="Last Name"
                                  name="lastname"
                                  placeholder="Last Name"
                                  v-model="lastname"
                                  class="w-full" />
                                <span class="text-danger text-sm">{{ errors.first('lastname') }}</span>

                                <vs-input
                                  v-validate="'required|email'"
                                  data-vv-validate-on="blur"
                                  name="email"
                                  type="email"
                                  label-placeholder="Email"
                                  placeholder="Email"
                                  v-model="email"
                                  class="w-full mt-6" />
                                <span class="text-danger text-sm">{{ errors.first('email') }}</span>

                                <vs-input
                                  v-validate="'required'"
                                  data-vv-validate-on="blur"
                                  name="phone"
                                  type="phone"
                                  label-placeholder="Phone"
                                  placeholder="Phone (Starting with the country code)"
                                  v-model="phone"
                                  class="w-full mt-6" />
                                <span class="text-danger text-sm">{{ errors.first('phone') }}</span><br />
                                <span class="text-danger text-sm" v-show="isPhoneValid">The phone number must be valid.</span>

                                <div class="my-4">
                                  <small class="date-label">Birth Date</small>
                                  <datepicker 
                                  :language="$vs.rtl ? langHe : langEn" 
                                  name="start-date" 
                                  v-model="birthDate" 
                                  :disabled="disabledFrom"
                                  label-placeholder="BirthDate"
                                  placeholder="BirthDate"
                                  ref="birthDate"
                                  type="birthDate"></datepicker>
                                </div>
                                
                                <vs-input
                                  ref="password"
                                  type="password"
                                  data-vv-validate-on="blur"
                                  v-validate="'required|min:6'"
                                  name="password"
                                  icon-no-border
                                  icon="icon-lock"
                                  icon-pack="feather"
                                  label-placeholder="Password"
                                  placeholder="Password"
                                  v-model="password"
                                  class="w-full mt-6" />
                                <span class="text-danger text-sm">{{ errors.first('password') }}</span>

                                <vs-input
                                  type="password"
                                  v-validate="'min:6|confirmed:password'"
                                  data-vv-validate-on="blur"
                                  data-vv-as="password"
                                  name="confirm_password"
                                  icon-no-border
                                  icon="icon-lock"
                                  icon-pack="feather"
                                  label-placeholder="Confirm Password"
                                  placeholder="Confirm Password"
                                  v-model="confirm_password"
                                  class="w-full mt-6" />
                                <span class="text-danger text-sm">{{ errors.first('confirm_password') }}</span>
                                
                                <br />

                                <!-- <vs-dropdown>
                                    <a class="flex items-center" href="#">
                                        Add languages
                                        <i class="material-icons"> expand_more </i>
                                    </a>

                                    <vs-dropdown-menu>
                                      <vs-dropdown-item 
                                        v-for="(item, index) in languages" 
                                        :key="index"
                                        @click="addLanuage(item, index)"
                                        > {{item}} </vs-dropdown-item>
                                    </vs-dropdown-menu>
                                </vs-dropdown> -->

                                <div class="dropdown-button-container">
                                  <vs-button class="btnx" type="filled">Add languages</vs-button>
                                  <vs-dropdown>
                                      <vs-button class="btn-drop" type="filled" icon="expand_more"></vs-button>
                                      <vs-dropdown-menu>
                                          <vs-dropdown-item 
                                            v-for="(item, index) in languages" 
                                            :key="index"
                                            @click="addLanuage(item, index)"
                                            > {{item}} </vs-dropdown-item>
                                      </vs-dropdown-menu>
                                  </vs-dropdown>
                                </div>
                                
                                <div class="demo-alignment">
                                    <vs-list>
                                        <vs-list-item 
                                        v-for="(item, index) in addedLanguages" 
                                        :key="index"
                                        >{{item}}&nbsp;&nbsp;&nbsp;
                                    <feather-icon 
                                      icon="Trash2Icon" 
                                      svgClasses="remove h-5 w-5 hover:text-danger cursor-pointer"
                                      @click="removeLanuage(item, index)"
                                      /></vs-list-item>
                                    </vs-list>
                                </div>

                                <vs-input
                                  data-vv-validate-on="blur"
                                  name="address1"
                                  type="address1"
                                  label-placeholder="Address 1"
                                  placeholder="Address 1"
                                  v-model="address1"
                                  class="w-full mt-6" />

                                <vs-input
                                  data-vv-validate-on="blur"
                                  name="address2"
                                  type="address2"
                                  label-placeholder="Address 2"
                                  placeholder="Address 2"
                                  v-model="address2"
                                  class="w-full mt-6" />
                                  
                                <vs-input
                                  data-vv-validate-on="blur"
                                  name="city"
                                  type="city"
                                  label-placeholder="City"
                                  placeholder="City"
                                  v-model="city"
                                  class="w-full mt-6" />
                                  
                                <vs-input
                                  data-vv-validate-on="blur"
                                  name="country"
                                  type="country"
                                  label-placeholder="Country"
                                  placeholder="Country"
                                  v-model="country"
                                  class="w-full mt-6" />

                                <vs-input
                                  data-vv-validate-on="blur"
                                  name="postal"
                                  type="postal"
                                  label-placeholder="Postal"
                                  placeholder="Postal"
                                  v-model="postal"
                                  class="w-full mt-6" />
                                
                                <!-- <div class="centerx">
                                  <vs-upload automatic action="https://jsonplaceholder.typicode.com/posts/" @on-success="successUpload" />
                                </div> -->

                                <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6">I accept the terms & conditions.</vs-checkbox>
                                <vs-button @click="()=>$router.push('/pages/login')" type="border" to="/pages/login" class="mt-6">Login</vs-button>
                                <vs-button 
                                  class="float-right mt-6"
                                   @click="registerUser" 
                                   :disabled="!validateForm">Register</vs-button>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
    <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center">
        <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
            <vx-card>
            </vx-card>
        </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { en, he } from 'vuejs-datepicker/src/locale'
import phone from 'phone'

export default {
  components: {
    Datepicker
  },
  data () {
    return {
      languages: ['English', 'German', 'French'],
      addedLanguages: [],

      showDate: new Date(),
      disabledFrom: false,
      id: 0,
      title: '',
      birthDate: '',
      labelLocal: 'none',

      langHe: he,
      langEn: en,

      url: '',
      calendarView: 'month',

      activePromptAddEvent: false,
      activePromptEditEvent: false,

      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      validphone: '',
      password: '',
      confirm_password: '',
      address1: '',
      address2: '',
      city: '',
      country: '',
      postal: '',
      isTermsConditionAccepted: true
    }
  },
  computed: {
    isPhoneValid () {
      if (phone(this.phone).length > 0) {
        this.validphone = phone(this.phone)[0]
        return false
      }
      else if (this.phone === '') {
        return false
      }
      else {
        return true
      }
    },
    validateForm () {
      // return !this.errors.any() && this.birthDate !== '' && this.firstname !== '' && this.email !== '' && this.password !== '' && this.confirm_password !== '' && this.isTermsConditionAccepted === true
      return !this.errors.any() && this.validphone !== '' && this.lastname !== '' && this.firstname !== '' && this.email !== '' && this.password !== '' && this.confirm_password !== '' && this.isTermsConditionAccepted === true
    },
    windowWidth () {
      return this.$store.state.windowWidth
    }
  },
  methods: {
    addLanuage(language, index) {
      console.log(language)
      this.addedLanguages.push(language)
      this.languages.splice(index, 1)
      console.log(this.addedLanguages)
    },
    removeLanuage(language, index) {
      console.log(language)
      this.addedLanguages.splice(index, 1)
      this.languages.push(language)
      console.log(this.addedLanguages)
    },
    // successUpload(){
    //   this.$vs.notify({color:'success',title:'Upload Success',text:'Lorem ipsum dolor sit amet, consectetur'})
    // },
    checkLogin () {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {

        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })

        return false
      }
      return true
    },
    registerUser () {
      // If form is not validated or user is already login return
      if (!this.validateForm || !this.checkLogin()) return

      if (this.password != this.confirm_password) return
      else{
        const payload = {
          userDetails: {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
            phone: this.validphone,
            languages: this.addedLanguages,
            address1: this.address1,
            address2: this.address2,
            city: this.city,
            country: this.country,
            postal: this.postal
          },
          notify: this.$vs.notify
        }
        if (this.birthDate !== ''){
          payload.userDetails.birthdate = new Date(this.birthDate).toISOString()
        }
        console.log(payload)
        this.$store.dispatch('register', payload.userDetails).then(() => {
          this.colorAlert = 'success'
          this.$vs.dialog({
            color: this.colorAlert,
            title: `You are registered`,
            text: `Now, you just need to confirm your email address... then you're allowed to login.`,
            accept: this.acceptAlert
          })
        })
        .catch(e => {
          console.log(e)
          this.colorAlert = 'danger'
          this.$vs.dialog({
            color: this.colorAlert,
            title: `Unable to register`,
            text: `The email or phone number you are entering must be already registered...`,
            accept: this.acceptAlert
          })
        })
        // this.$store.dispatch('auth/registerUserJWT', payload)
      }
    }
  }
}
</script>

<style lang="scss">
.register-tabs-container {
  min-height: 1100px;

}
.formRegister {
  padding-top: 100px;
}
.vx-card .vx-card__collapsible-content img {
  padding-top: 160px;
}
</style>
