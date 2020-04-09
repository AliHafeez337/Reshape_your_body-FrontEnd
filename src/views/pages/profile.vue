<template>
    <div id="page-user-view">

    <vs-alert color="danger" title="User Not Found" :active.sync="user_not_found">
      <span>User record with id: {{ $route.params.userId }} not found. </span>
      <span>
        <span>Check </span><router-link :to="{name:'page-user-list'}" class="text-inherit underline">All Users</router-link>
      </span>
    </vs-alert>

    <div id="user-data" v-if="user_data">

      <vx-card title="Account" class="mb-base">

        <!-- Avatar -->
        <div class="vx-row">

          <!-- Avatar Col -->
          <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img :src="user_data.avatar" class="rounded w-full" />
            </div>
          </div>

          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <div class="vx-row">
              <div class="vx-col flex-1" id="account-info-col-1">
                <table>
                  <tr>
                    <td class="font-semibold">Name</td>
                    <td>{{ user_data.name }}</td>
                  </tr>
                  <tr>
                    <td class="font-semibold">Role</td>
                    <td>{{ user_data.role }}</td>
                  </tr>
                </table>
              </div>
              <div class="vx-col flex-1" id="account-info-col-1">
                <vs-button 
                  icon-pack="feather" 
                  icon="icon-edit" 
                  class="mr-4 editBtn" 
                  :to="{name: 'page-user-settings'}"
                  >Edit</vs-button>
              </div>
            </div>
            <div class="vx-row">
              <div class="vx-col flex-1" id="account-info-col-1">
                <table>
                  <tr>
                    <td class="font-semibold">Email</td>
                    <td>{{ user_data.email }}</td>
                  </tr>
                  <tr>
                    <td class="font-semibold">Mobile</td>
                    <td>{{ user_data.mobile }}</td>
                  </tr>
                  <tr>
                    <td class="font-semibold">Birth Date</td>
                    <td>{{ user_data.dob }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <!-- /Information - Col 1 -->

          <!-- /Information - Col 2 -->
          <!-- <div class="vx-col w-full flex" id="account-manage-buttons">
            <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: 'app-user-edit', params: { userId: $route.params.userId }}">Edit</vs-button>
            <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash" @click="confirmDeleteRecord">Delete</vs-button>
          </div> -->

        </div>

      </vx-card>

      <!-- <vx-card title="Account" class="mb-base">

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="12" vs-sm="12" vs-xs="12" >
            <vs-row>
              <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="3" vs-sm="4" vs-xs="6" >
                <div class="img-container mb-4">
                  <img :src="user_data.avatar" class="rounded w-full" />
                </div>
              </vs-col>
              <vs-col vs-type="flex" vs-offset="1" vs-justify="center" vs-align="center" vs-lg="8" vs-sm="11" vs-xs="11" >
                <vs-row>
                  <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-lg="9" vs-sm="9" vs-xs="9" >
                    <table>
                      <tr>
                        <td class="font-semibold">Name</td>
                        <td>{{ user_data.name }}</td>
                      </tr>
                      <tr>
                        <td class="font-semibold">Role</td>
                        <td>{{ user_data.role }}</td>
                      </tr>
                    </table>
                  </vs-col>
                  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="2" vs-sm="2" vs-xs="2" >
                    <vs-button icon-pack="feather" icon="icon-edit" class="mr-4 editBtn" :to="{name: 'app-user-edit', params: { userId: $route.params.userId }}">Edit</vs-button>
                  </vs-col>
                  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="9" vs-sm="9" vs-xs="9" >
                    <table>
                      <tr>
                        <td class="font-semibold">Email</td>
                        <td>{{ user_data.email }}</td>
                      </tr>
                      <tr>
                        <td class="font-semibold">Mobile</td>
                        <td>{{ user_data.mobile }}</td>
                      </tr>
                      <tr>
                        <td class="font-semibold">Birth Date</td>
                        <td>{{ user_data.dob }}</td>
                      </tr>
                    </table>
                  </vs-col>
                  <vs-col vs-type="flex" vs-offset="1" vs-justify="center" vs-align="center" vs-lg="1" vs-sm="1" vs-xs="1" >
                  </vs-col>
                </vs-row>
              </vs-col>
            </vs-row>
          </vs-col>
        </vs-row>
        
          <div class="vx-col" id="avatar-col">
          </div>


          <div class="vx-col flex-1" id="account-info-col-1">
            <div class="vx-row">
              <div class="vx-col flex-1" id="account-info-col-1">
              </div>
              <div class="vx-col flex-1" id="account-info-col-1">
              </div>
            </div>
            <div class="vx-row">
              <div class="vx-col flex-1" id="account-info-col-1">
              </div>
            </div>
          </div>


      </vx-card> -->



      <div class="vx-row">
        <div class="vx-col lg:w-1/2 w-full">
          <vx-card title="Information" class="mb-base">
            <table>
              <tr>
                <td class="font-semibold">Address 1</td>
                <td>{{ user_data.address1 }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Address 2</td>
                <td>{{ user_data.address2 }}</td>
              </tr>
              <tr>
                <td class="font-semibold">City</td>
                <td>{{ user_data.city }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Country</td>
                <td>{{ user_data.country }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Postal</td>
                <td>{{ user_data.postal }}</td>
              </tr>
            </table>
          </vx-card>
        </div>
        <div class="vx-col lg:w-1/2 w-full">
          <vx-card title="Languages" class="mb-base">
            <vs-list>
              <vs-list-item 
              v-for="(item, index) in user_data.languages_known" 
              :key="index"
               icon="check"> {{item}}
              </vs-list-item>
            </vs-list>
          </vx-card>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'

export default {
  data () {
    return {
      user_data: null,
      user_dataTemp: {
        // id: '',
        // avatar : '',
        // email : '',
        // name: '',
        // firstname : '',
        // lastname: '',
        // dob : '',
        // role: '',
        // is_verified: '',
        // country: '',
        // mobile : '',
        // languages_known : '',
        // address1: '',
        // address2: '',
        // city: '',
        // postal: ''
      },
      user_not_found: false,
      email: '',
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },
  computed: {
    userAddress () {
      let str = ''
      for (const field in this.user_data.location) {
        str += `${field  } `
      }
      return str
    }
  },
  methods: {
    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm Delete',
        text: `You are about to delete "${this.user_data.username}"`,
        accept: this.deleteRecord,
        acceptText: 'Delete'
      })
    },
    deleteRecord () {
      /* Below two lines are just for demo purpose */
      this.$router.push({name:'app-user-list'})
      this.showDeleteSuccess()

      /* UnComment below lines for enabling true flow if deleting user */
      // this.$store.dispatch("userManagement/removeRecord", this.user_data.id)
      //   .then(()   => { this.$router.push({name:'app-user-list'}); this.showDeleteSuccess() })
      //   .catch(err => { console.error(err)       })
    },
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'success',
        title: 'User Deleted',
        text: 'The selected user was successfully deleted'
      })
    },
    isEmailValid () {
      return !((this.email === '') ? '' : (this.reg.test(this.email)))
    },
    isDisabled () {
      return !(this.reg.test(this.email))
    },
    submitted () {
    }
  },
  created () {
    // Register Module UserManagement Module
    // if (!moduleUserManagement.isRegistered) {
    //   this.$store.registerModule('userManagement', moduleUserManagement)
    //   moduleUserManagement.isRegistered = true
    // }

    // const userId = this.$route.params.userId
    this.$store.dispatch('me')
      .then(res => { 
        var name = res.data.firstname+' '+res.data.lastname
        // console.log(new Date(res.data.birthdate))
        // this.user_data = res.data
        this.user_dataTemp.id = res.data._id,
        this.user_dataTemp.avatar = res.data.photo,
        this.user_dataTemp.email = res.data.email, 
        this.user_dataTemp.name = name, 
        this.user_dataTemp.firstname = res.data.firstname, 
        this.user_dataTemp.lastname = res.data.lastname, 
        this.user_dataTemp.dob = new Date(res.data.birthdate), 
        this.user_dataTemp.role = res.data.usertype, 
        this.user_dataTemp.is_verified = true, 
        this.user_dataTemp.country = res.data.country, 
        this.user_dataTemp.mobile = res.data.phone, 
        this.user_dataTemp.languages_known = res.data.languages, 
        this.user_dataTemp.address1 = res.data.address1, 
        this.user_dataTemp.address2 = res.data.address2, 
        this.user_dataTemp.city = res.data.city, 
        this.user_dataTemp.postal = res.data.postal
        this.user_data = this.user_dataTemp
        // if (this.user_data.avatar === undefined){
        console.log(this.user_data)
        if (this.user_data.avatar === undefined || this.user_data.avatar === null){
          this.user_data.avatar = require('@/assets/images/user/user.png')
        }
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 404) {
          this.user_not_found = true
          return
        }
        console.error(err) 
      })
  },
  components: {
  }
}
</script>

<style lang="scss">
.editBtn {
  margin-right: 0;
  margin-left:auto;
}

#avatar-col {
  width: 13rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: .8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width:370px) {
          display: block;
        }
      }
    }
  }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }


@media screen and (min-width:1201px) and (max-width:1211px),
only screen and (min-width:636px) and (max-width:991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }

}
</style>
