<template>
  <vx-card no-shadow>

    <vs-input 
      class="w-full mb-base" 
      label-placeholder="Name" 
      v-model="firstname"></vs-input>
    <vs-input 
      class="w-full mb-base" 
      label-placeholder="Name" 
      v-model="lastname"></vs-input>

    <!-- dob -->
    <div class="mt-8">
      <label class="text-sm">Birth Date</label>
      <flat-pickr v-model="dob" :config="{ dateFormat: 'd F Y' }" class="w-full" />
    </div>


    <!-- langs -->
    <div class="mt-8">
      <label class="text-sm">Languages</label>
      <v-select v-model="langs" multiple :closeOnSelect="false" :options="langOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
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
      v-model="phone"
      class="w-full mt-6" />
    

    <br />
    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button 
        @click="registerUser" 
        :disabled="!isDisabled"
        class="ml-auto mt-2"
        >Save Changes</vs-button>
    </div>
  </vx-card>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import vSelect from 'vue-select'
import phone from 'phone'
import axios from 'axios';

export default {
  components: {
    flatPickr,
    vSelect
  },
  props: ['user'],
  data () {
    return {
      birthdate: null,
      languages: [],
      firstname: this.$store.state.firstname,
      lastname: this.$store.state.lastname,
      dob: null,
      langs: [],
      phone: '',

      langOptions: [
        { label: 'English',  value: 'english'  },
        { label: 'French',   value: 'french'   },
        { label: 'German',   value: 'german'   },
        { label: 'Portugues',   value: 'portugues'   },
      ]
    }
  },
  computed: {
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
    registerUser () {
      const { firstname, lastname, dob, langs, phone } = this
      if (dob !== ''){
        this.birthdate = new Date(dob).toISOString()
      }
      for (let i in this.langs){
        this.languages.push(this.langs[i].label)
      }
      var obj = {}
      if (firstname !== ""){
        obj.firstname = firstname
      }
      if (lastname !== ""){
        obj.lastname = lastname
      }
      if (phone !== ""){
        obj.phone = phone
      }
      const { birthdate, languages } = this
      if (birthdate !== ""){
        obj.birthdate = birthdate
      }
      if (languages.length > 0){
        obj.languages = languages
      }
      this.$store.getters.getId.then(id => { 
        obj.id = id     
        this.$store.dispatch('edit', obj).then(() => {
          this.$vs.notify({
            title: 'Success',
            text: 'Your profile updated successfully',
            color: 'success',
            iconPack: 'feather',
            position: 'top-center',
            icon:'icon-check'
          })
        })
        .catch(e => {
          this.colorAlert = 'danger'
          this.$vs.dialog({
            color: this.colorAlert,
            title: `Some thing went wrong`,
            text: `Couldn't update your profile...`,
            accept: this.acceptAlert
          })
        })
      })
    }
  }
}
</script>
