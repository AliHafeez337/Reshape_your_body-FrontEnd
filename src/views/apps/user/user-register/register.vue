<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="user-edit-tab-info">


    <!-- Content Row -->
    <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full">

          <span class="text-danger text-sm">{{ errors.first('email') }}</span>
            <!-- <label class="vs-input--label">Email</label> -->
          <vs-input 
            data-vv-validate-on="blur"
            v-validate="'required|email'" 
            name="email"
            class="w-full mb-base" 
            label-placeholder="Email"
            placeholder="Email"
            v-model="email" />

        <span class="text-danger text-sm"  v-show="errors.has('firstname')">{{ errors.first('firstname') }}</span>
       <vs-input 
            data-vv-validate-on="blur"
            label-placeholder="Firstname"
            placeholder="Firstname"
            class="w-full mt-4" label="First Name" v-model="firstname" v-validate="'required|alpha_spaces'" name="firstname" />
        
        <span class="text-danger text-sm"  v-show="errors.has('lastname')">{{ errors.first('lastname') }}</span>
        <vs-input 
            data-vv-validate-on="blur"
            label-placeholder="Lastname"
            placeholder="Lastnae"
            class="w-full mt-4" label="Last Name" v-model="lastname" v-validate="'required|alpha_spaces'" name="lastname" />
        

        <br />
        <!-- <label class="text-sm">Role</label> -->
        <span class="text-danger text-sm" v-show="isEmpty">The user role must be defined.</span>
        <v-select 
            label-placeholder="Role"
            placeholder="Role"
            v-model="role" :options="roleOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                
                <!-- langs -->
        <span class="text-danger text-sm" v-show="isLang">Please select atlease one language.</span>
        <div class="mt-8">
          <!-- <label class="text-sm">Languages</label> -->
          <v-select 
            label-placeholder="Languages"
            placeholder="Languages"
          v-model="languages" multiple :closeOnSelect="false" :options="langOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
        </div>

        <div class="mt-8">
          <!-- <label class="text-sm">Birth Date</label> -->
            <flat-pickr 
            label-placeholder="Birth Date"
            placeholder="Birth Date"
            v-model="dob" :config="{ dateFormat: 'd F Y' }" class="w-full" />
        </div>

      </div>

      <div class="vx-col md:w-1/2 w-full">
        
            <div class="mt-4">

            </div>
            <!-- phone Number -->
            <span class="text-danger text-sm" v-show="isPhoneValid">The phone number must be valid.</span>
            <vs-input
            data-vv-validate-on="blur"
            name="phone"
            type="phone"
            label-placeholder="Phone"
            placeholder="Phone (Starting with the country code)"
            v-model="phone"
            class="w-full mt-6" />

            
            <br />
            <vs-input 
            label-placeholder="Address1"
            placeholder="Address1"
            class="w-full mt-4" v-model="address1" name="Address1" />
            <!-- <span class="text-danger text-sm"  v-show="errors.has('city')">{{ errors.first('city') }}</span> -->

            <vs-input 
            label-placeholder="Address2"
            placeholder="Address2"
            class="w-full mt-4" v-model="address2"  name="Address2" />
            <!-- <span class="text-danger text-sm"  v-show="errors.has('postal')">{{ errors.first('postal') }}</span> -->

        <!-- Country -->
        <div class="mt-8">
        <!-- <label class="text-sm">Country</label> -->
        <v-select 
            label-placeholder="Country"
            placeholder="Country"
        v-model="country1" :options="countryOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
        
        </div>

        <!-- City -->
        <div class="mt-8">
        <!-- <label class="text-sm">City</label> -->
        <v-select 
            label-placeholder="City"
            placeholder="City"
        v-model="city" :options="cityOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />

        <vs-input
        data-vv-validate-on="blur"
        name="postal"
        type="postal"
        label-placeholder="Postal"
        placeholder="Postal"
        v-model="postal"
        class="w-full mt-6" />
    </div>

      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button 
            class="ml-auto mt-2" 
            @click="save_changes" 
            :disabled="validateForm">Save Changes</vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Reset</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import axios from 'axios';
import phone from 'phone'
import Datepicker from 'vuejs-datepicker'
import { en, he } from 'vuejs-datepicker/src/locale'
var jsonData = require('../../../pages/user-settings/countries_json.json');
var jsonData1 = require('../../../pages/user-settings/world-cities_json.json');

export default {
  components: {
    vSelect,
    flatPickr
  },
  data () {
    return {
        role: '',
      dob: null,
      languages: [],
      
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      validphone: '',
      password: '',
      confirm_password: '',
      address1: '',
      address2: '',
      country1: '',
      country: '',
      city: '',
      postal: '',
      countryOptions: jsonData,
      cityOptions: [{}],

      roleOptions: [
        { label: 'Admin',  value: 'admin' },
        { label: 'User',  value: 'user' },
        { label: 'Customer',  value: 'customer' },
        { label: 'Partner',  value: 'partner' },
        ],

      langOptions: [
        { label: 'English',  value: 'english'  },
        { label: 'French',   value: 'french'   },
        { label: 'German',   value: 'german'   },
        { label: 'Portugues',   value: 'portugues' },
      ]}
  },
  watch: {
    country1: function (value) {
      if (value !== null || value !== undefined){
        for (var key in jsonData1) {
          if (key == value.label){
            const uniqueSet = new Set(jsonData1[key])
            this.cityOptions = [...uniqueSet]
            break
          }
        }
        this.country = value.label
      }
    }
  },
  computed: {
    isLang () {
        return this.languages.length <= 0
    },
    isEmpty () {
        return this.role === ''
    },
    validateForm () {
        var a = false
        if (this.phone !== '') {
            a = this.isPhoneValid
        }
      return this.errors.any() || this.firstname === '' || this.lastname === '' || this.role === null || this.role.value === '' || this.role === '' || this.languages.length < 1  || this.email === '' || a
    },
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
    }
  },
  methods: {
    reset_data () {
        this.role = [
        ],
      this.dob = null,
      this.languages = [],
      
      this.firstname = '',
      this.lastname = '',
      this.email = '',
      this.phone = '',
      this.validphone = '',
      this.password = '',
      this.confirm_password = '',
      this.address1 = '',
      this.address2 = '',
      this.country1 = '',
      this.country = '',
      this.city = '',
      this.postal = ''
    },
    capitalize (str) {
      return str.slice(0, 1).toUpperCase() + str.slice(1, str.length)
    },
    save_changes () {

        // const payload = {
        //     firstname: this.firstname,
        //     lastname: this.lastname,
        //     email: this.email,
        //     password: this.password,
        //     phone: this.validphone,
        //     languages: this.languages,
        //     address1: this.address1,
        //     address2: this.address2,
        //     city: this.city,
        //     country: this.country,
        //     postal: this.postal,
        //     usertype: this.role
        //   }
        var langs = []
        for (let i in this.languages){
            langs.push(this.languages[i].label)
        }
        var birthdate = ''
        if (this.dob !== '' || this.dob !== null || this.dob !== undefined){
          birthdate = new Date(this.dob).toISOString()
        }
        if (this.phone !== ''){          
            axios.post('/user/adminRegister',
                {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    phone: this.validphone,
                    languages: langs,
                    address1: this.address1,
                    address2: this.address2,
                    city: this.city,
                    country: this.country,
                    postal: this.postal,
                    usertype: this.role.value == null ? 'user' : this.role.value,
                    birthdate: birthdate
                }
                ).then(() => {
                this.colorAlert = 'success'
                this.$vs.dialog({
                    color: this.colorAlert,
                    title: `You have registered registered`,
                    text: `The confirmation email has been sent.`,
                    accept: this.acceptAlert
                })
                })
                .catch(e => {
                console.log(e)
                this.colorAlert = 'danger'
                this.$vs.dialog({
                    color: this.colorAlert,
                    title: `Unable to register`,
                    text: `Maybe the user is already in the database...`,
                    accept: this.acceptAlert
                })
            })
        }
        else{          
            axios.post('/user/adminRegister',
                {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    languages: langs,
                    address1: this.address1,
                    address2: this.address2,
                    city: this.city,
                    country: this.country,
                    postal: this.postal,
                    usertype: this.role.value == null ? 'user' : this.role.value,
                    birthdate: birthdate
                }
                ).then(() => {
                this.colorAlert = 'success'
                this.$vs.dialog({
                    color: this.colorAlert,
                    title: `You have registered registered`,
                    text: `The confirmation email has been sent.`,
                    accept: this.acceptAlert
                })
                })
                .catch(e => {
                console.log(e)
                this.colorAlert = 'danger'
                this.$vs.dialog({
                    color: this.colorAlert,
                    title: `Unable to register`,
                    text: `Maybe the user is already in the database...`,
                    accept: this.acceptAlert
                })
            })
        }
    },
    update_avatar () {
      // You can update avatar Here
      // For reference you can check dataList example
      // We haven't integrated it here, because data isn't saved in DB
    }
  }
}
</script>
