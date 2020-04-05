<template>
  <vx-card no-shadow>

    <!-- <span class="text-danger text-sm" v-show="!isDisabled">The email must be valid.</span>
    <br />
    <br /> -->
    <span class="text-danger text-sm">{{ errors.first('email') }}</span>
    <vs-input 
      data-vv-validate-on="blur"
        v-validate="'required|email'" 
      name="email"
      icon-no-border
      icon="icon-mail"
      icon-pack="feather"
      placeholder="New Email"
      class="w-full mb-base" 
      label-placeholder="New Email" 
      v-model="email" />
      
    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button 
        class="ml-4 mt-2" 
        type="border" 
        color="warning"
        @click="reset"
        :disabled="!isDisabled">Change Email</vs-button>
    </div>
  </vx-card>
</template>

<script>
export default {
  data () {
    return {
      email: ''
    }
  },
  computed: {
    isDisabled () {
      return !this.errors.any() && this.email !== ''
    },
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    reset () {
      this.$vs.notify({
        title: 'Warning',
        text: 'Please wait a little while',
        color: 'warning',
        iconPack: 'feather',
        position: 'top-center',
        icon:'icon-clock'
      })
    // this.$vs.notify({
    //     title:'Warning',
    //     text:'Please wait a little while',
    //     color:'warning'})
      const { email } = this
      this.$store.getters.getId.then(id => {      
        this.$store.dispatch('editMail', { 
          email
          }).then(() => {
          this.colorAlert = 'success'
          this.$vs.dialog({
            color: this.colorAlert,
            title: `You need to confirm your email...`,
            accept: this.acceptAlert
          })
        })
        .catch(e => {
          this.colorAlert = 'danger'
          this.$vs.dialog({
            color: this.colorAlert,
            title: `Unable to send the confirmation email...`,
            text: `You must be unauthenticated...`,
            accept: this.acceptAlert
          })
        })
      })
    }
  }
}
</script>
