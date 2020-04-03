<template>
  <div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo.id">

    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">&nbsp;{{ activeUserInfo.firstname }}&nbsp;{{ activeUserInfo.lastname }}</p>
      <small>&nbsp;{{ activeUserInfo.usertype }}</small>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

      <div class="con-img ml-3">
        <img v-if="activeUserInfo.photoURL" key="onlineImg" :src="activeUserInfo.photoURL" alt="user-img" width="40" height="40" class="rounded-full shadow-md cursor-pointer block" />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/pages/profile').catch(() => {})">
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Profile</span>
          </li>

          <vs-divider class="m-1" />

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout">
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
import 'firebase/auth'

export default {
  data () {
    return {

    }
  },
  computed: {
    activeUserInfo () {
      if (this.$store.state.tempUserObj.token !== undefined) {
        console.log(this.$store.state.tempUserObj)
        return this.$store.state.tempUserObj
      }
      else {
        console.log(this.$store.state.AppActiveUser)
        return this.$store.state.AppActiveUser
      }
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => {
        // This is just for demo Purpose. If user clicks on logout -> redirect
        this.$router.push('/pages/login').catch(() => {})
      })
    }
  }
}
</script>
