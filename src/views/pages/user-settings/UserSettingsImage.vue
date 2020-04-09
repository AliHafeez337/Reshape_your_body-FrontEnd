<template>
  <vx-card no-shadow>

    <!-- Img Row -->
    <div class="flex flex-wrap items-center mb-base">
      <vs-avatar :src="photo" size="70px" class="mr-4 mb-4" />
      <div>
        <vs-button
          v-if="!loading"
          size="md"
          variant="primary"
          @click="selectImage()"
          class="cursor">
          {{ uploadButtonTitle }}
        </vs-button>
        <input
          id="upload"
          ref="uploadInput"
          type="file"
          name="file"
          class="image-input"
          @change="updateUploadButton($event); insertImage()">
        &nbsp;
        <vs-button 
          type="border" 
          color="danger"
          @click="deleteImage()">Remove</vs-button>
        <p class="text-sm mt-2">Allowed are JPG, JPEG or PNG. Max size of 5MBs</p>
      </div>
    </div>

    <div
      class="add-button">
      <p
        v-if="loading"
        class="text-center w-75"
        style="word-wrap:break-word;">
        <strong>Uploading</strong>
        {{ loadingText }}
        {{ progress }}
      </p>
      <p
        v-if="err"
        class="text-center w-75"
        style="word-wrap:break-word;">
        <strong>Errmsg: </strong>
        {{ err }}
      </p>
      
      <!-- Avatar Col -->
      <div v-else class="vx-col" id="avatar-col">
      <br />
        <div class="img-container mb-4">
          <img :src="photo" class="rounded w-full" />
        </div>
      </div>
      
    </div>

    <br />
  </vx-card>
</template>

<script>
import axios from 'axios';

const uploadButtonTitle = 'Select image'

export default {
  components: {
  },
  data () {
    return {
        images: [],
        uploadButtonTitle: uploadButtonTitle,
        file: '',
        loadingText: '',
        progress: '',
        err: '',
        loading: false,
        selectedFile: '',
        photo: '',
    }
  },
  created () {
    this.changePhoto()
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    changePhoto() {
      this.photo = this.$store.state.photo 
    },
		selectImage () {
			this.$refs.uploadInput.click()
		},
		updateUploadButton (e) {
			const fileName = e.target.value.split('\\').pop()
			if (fileName) {
				this.loadingText = fileName
				this.loading = true
				this.err = ''
			}
		},
		insertImage () {
			axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
			this.file = this.$refs.uploadInput.files[0]
			let formData = new FormData()
      formData.append('file', this.file)
      // console.log(formData)
      this.$store.getters.getId.then(id => { 
        axios.patch(`/image/add`, formData
          , {params: {
              id
            },
            onUploadProgress: (uploadEvent) => {
              this.progress = 'Upload progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%'
          }}
          ).then(response => {
              setTimeout(() => {
              console.log(response.data.errmsg)
                if (response.data.errmsg === null || response.data.errmsg === undefined){
                  // this.$store.mutations.photoURL(response.photo)
                  localStorage.setItem('user-photo', response.data.photo)
                  this.$store.state.photoURL = response.data.photo
                  this.photo = response.data.photo
                  this.loading = false
                  this.$refs.uploadInput.value = undefined
                  // this.$refs.uploadInput = undefined
                }
                else{
				          this.err = response.data.errmsg
                  this.loading = false
                  this.photo = this.$store.state.photo
                  this.$refs.uploadInput.value = undefined
                  this.errors.push(e)
                }
              }, 900)
            })
            .catch(e => {
            })
      })
		},
		deleteImage () {
      this.$store.getters.getId.then(id => { 
        axios.patch(`/image/${id}`)
          .then(result => {
            localStorage.removeItem('user-photo')
            this.photo = require('@/assets/images/user/user.png')
          })
          .catch(e => {
            this.errors.push(e)
          })
      })
		}
  }
}
</script>

<style>
  #avatar-col {
    width: 15rem;
  }

	.image-input {
		position: absolute;
		top: 0;
		left: 0;
		width: 0px;
		height: 0px;
		overflow: hidden;
		opacity: 0;
	}

	.add-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 230px;
		background: #f2f2f3;
		background-size: cover;
		background-position: 50% 50%;
	}

	.remove-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 15px;
    	right: 15px;
		bottom: 0;
		background: rgba(0, 0, 0, 0.4);
		opacity: 0;
		transition: all 0.3s ease-in;
	}

	.remove-button:hover {
		opacity: 1;
	}
</style>
