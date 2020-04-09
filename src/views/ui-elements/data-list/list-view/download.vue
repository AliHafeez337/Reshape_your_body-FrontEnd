<template>
  <div class>
    <div v-if="activeUserInfo.usertype === 'admin'" class="grid-layout-container alignment-block">
      <vs-row vs-align="center" vs-type="flex" vs-justify="center" vs-w="12">
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4    ">
          <vs-button color="danger" type="gradient" @click="goToUpload">Upload</vs-button>
        </vs-col>
      </vs-row>
      <br />
      <br />
    </div>
    <!-- <p v-if="error">{{error}}</p>
    <div
      v-for="(downloads,index) in downloads"
      v-bind:item="downloads"
      v-bind:index="index"
      v-bind:key="downloads._id"
    >
      <p>{{downloads.name}}</p>
      <div
        v-for="(downloadss,index) in downloads.file"
        v-bind:item="downloadss"
        v-bind:index="index"
        v-bind:key="downloadss._id"
      >
        <h3>{{downloadss.language}}</h3>
      </div>
    </div>-->

    <vs-tabs alignment="fixed" class="fluid">
      <vs-tab label="The Concept" @click="getCat('The Concept')">
        <!-- Cards -->

        <vs-row>
          <vs-col
            class="vx-col lg:w-1/3 sm:w-1/2 mb-base"
            style="padding-right:20px;"
            v-for="(downloads, index) in downloads"
            v-bind:item="downloads"
            v-bind:index="index"
            v-bind:key="downloads._id"
          >
            <div>
              <div
                class="vx-card p-2"
                v-if="
                  activeUserInfo.usertype === downloads.userAllowed[0] ||
                    activeUserInfo.usertype === downloads.userAllowed[1] ||
                    activeUserInfo.usertype === downloads.userAllowed[2] ||
                    activeUserInfo.usertype === 'admin'
                "
              >
                <!---->
                <div class="vx-card__collapsible-content vs-con-loading__container">
                  <div class="vx-card__body">
                    <div class="text-center">
                      <vs-button
                        color="warning"
                        type="flat"
                        v-if="activeUserInfo.usertype === 'admin'"
                        @click="goToEdit(downloads._id)"
                      >Go To Edit</vs-button>
                      <h4>{{ downloads.name }}</h4>
                      <p class="text-grey">{{ downloads.description }}</p>
                    </div>
                    <!-- Created at here -->
                    <div class="text-center">
                      <span>
                        <p class="text-s">{{ downloads.createdAt | formatDate }}</p>
                        <small class="text-black font-bold">CreatedAt</small>
                      </span>
                    </div>
                    <!-- Dropdown Button 1 -->
                    <div class="examplex">
                      <vs-dropdown vs-custom-content vs-trigger-click>
                        <a class="a-icon" href.prevent>
                          <button
                            type="button"
                            name="button"
                            class="vs-component vs-button w-full vs-button-null vs-button-gradient btnx"
                            style="background: linear-gradient(30deg, rgb(115, 103, 240) 0%, rgb(206, 159, 252) 100%);"
                          >
                            <!---->
                            <!---->
                            <span class="vs-button-text vs-button--text">Click Here to Download</span>
                            <span
                              class="vs-button-linex"
                              style="top: auto; bottom: -2px; background: rgb(115, 103, 240); left: 50%; transform: translate(-50%);"
                            ></span>
                          </button>
                        </a>

                        <vs-dropdown-menu class="loginx">
                          <h3>Select Your Language</h3>

                          <vs-dropdown-item
                            v-for="(downloadss, index) in downloads.file"
                            v-bind:item="downloadss"
                            v-bind:index="index"
                            v-bind:key="downloadss._id"
                          >
                            <a v-bind:href="downloadss.file">
                              {{
                              downloadss.language
                              }}
                            </a>
                          </vs-dropdown-item>
                        </vs-dropdown-menu>
                      </vs-dropdown>
                    </div>
                  </div>
                  <!---->
                </div>
              </div>
              <vx-card
                v-else
                title="Sorry!"
                title-color="#fff"
                card-background="danger"
                content-color="#fff"
                style="height:180px"
              >
                <vs-row vs-align="center" vs-type="flex" vs-justify="center" vs-w="12">
                  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4    ">
                    <img
                      src="../../../../assets/images/file-icons/locked-data.png"
                      style="width:60px;height:50px"
                    />
                  </vs-col>
                </vs-row>

                <p class="mb-3">
                  You are
                  <strong>Not Allowed</strong> to view this. Please
                  contact admin!
                </p>
              </vx-card>
            </div>
          </vs-col>
        </vs-row>
      </vs-tab>
      <vs-tab label="PM International" @click="getCat('PM International')">
        <!-- Cards -->
        <vs-row>
          <vs-col
            class="vx-col lg:w-1/3 sm:w-1/2 mb-base"
            style="padding-right:20px;"
            v-for="(downloadd, index) in downloads"
            v-bind:item="downloadd"
            v-bind:index="index"
            v-bind:key="downloadd._id"
          >
            <div
              class="vx-card p-2"
              v-if="
                 activeUserInfo.usertype === downloadd.userAllowed[0] ||
                    activeUserInfo.usertype === downloadd.userAllowed[1] ||
                    activeUserInfo.usertype === downloadd.userAllowed[2] ||
                  activeUserInfo.usertype === 'admin'
              "
            >
              <!---->
              <div class="vx-card__collapsible-content vs-con-loading__container">
                <div class="vx-card__body">
                  <div class="text-center">
                    <vs-button
                      color="warning"
                      type="flat"
                      v-if="activeUserInfo.usertype === 'admin'"
                      @click="goToEdit(downloadd._id)"
                    >Go To Edit</vs-button>
                    <h4>{{ downloadd.name }}</h4>
                    <p class="text-grey">{{ downloadd.description }}</p>
                  </div>
                  <!-- Created at here -->
                  <div class="text-center">
                    <span>
                      <p class="text-s">{{ downloadd.createdAt | formatDate }}</p>
                      <small class="text-black font-bold">CreatedAt</small>
                    </span>
                  </div>

                  <div class="examplex">
                    <vs-dropdown vs-custom-content vs-trigger-click>
                      <a class="a-icon" href.prevent>
                        <button
                          type="button"
                          name="button"
                          class="vs-component vs-button w-full vs-button-null vs-button-gradient btnx"
                          style="background: linear-gradient(30deg, rgb(115, 103, 240) 0%, rgb(206, 159, 252) 100%);"
                        >
                          <!---->
                          <!---->
                          <span class="vs-button-text vs-button--text">Click Here to Download</span>
                          <span
                            class="vs-button-linex"
                            style="top: auto; bottom: -2px; background: rgb(115, 103, 240); left: 50%; transform: translate(-50%);"
                          ></span>
                        </button>
                      </a>

                      <vs-dropdown-menu class="loginx">
                        <h3>Select Your Language</h3>

                        <vs-dropdown-item
                          v-for="(downloadss, index) in downloadd.file"
                          v-bind:item="downloadss"
                          v-bind:index="index"
                          v-bind:key="downloadss._id"
                        >
                          <a v-bind:href="downloadss.file">
                            {{
                            downloadss.language
                            }}
                          </a>
                        </vs-dropdown-item>
                      </vs-dropdown-menu>
                    </vs-dropdown>
                  </div>
                </div>
                <!---->
              </div>
            </div>
            <vx-card
              v-else
              title="Sorry!"
              title-color="#fff"
              card-background="danger"
              content-color="#fff"
              style="height:180px"
            >
              <vs-row vs-align="center" vs-type="flex" vs-justify="center" vs-w="12">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4    ">
                  <img
                    src="../../../../assets/images/file-icons/locked-data.png"
                    style="width:60px;height:50px"
                  />
                </vs-col>
              </vs-row>

              <p class="mb-3">
                You are
                <strong>Not Allowed</strong> to view this. Please
                contact admin!
              </p>
            </vx-card>
          </vs-col>
        </vs-row>
      </vs-tab>
      <vs-tab label="Sample Letters " @click="getCat('Sample Letters')">
        <!-- Cards -->
        <vs-row>
          <vs-col
            class="vx-col lg:w-1/3 sm:w-1/2 mb-base"
            style="padding-right:20px;"
            v-for="(downloads, index) in downloads"
            v-bind:item="downloads"
            v-bind:index="index"
            v-bind:key="downloads._id"
          >
            <div
              class="vx-card p-2"
              v-if="
                  activeUserInfo.usertype === downloads.userAllowed[0] ||
                    activeUserInfo.usertype === downloads.userAllowed[1] ||
                    activeUserInfo.usertype === downloads.userAllowed[2] ||
                  activeUserInfo.usertype === 'admin'
              "
            >
              <!---->
              <div class="vx-card__collapsible-content vs-con-loading__container">
                <div class="vx-card__body">
                  <div class="text-center">
                    <vs-button
                      color="warning"
                      type="flat"
                      v-if="activeUserInfo.usertype === 'admin'"
                      @click="goToEdit(downloads._id)"
                    >Go To Edit</vs-button>
                    <h4>{{ downloads.name }}</h4>
                    <p class="text-grey">{{ downloads.description }}</p>
                  </div>
                  <!-- Created at here -->
                  <div class="text-center">
                    <span>
                      <p class="text-s">{{ downloads.createdAt | formatDate }}</p>
                      <small class="text-black font-bold">CreatedAt</small>
                    </span>
                  </div>
                  <div class="examplex">
                    <vs-dropdown vs-custom-content vs-trigger-click>
                      <a class="a-icon" href.prevent>
                        <button
                          type="button"
                          name="button"
                          class="vs-component vs-button w-full vs-button-null vs-button-gradient btnx"
                          style="background: linear-gradient(30deg, rgb(115, 103, 240) 0%, rgb(206, 159, 252) 100%);"
                        >
                          <!---->
                          <!---->
                          <span class="vs-button-text vs-button--text">Click Here to Download</span>
                          <span
                            class="vs-button-linex"
                            style="top: auto; bottom: -2px; background: rgb(115, 103, 240); left: 50%; transform: translate(-50%);"
                          ></span>
                        </button>
                      </a>

                      <vs-dropdown-menu class="loginx">
                        <h3>Select Your Language</h3>

                        <vs-dropdown-item
                          v-for="(downloadss, index) in downloads.file"
                          v-bind:item="downloadss"
                          v-bind:index="index"
                          v-bind:key="downloadss._id"
                        >
                          <a v-bind:href="downloadss.file">
                            {{
                            downloadss.language
                            }}
                          </a>
                        </vs-dropdown-item>
                      </vs-dropdown-menu>
                    </vs-dropdown>
                  </div>
                </div>
                <!---->
              </div>
            </div>
            <vx-card
              v-else
              title="Sorry!"
              title-color="#fff"
              card-background="danger"
              content-color="#fff"
              style="height:180px"
            >
              <vs-row vs-align="center" vs-type="flex" vs-justify="center" vs-w="12">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4    ">
                  <img
                    src="../../../../assets/images/file-icons/locked-data.png"
                    style="width:60px;height:50px"
                  />
                </vs-col>
              </vs-row>

              <p class="mb-3">
                You are
                <strong>Not Allowed</strong> to view this. Please
                contact admin!
              </p>
            </vx-card>
          </vs-col>
        </vs-row>
      </vs-tab>
      <vs-tab label="Business Documents" @click="getCat('Business Documents')">
        <!-- Cards -->
        <vs-row>
          <vs-col
            class="vx-col lg:w-1/3 sm:w-1/2 mb-base"
            style="padding-right:20px;"
            v-for="(downloads, index) in downloads"
            v-bind:item="downloads"
            v-bind:index="index"
            v-bind:key="downloads._id"
          >
            <div
              class="vx-card p-2"
              v-if="
                activeUserInfo.usertype === downloads.userAllowed[0] ||
                    activeUserInfo.usertype === downloads.userAllowed[1] ||
                    activeUserInfo.usertype === downloads.userAllowed[2] ||
                  activeUserInfo.usertype === 'admin'
              "
            >
              <!---->
              <div class="vx-card__collapsible-content vs-con-loading__container">
                <div class="vx-card__body">
                  <div class="text-center">
                    <vs-button
                      color="warning"
                      type="flat"
                      v-if="activeUserInfo.usertype === 'admin'"
                      @click="goToEdit(downloads._id)"
                    >Go To Edit</vs-button>
                    <h4>{{ downloads.name }}</h4>
                    <p class="text-grey">{{ downloads.description }}</p>
                  </div>
                  <!-- Created at here -->
                  <div class="text-center">
                    <span>
                      <p class="text-s">{{ downloads.createdAt | formatDate }}</p>
                      <small class="text-black font-bold">CreatedAt</small>
                    </span>
                  </div>
                  <div class="examplex">
                    <vs-dropdown vs-custom-content vs-trigger-click>
                      <a class="a-icon" href.prevent>
                        <button
                          type="button"
                          name="button"
                          class="vs-component vs-button w-full vs-button-null vs-button-gradient btnx"
                          style="background: linear-gradient(30deg, rgb(115, 103, 240) 0%, rgb(206, 159, 252) 100%);"
                        >
                          <!---->
                          <!---->
                          <span class="vs-button-text vs-button--text">Click Here to Download</span>
                          <span
                            class="vs-button-linex"
                            style="top: auto; bottom: -2px; background: rgb(115, 103, 240); left: 50%; transform: translate(-50%);"
                          ></span>
                        </button>
                      </a>

                      <vs-dropdown-menu class="loginx">
                        <h3>Select Your Language</h3>

                        <vs-dropdown-item
                          v-for="(downloadss, index) in downloads.file"
                          v-bind:item="downloadss"
                          v-bind:index="index"
                          v-bind:key="downloadss._id"
                        >
                          <a v-bind:href="downloadss.file">
                            {{
                            downloadss.language
                            }}
                          </a>
                        </vs-dropdown-item>
                      </vs-dropdown-menu>
                    </vs-dropdown>
                  </div>
                </div>
                <!---->
              </div>
            </div>
            <vx-card
              v-else
              title="Sorry!"
              title-color="#fff"
              card-background="danger"
              content-color="#fff"
              style="height:180px"
            >
              <vs-row vs-align="center" vs-type="flex" vs-justify="center" vs-w="12">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4    ">
                  <img
                    src="../../../../assets/images/file-icons/locked-data.png"
                    style="width:60px;height:50px"
                  />
                </vs-col>
              </vs-row>

              <p class="mb-3">
                You are
                <strong>Not Allowed</strong> to view this. Please
                contact admin!
              </p>
            </vx-card>
          </vs-col>
        </vs-row>
      </vs-tab>
    </vs-tabs>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>
<style lang="stylus">
.examplex {
  display: flex;
  align-items: center;
  justify-content: center;

  .a-icon {
    outline: none;
    text-decoration: none !important;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 18px;
    }
  }
}

.vs-dropdown-menu {
  .con-input {
    margin-bottom: 20px;
  }
}

.loginx {
  h3 {
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 5px;
    font-size: 15px;
  }

  p {
    max-width: 200px;
    font-size: 11px;
    padding: 5px;
  }
}
</style>

<script>
import axios from "axios";
import moment from "moment";
import Vue from "vue";

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY");
  }
});
export default {
  name: "downloads",
  data() {
    return {
      downloads: [],
      au: [],
      error: " "
    };
  },

  computed: {
    activeUserInfo() {
      if (this.$store.state.tempUserObj.token !== undefined) {
        var obj = {
          id: this.$store.state.tempUserObj.id,
          firstname: this.$store.state.tempUserObj.firstname,
          lastname: this.$store.state.tempUserObj.lastname,
          about: this.$store.state.tempUserObj.about,
          photoURL:
            this.$store.state.tempUserObj.photoURL === undefined
              ? require("@/assets/images/user/user.png")
              : this.$store.state.AppActiveUser.photoURL,
          usertype: this.$store.state.tempUserObj.usertype,
          email: this.$store.state.tempUserObj.email
        };
        console.log(obj);
        return obj;
      } else {
        var obj = {
          id: this.$store.state.AppActiveUser.id,
          firstname: this.$store.state.AppActiveUser.firstname,
          lastname: this.$store.state.AppActiveUser.lastname,
          about: this.$store.state.AppActiveUser.about,
          photoURL:
            this.$store.state.AppActiveUser.photoURL === "undefined"
              ? require("@/assets/images/user/user.png")
              : this.$store.state.AppActiveUser.photoURL,
          usertype: this.$store.state.AppActiveUser.usertype,
          email: this.$store.state.AppActiveUser.email
        };
        console.log(obj);
        return obj;
      }
    }
  },
  methods: {
    goToUpload() {
      this.$router.push("/upload");
    },
    goToEdit(idd) {
      console.log("I am in edit" + idd);
      this.$router.push({ name: "file-update", params: { id: idd } });
    },
    getAuth() {},
    getCat(cat) {
      console.log(cat);
      return new Promise((resolve, reject) => {
        axios
          .get("/downloads/", {
            params: {
              category: cat
            }
          })
          .then(resp => {
            this.downloads = resp.data;
            // var keys = Object.keys(resp.data);
            // var rdd = resp.data;
            resolve(resp);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    }
  },

  created() {
    return new Promise((resolve, reject) => {
      axios
        .get("/downloads/", {
          params: {
            category: "The Concept"
          }
        })
        .then(resp => {
          this.downloads = resp.data;
          var keys = Object.keys(resp.data);
          var rdd = resp.data;
          // for (var i = 0; i < keys.length; i++) {
          //   var value = rdd[i];
          //   var ua = value.userAllowed;
          // }
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }
};
</script>
