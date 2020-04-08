<template>
    <div v-if="activeUserInfo.id!==this.params.data._id" :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
      <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
      <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CellRendererActions',
  data(){
    return{
      sData:{
        id:''
      }
    }
  },
  computed: {
    activeUserInfo () {
      if (this.$store.state.tempUserObj.token !== undefined) {
        var obj = {
          id: this.$store.state.tempUserObj.id,
          firstname: this.$store.state.tempUserObj.firstname,
          lastname: this.$store.state.tempUserObj.lastname,
          about: this.$store.state.tempUserObj.about,
          photoURL: this.$store.state.tempUserObj.photoURL === undefined ? require('@/assets/images/user/user.png') : this.$store.state.AppActiveUser.photoURL,
          usertype: this.$store.state.tempUserObj.usertype,
          email: this.$store.state.tempUserObj.email
        }
        return obj
      }
      else {
        var obj = {
          id: this.$store.state.AppActiveUser.id,
          firstname: this.$store.state.AppActiveUser.firstname,
          lastname: this.$store.state.AppActiveUser.lastname,
          about: this.$store.state.AppActiveUser.about,
          photoURL: this.$store.state.AppActiveUser.photoURL === "undefined" ? require('@/assets/images/user/user.png') : this.$store.state.AppActiveUser.photoURL,
          usertype: this.$store.state.AppActiveUser.usertype,
          email: this.$store.state.AppActiveUser.email
        }
        return obj
      }
    }
  },
  methods: {
    editRecord () {
      this.$router.push(`/apps/user/user-edit/${this.params.data._id}`).catch(() => {})
    },
    // "${this.params.data.firstname}"
    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm Delete',
        text: 'You are about to delete this User' ,
        accept: this.deleteRecord,
        acceptText: 'Delete'
      })
    },
    deleteRecord () {
      this.sData.id=this.params.data._id
      return new Promise((resolve, reject) => {
        axios.delete('/user/delete',{
          data:this.sData
        }).then(resp => {
          this.removeFromStae(this.params.data._id)
          resolve(resp)
        }).catch(err => {
            reject(err)
        })
      });

    },
    removeFromStae(id){
      console.log(id)
      this.$store.dispatch('delUserInList',id).then(()=>{
        this.showDeleteSuccess()
      }).catch(err=>{
        console.error(err)
      })
    },
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'success',
        title: 'User Deleted',
        text: 'The selected user was successfully deleted'
      })
    }
  }
}
</script>
