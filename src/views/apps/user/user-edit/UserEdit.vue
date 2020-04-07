<!-- =========================================================================================
  File Name: UserEdit.vue
  Description: User Edit Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-user-edit">
    <vx-card v-if="user_data">

      <div slot="no-body" class="tabs-container px-6 pt-6">

        <vs-tabs v-model="activeTab" class="tab-action-btn-fill-conatiner">
          <vs-tab label="Account" icon-pack="feather" icon="icon-user">
            <div class="tab-text">
              <user-edit-tab-account class="mt-4" :data="user_data" />
            </div>
          </vs-tab>
        </vs-tabs>

      </div>

    </vx-card>
  </div>
</template>

<script>
import UserEditTabAccount     from './UserEditTabAccount.vue'
import axios from 'axios'

export default {
  components: {
    UserEditTabAccount,
  },
  data () {
    return {
      user_data: null,
      activeTab: 0
    }
  },
  watch: {
    activeTab () {
      this.fetch_user_data(this.$route.params.userId)
    }
  },
  methods: {
    fetch_user_data (userId) {
      console.log(userId)
      for(let index=0; index<this.$store.state.displayListUser.length; index++){
        if(this.$store.state.displayListUser[index]._id==userId){
          console.log(this.$store.state.displayListUser[index])
          return this.$store.state.displayListUser[index]
        }
      }
    }
  },
  created () {
    this.user_data=this.fetch_user_data(this.$route.params.userId)
  }
}

</script>
