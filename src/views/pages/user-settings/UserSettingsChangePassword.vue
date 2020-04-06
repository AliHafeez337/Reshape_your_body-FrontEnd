<template>
  <vx-card no-shadow>

    <span class="text-danger text-sm" v-show="!isDisabled">The old and new passwords fields must not be empty and new and confirm passwords must match and old and new password fields must not match.</span>
    <br />
    <br />
    <span class="text-danger text-sm">{{ errors.first('oldpassword') }}</span>
    <vs-input 
      type="password"
      data-vv-validate-on="blur"
      v-validate="'required|min:6'"
      name="oldpassword"
      icon-no-border
      icon="icon-lock"
      icon-pack="feather"
      placeholder="Old Password"
      class="w-full mb-base" 
      label-placeholder="Old Password" 
      v-model="old_password" />
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>
    <vs-input 
      type="password"
      data-vv-validate-on="blur"
      v-validate="'required|min:6'"
      name="password"
      icon-no-border
      icon="icon-lock"
      icon-pack="feather"
      placeholder="New Password"
      class="w-full mb-base" 
      label-placeholder="New Password" 
      v-model="new_password" />
    <span class="text-danger text-sm">{{ errors.first('confirm_password') }}</span>
    <span class="text-danger text-sm" v-show="!isPasswordValid">The passwords must match.</span>
    <vs-input
      type="password"
      v-validate="'min:6'"
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
      
    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button 
        class="ml-4 mt-2" 
        type="border" 
        color="warning"
        @click="reset"
        :disabled="!isDisabled">Reset</vs-button>
    </div>
  </vx-card>
</template>

<script>
export default {
  data () {
    return {
      old_password: '',
      new_password: '',
      confirm_password: ''
    }
  },
  computed: {
    isDisabled () {
      return (this.old_password !== '' && this.new_password !== '' &&  this.old_password !== this.new_password &&  this.old_password !== this.confirm_password &&  this.new_password === this.confirm_password)
    },
    isPasswordValid () {
      return (this.new_password === this.confirm_password)
    },
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    reset () {
      const { old_password, new_password, confirm_password } = this
      this.$store.getters.getId.then(id => {      
        this.$store.dispatch('edit', { 
          oldpassword: old_password, 
          password: new_password,
          id: id
          }).then(() => {
          this.colorAlert = 'success'
          this.$vs.dialog({
            color: this.colorAlert,
            title: `Password changed successfully`,
            accept: this.acceptAlert
          })
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
      })
    }
  }
}
</script>
