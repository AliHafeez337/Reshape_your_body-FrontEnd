<template>
  <vx-card no-shadow>

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
      name="postal"
      type="postal"
      label-placeholder="Postal"
      placeholder="Postal"
      v-model="postal"
      class="w-full mt-6" />


    <!-- Country -->
    <div class="mt-8">
      <label class="text-sm">Country</label>
      <v-select v-model="country1" :options="countryOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
    </div>

    <!-- City -->
    <div class="mt-8">
      <label class="text-sm">City</label>
      <v-select v-model="city" :options="cityOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
    </div>

    <!-- Website  -->
    <!-- <vs-input class="w-full mt-8" label-placeholder="Website" v-model="website" /> -->

    <br />
    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button 
        @click="update" 
        :disabled="!isDisabled"
        class="ml-auto mt-2">Save Changes</vs-button>
    </div>
  </vx-card>
</template>

<script>
import vSelect from 'vue-select'
var jsonData = require('./countries_json.json');
var jsonData1 = require('./world-cities_json.json');

export default {
  components: {
    vSelect
  },
  data () {
    return {
      address1: '',
      address2: '',
      country1: '',
      country: '',
      city: '',
      postal: '',
      countryOptions: jsonData,
      cityOptions: [{}]
    }
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
  // created: {
  //   countryOptions = jsonData
  // },
  computed: {
    isDisabled () {
      return this.country !== '' ||  this.address1 !== '' ||  this.address2 !== '' ||  this.city !== '' ||  this.postal !== ''
    },
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    update () {
      const { country, address1, address2, city, postal } = this
      var obj = {}
      if (country !== ""){
        obj.country = country
      }
      if (address1 !== ""){
        obj.address1 = address1
      }
      if (address2 !== ""){
        obj.address2 = address2
      }
      if (city !== ""){
        obj.city = city
      }
      if (postal !== ""){
        obj.postal = postal
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
