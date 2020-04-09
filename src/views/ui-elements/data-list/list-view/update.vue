<template>
  <form-wizard
    color="rgba(var(--vs-primary), 1)"
    :title="null"
    :subtitle="null"
    finishButtonText="Submit"
    @on-complete="formSubmitted"
  >
    <tab-content title="Step 1" class="mb-5" :before-change="validateStep1">
      <!-- tab 1 content -->
      <div class="vx-row">
        <div class="vx-col md:w-1/2 w-full mt-5">
          <vs-input
            label="Enter Name"
            v-model="file.name"
            class="w-full"
            v-validate="'required'"
            name="name"
          />
          <span class="text-danger text-sm" v-show="errors.has('name')">{{
            errors.first("name")
          }}</span>
        </div>
        <div class="vx-col md:w-1/2 w-full mt-5">
          <vs-select
            v-model="file.category"
            class="w-full select-large"
            label="Please Choose Category"
            v-validate="'required'"
            name="category"
          >
            <vs-select-item
              :key="index"
              :value="item.value"
              :text="item.text"
              v-for="(item, index) in Category"
              class="w-full"
            />
          </vs-select>
          <span class="text-danger text-sm" v-show="errors.has('category')">{{
            errors.first("category")
          }}</span>
        </div>
        <div class="vx-col md:w-full w-full mt-5">
          <h3>Please Select Permission:</h3>
          <ul class="centerx">
            <div class="vx-row">
              <div class="vx-col md:w-1/3 w-full mt-5">
                <li>
                  <vs-checkbox v-model="file.userAllowed" vs-value="user"
                    >user</vs-checkbox
                  >
                </li>
              </div>
              <div class="vx-col md:w-1/3 w-full mt-5">
                <li>
                  <vs-checkbox v-model="file.userAllowed" vs-value="customer"
                    >customer</vs-checkbox
                  >
                </li>
              </div>
              <div class="vx-col md:w-1/3 w-full mt-5">
                <li>
                  <vs-checkbox v-model="file.userAllowed" vs-value="partner"
                    >partner</vs-checkbox
                  >
                </li>
              </div>
            </div>
          </ul>
        </div>
        <div class="vx-col md:w-full w-full mt-5">
          <vs-textarea
            counter="500"
            label="Description"
            :counter-danger.sync="counterDanger"
            v-model="file.description"
            height="120px"
            v-validate="'required'"
            name="description"
          />
        </div>
        <span class="text-danger text-sm" v-show="errors.has('description')">{{
          errors.first("description")
        }}</span>
      </div>
    </tab-content>

    <!-- tab 2 content -->
    <tab-content title="Step 2" class="mb-5">
      <div class="vx-row">
        <h3>
          Optional. Here you can add more files to single object!
        </h3>
      </div>
      <div class="vx-row">
        <div class="vx-col md:w-full w-full mt-5">
          <vs-input
            label="Enter Language"
            v-model="fileo.language"
            class="w-full"
          />
        </div>
        <div class="vx-col md:w-full w-full mt-5">
          <input
            type="file"
            name="file-2[]"
            id="file-2"
            class="inputfile inputfile-2"
            data-multiple-caption="{count} files selected"
            ref="file"
            multiple
            @click="javaScr()"
            v-on:change="handleFileUpload()"
          />
          <label for="file-2"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="17"
              viewBox="0 0 20 17"
            >
              <path
                d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"
              />
            </svg>
            <span>Choose a file&hellip;</span></label
          >
        </div>
      </div>
    </tab-content>

    <!-- tab 3 content -->
    <tab-content title="Step 3" class="mb-5">
      <div class="vx-row" vs-type="flex" vs-justify="center">
        <vs-row vs-align="center" vs-type="flex" vs-justify="center" vs-w="12">
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
            <h2>
              Click on submit button to save changes!
            </h2>
          </vs-col>
        </vs-row>
      </div>
    </tab-content>
  </form-wizard>
</template>
<style>
.js .inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.inputfile + label {
  max-width: 80%;
  font-size: 1.25rem;
  /* 20px */
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  padding: 0.625rem 1.25rem;
  /* 10px 20px */
}

.no-js .inputfile + label {
  display: none;
}

.inputfile:focus + label,
.inputfile.has-focus + label {
  outline: 1px dotted rgb(247, 0, 0);
  outline: -webkit-focus-ring-color auto 5px;
}

.inputfile + label svg {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  margin-top: -0.25em;
  /* 4px */
  margin-right: 0.25em;
  /* 4px */
}
/* style 2 */
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.inputfile-2 + label {
  color: #d3394c;
  border: 2px solid currentColor;
}

.inputfile-2:focus + label,
.inputfile-2.has-focus + label,
.inputfile-2 + label:hover {
  color: #321bb6;
}
</style>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import axios from "axios";

export default {
  data() {
    return {
      au: [],
      error: " ",
      textarea: "",
      counterDanger: false,
      textarea: "",
      eventName: "",
      alertMessages: "Success",
      objid: "",
      file: null,
      //   {
      //     category: "",
      //     name: "",
      //     description: "",
      //     userAllowed: ""
      //   },
      fileo: {
        language: "",
        doc: ""
      },
      Category: [
        { text: "The Concept ", value: "The Concept" },
        { text: "PM International", value: "PM International" },
        { text: "Sample Letters", value: "Sample Letters" },
        { text: "Business Documents", value: "Business Documents" }
      ],
      userPermission: [
        { text: "User", value: "user" },
        { text: "Partner", value: "partner" },
        { text: "Customer", value: "customer" },
        { text: "User+Partner", value: "user+partner" },
        { text: "User+Customer", value: "user+customer" },
        { text: "Partner+Customer", value: "partner+customer" }
      ]
    };
  },
  methods: {
    validateStep1() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll().then(result => {
          if (result) {
            resolve(true);
          } else {
            reject("correct all values");
          }
        });
      });
    },
    acceptAlert() {
      this.$router.push("/download");
    },
    formSubmitted() {
      let formData = new FormData();
      formData.append("file", this.fileo.doc);
      formData.append("language", this.fileo.language);
      formData.append("name", this.file.name);
      formData.append("category", this.file.category);
      formData.append("userAllowed", this.file.userAllowed);
      formData.append("description", this.file.description);

      console.log("form data is" + formData);
      var objidd = this.$route.params.id;
      var urll = "/uploads/update?prdid=" + objidd;
      return new Promise((resolve, reject) => {
        axios
          .put(urll, formData)
          .then(resp => {
            this.colorAlert = "success";
            this.alertMessage = "Successfully Submitted!";
            this.$vs.dialog({
              color: this.colorAlert,
              title: this.alertMessages,
              text: "Your form is successfully submitted!",
              accept: this.acceptAlert
            });

            resolve(resp);
          })
          .catch(err => {
            this.colorAlert = "danger";
            this.alertMessage = "An Error occured";
            this.$vs.dialog({
              color: this.colorAlert,
              title: this.alertMessage,
              accept: this.acceptAlert
            });
            reject(err);
          });
      });
      //alert("Form submitted!");
    },

    handleFileUpload() {
      this.fileo.doc = this.$refs.file.files[0];
      console.log("handle " + this.fileo.doc);
    },
    javaScr() {
      (function(e, t, n) {
        var r = e.querySelectorAll("html")[0];
        r.className = r.className.replace(/(^|\s)no-js(\s|$)/, "$1js$2");
      })(document, window, 0);

      ("use strict");

      (function(document, window, index) {
        var inputs = document.querySelectorAll(".inputfile");
        console.log("i am selected" + inputs);
        Array.prototype.forEach.call(inputs, function(input) {
          var label = input.nextElementSibling,
            labelVal = label.innerHTML;

          input.addEventListener("change", function(e) {
            var fileName = "";
            if (this.files && this.files.length > 1)
              fileName = (
                this.getAttribute("data-multiple-caption") || ""
              ).replace("{count}", this.files.length);
            else fileName = e.target.value.split("\\").pop();

            if (fileName) label.querySelector("span").innerHTML = fileName;
            else label.innerHTML = labelVal;
          });

          // Firefox bug fix
          input.addEventListener("focus", function() {
            input.classList.add("has-focus");
          });
          input.addEventListener("blur", function() {
            input.classList.remove("has-focus");
          });
        });
      })(document, window, 0);
    }
  },

  created() {
    var objidd = this.$route.params.id;
    return new Promise((resolve, reject) => {
      axios
        .get("/uploads/edit", {
          params: {
            objid: objidd
          }
        })
        .then(resp => {
          this.file = resp.data;
          var keys = Object.keys(resp.data);
          var rdd = resp.data;

          for (var i = 0; i < keys.length; i++) {
            var value = rdd[i];
          }
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  components: {
    FormWizard,
    TabContent
  }
};
</script>
