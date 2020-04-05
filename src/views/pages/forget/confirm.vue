<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">

          <div class="vx-row no-gutter justify-center items-center">

            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                <img src="@/assets/images/pages/reset-password.png" alt="login" class="mx-auto">
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">

                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Password reset</h4>
                  <p>Please enter the code that was sent to the email, the email and the new password to be.</p>
                </div>

                <div>
                    <span class="text-danger text-sm" v-show="errors.has('digits')">{{ errors.first('digits') }}</span>
                    <vs-input 
                        v-validate="'digits:6'" 
                        label="Must be numeric and have the 6 number of digits." 
                        name="digits" 
                        v-model="code" 
                        icon-no-border
                        icon="icon-type"
                        icon-pack="feather"
                        label-placeholder="Code"
                        class="mt-5 w-full" />
                
                    <span class="text-danger text-sm">{{ errors.first('email') }}</span>
                    <vs-input
                        v-validate="'required|email'"
                        data-vv-validate-on="blur"
                        name="email"
                        icon-no-border
                        icon="icon icon-mail"
                        icon-pack="feather"
                        type="email"
                        label-placeholder="Email"
                        placeholder="Email"
                        v-model="email"
                        class="w-full mt-6" />
                 
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
                  <vs-button 
                    v-validate="'required|email'" 
                    placeholder="Your Email" 
                    name="email" 
                    class="float-left" 
                    @click.prevent="submitted"
                    :disabled="isDisabled()">Request a confirmation email</vs-button>

                  <br />
                  <br />
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
// import axios from 'axios'

export default {
  data () {
    return {
        code: '',
      password: '',
      confirm_password: '',
      email: '',
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },
  methods: {
    isEmailValid () {
      // return ((this.email === '') ? '' : (this.reg.test(this.email))? false : true)
      return !((this.email === '') ? '' : (this.reg.test(this.email)))
    },
    isDisabled () {
      return !(!this.errors.any() && this.code.length === 6 && this.reg.test(this.email) && this.password !== '' && this.confirm_password !== '')
    },
    submitted () {
      const { email, password, confirm_password, code } = this
      if (password === confirm_password){
        this.$store.dispatch('confirm', {
            email,
            code,
            password
            })
            .then(() => {
              this.$vs.notify({
                title: 'Success',
                text: 'Password updated successfully',
                color: 'success',
                iconPack: 'feather',
                position: 'top-center',
                icon:'icon-check'
              })
              this.$router.push('/pages/login')
            })
            .catch(e => {
                this.colorAlert = 'danger'
                this.$vs.dialog({
                color: this.colorAlert,
                title: `Unable to send reset your password`,
                text: `May be you have entered the wrong details...`,
                accept: this.acceptAlert
                })
            })
      }
    }
  },
  components: {
  }
}
</script>

<style lang="scss">
</style>
