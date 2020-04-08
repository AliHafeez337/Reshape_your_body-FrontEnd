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

    <!-- Avatar Row -->
    <div class="vx-row" style="padding-bottom:30px">
      <div class="vx-col w-full">
        <div class="flex items-start flex-col sm:flex-row">
          <img :src="data.photo" class="mr-8 rounded h-24 w-24" />
          <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
          <div>
            <p class="text-lg font-medium mb-2 mt-4 sm:mt-0">{{ data.firstname +' '+data.lastname  }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Row -->
    <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full">

        <vs-input class="w-full mt-4" label="First Name" v-model="data_local.firstname" v-validate="'required|alpha_spaces'" name="firstname" />
        <span class="text-danger text-sm"  v-show="errors.has('firstname')">{{ errors.first('firstname') }}</span>
       
        <vs-input class="w-full mt-4" label="Last Name" v-model="data_local.lastname" v-validate="'required|alpha_spaces'" name="lastname" />
        <span class="text-danger text-sm"  v-show="errors.has('lastname')">{{ errors.first('lastname') }}</span>



        <vs-input class="w-full mt-4" label="Address 1" v-model="data_local.address1"  name="address1" />
        <span class="text-danger text-sm"  v-show="errors.has('address1')">{{ errors.first('address1') }}</span>
                <!-- langs -->
        <div class="mt-8">
          <label class="text-sm">Languages</label>
          <v-select v-model="data_local.languages" multiple :closeOnSelect="false" :options="langOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
        </div>

        <vs-input class="w-full mt-4" label="Address 2" v-model="data_local.address2"  name="address2" />
        <span class="text-danger text-sm"  v-show="errors.has('address2')">{{ errors.first('address2') }}</span>
      </div>

      <div class="vx-col md:w-1/2 w-full">
        <div class="mt-4">
          <label class="vs-input--label">Role</label>
          <v-select v-model="data_local.usertype" :clearable="false" :options="roleOptions" v-validate="'required'" name="role" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
          <span class="text-danger text-sm"  v-show="errors.has('role')">{{ errors.first('role') }}</span>
        </div>
        
        <vs-input class="w-full mt-4" label="City" v-model="data_local.city" name="city" />
        <span class="text-danger text-sm"  v-show="errors.has('city')">{{ errors.first('city') }}</span>

        <vs-input class="w-full mt-4" label="Postal" v-model="data_local.postal"  name="postal" />
        <span class="text-danger text-sm"  v-show="errors.has('postal')">{{ errors.first('postal') }}</span>

        <vs-input class="w-full mt-4" label="Country" v-model="data_local.country" name="country" />
        <span class="text-danger text-sm"  v-show="errors.has('country')">{{ errors.first('country') }}</span>

                <!-- dob -->
        <div class="mt-8">
          <label class="text-sm">Birth Date</label>
          <flat-pickr v-model="data_local.birthdate" :config="{ dateFormat: 'd F Y' }" class="w-full" />
        </div>
        <!-- phone Number -->
        <span class="text-danger text-sm">{{ errors.first('phone') }}</span><br />
        <span class="text-danger text-sm" v-show="isPhoneValid">The phone number must be valid.</span>
        <vs-input
        v-validate="'required'"
        data-vv-validate-on="blur"
        name="phone"
        type="phone"
        label-placeholder="Phone"
        placeholder="Phone (Starting with the country code)"
        v-model="data_local.phone"
        class="w-full mt-6" />

      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Save Changes</vs-button>
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

export default {
  components: {
    vSelect,
    flatPickr
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

      data_local: JSON.parse(JSON.stringify(this.data)),
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
        { label: 'Portugues',   value: 'portugues'   },
      ]}
  },
  computed: {
    role_local: {
      get () {
        return { label: this.capitalize(this.data_local.usertype),  value: this.data_local.usertype  }
      },
      set (obj) {
        this.data_local.usertype = obj.usertype
      }
    },
    validateForm () {
      return !this.errors.any()
    },
    isDisabled () {
      return this.dob !== null && this.langs.length > 0 && this.phone !== '' && !this.isPhoneValid
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
    capitalize (str) {
      return str.slice(0, 1).toUpperCase() + str.slice(1, str.length)
    },
    save_changes () {
      /* eslint-disable */
      if (!this.validateForm) return
      for (let i in this.data_local.languages){
        this.data_local.languages[i]=this.data_local.languages[i].value
      }
      this.data_local.usertype=this.data_local.usertype.value
      this.data_local.id=this.data_local._id;
      this.data_local.photo=null
      console.log(this.data_local)
      return new Promise((resolve, reject) => {
        axios.patch('/user/edit', this.data_local).then(resp => {
        this.colorAlert='success';
        this.alertMessage='User Editted succesfully';
        this.$vs.notify({
            title: 'Success',
            text: this.alertMessage,
            color: this.colorAlert,
            iconPack: 'feather',
            position: 'top-center',
            icon:'icon-check'
        })
        resolve(resp)
        }).catch(err => {
            this.colorAlert='danger';
            this.alertMessage='An Error occured';
            this.$vs.dialog({
            color: this.colorAlert,
            title: this.alertMessage,
            accept: this.acceptAlert
        })
            reject(err)
        })
    });
    },
    reset_data () {
      this.data_local = JSON.parse(JSON.stringify(this.data))
    },
    update_avatar () {
      // You can update avatar Here
      // For reference you can check dataList example
      // We haven't integrated it here, because data isn't saved in DB
    }
  }
}
</script>
