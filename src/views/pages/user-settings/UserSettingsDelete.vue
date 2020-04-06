<template>
  <vx-card no-shadow>

    <vs-alert color="danger" title="Be Carefull" active="true" class="mt-3">
        Please, be carefull, you can loose all of your record by submitting this form.
    </vs-alert>

    <br />
    <br />
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>
    <vs-input 
      type="password"
      data-vv-validate-on="blur"
      v-validate="'required|min:6'"
      name="password"
      icon-no-border
      icon="icon-lock"
      icon-pack="feather"
      placeholder="Password"
      class="w-full mb-base" 
      label-placeholder="Password" 
      v-model="password" />
    
    <div class="flex flex-wrap items-center justify-end">
      <vs-button 
        class="ml-4 mt-2" 
        type="border" 
        color="danger"
        @click="deleteAccount"
        :disabled="!isDisabled">Delete Account</vs-button>
    </div>
  </vx-card>
</template>

<script>
export default {
  data () {
    return {
        'password': ''
    }
  },
  computed: {
    isDisabled () {
      return !this.errors.any() && this.password !== ''
    },
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    deleteAccount () {
      this.$vs.notify({
        title: 'Warning',
        text: 'Please wait a little while',
        color: 'warning',
        iconPack: 'feather',
        position: 'top-center',
        icon:'icon-clock'
      })
      const { password } = this
      this.$store.getters.getId.then(id => {      
        this.$store.dispatch('deleteAccount', { 
          password
          }).then(() => {
          this.colorAlert = 'success'
          this.$vs.dialog({
            color: this.colorAlert,
            title: `Your account is deleted...`,
            accept: this.acceptAlert
          })
          this.$router.push('/pages/login')
          this.$store.dispatch('logout')
        })
        .catch(e => {
          this.colorAlert = 'danger'
          this.$vs.dialog({
            color: this.colorAlert,
            title: `Something went wrong...`,
            text: `You must be unauthenticated...`,
            accept: this.acceptAlert
          })
        })
      })
    }
  }
}
</script>
