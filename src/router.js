/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from "vue";
import Router from "vue-router";
import auth from "@/auth/authService";

import firebase from "firebase/app";
import state from "./store/state";
import "firebase/auth";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    };
  },
  routes: [
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: "",
      component: () => import("./layouts/main/Main.vue"),
      beforeEnter(to, from, next) {
        if (state.token) {
          next();
        } else {
          next("/pages/login");
        }
      },
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: "/",
          redirect: "/pages/faq"
        },

        // =============================================================================
        // Application Routes
        // =============================================================================

        /*
                  Below route is for demo purpose
                  You can use this route in your app
                    {
                        path: '/apps/eCommerce/item/',
                        name: 'ecommerce-item-detail-view',
                        redirect: '/apps/eCommerce/shop',
                    }
                */

        {
          path: "/pages/profile",
          name: "pages-profile",
          component: () => import("@/views/pages/profile.vue"),
          meta: {
            rule: "editor"
          },
          beforeEnter(to, from, next) {
            if (state.token) {
              next();
            } else {
              next("/pages/login");
            }
          }
        },
        {
          path: "/apps/user/user-list",
          name: "app-user-list",
          component: () => import("@/views/apps/user/user-list/UserList.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "User"
              },
              {
                title: "List",
                active: true
              },
              {
                title: "Register"
              }
            ],
            pageTitle: "User List",
            rule: "editor"
          }
        },
        {
          path: "/apps/user/user-register",
          name: "app-user-register",
          component: () =>
            import("@/views/apps/user/user-register/register.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "User"
              },
              {
                title: "List"
              },
              {
                title: "Register",
                active: true
              }
            ],
            pageTitle: "User Register",
            rule: "editor"
          }
        },
        {
          path: "/apps/user/user-edit/:userId",
          name: "app-user-edit",
          component: () => import("@/views/apps/user/user-edit/UserEdit.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "User"
              },
              {
                title: "Edit",
                active: true
              }
            ],
            pageTitle: "User Edit",
            rule: "editor"
          }
        },

        // =============================================================================
        // UI ELEMENTS
        // =============================================================================
        {
          path: "/key/list-view",
          name: "data-list-list-view",
          component: () =>
            import("@/views/ui-elements/data-list/list-view/Key.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Keys",
                active: true
              }
            ],
            pageTitle: "List View",
            rule: "editor"
          }
        },
        {
          path: "/download",
          name: "file-download",
          component: () =>
            import("@/views/ui-elements/data-list/list-view/download.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Downloads",
                active: true
              }
            ],
            pageTitle: "Downloads",
            rule: "editor"
          }
        },
        {
          path: "/upload",
          name: "file-upload",
          component: () =>
            import("@/views/ui-elements/data-list/list-view/upload.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Upload",
                active: true
              }
            ],
            pageTitle: "Upload",
            rule: "editor"
          }
        },

        {
          path: "/update/:id",
          name: "file-update",
          component: () =>
            import("@/views/ui-elements/data-list/list-view/update.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Update",
                active: true
              }
            ],
            pageTitle: "Update",
            rule: "editor"
          }
        },

        {
          path: "/ui-elements/grid/vuesax",
          name: "grid-vuesax",
          component: () =>
            import("@/views/ui-elements/grid/vuesax/GridVuesax.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Grid"
              },
              {
                title: "Vuesax",
                active: true
              }
            ],
            pageTitle: "Grid",
            rule: "editor"
          }
        },
        {
          path: "/ui-elements/grid/tailwind",
          name: "grid-tailwind",
          component: () =>
            import("@/views/ui-elements/grid/tailwind/GridTailwind.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Grid"
              },
              {
                title: "Tailwind",
                active: true
              }
            ],
            pageTitle: "Tailwind Grid",
            rule: "editor"
          }
        },
        // =============================================================================
        // COMPONENT ROUTES
        // =============================================================================

        // =============================================================================
        // FORMS
        // =============================================================================
        // =============================================================================
        // FORM ELEMENTS
        // =============================================================================
        {
          path: "/forms/form-elements/select",
          name: "form-element-select",
          component: () =>
            import("./views/forms/form-elements/select/Select.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Form Elements"
              },
              {
                title: "Select",
                active: true
              }
            ],
            pageTitle: "Select",
            rule: "editor"
          }
        },
        {
          path: "/forms/form-elements/switch",
          name: "form-element-switch",
          component: () =>
            import("./views/forms/form-elements/switch/Switch.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Form Elements"
              },
              {
                title: "Switch",
                active: true
              }
            ],
            pageTitle: "Switch",
            rule: "editor"
          }
        },
        {
          path: "/forms/form-elements/checkbox",
          name: "form-element-checkbox",
          component: () =>
            import("./views/forms/form-elements/checkbox/Checkbox.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Form Elements"
              },
              {
                title: "Checkbox",
                active: true
              }
            ],
            pageTitle: "Checkbox",
            rule: "editor"
          }
        },
        {
          path: "/forms/form-elements/radio",
          name: "form-element-radio",
          component: () =>
            import("./views/forms/form-elements/radio/Radio.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Form Elements"
              },
              {
                title: "Radio",
                active: true
              }
            ],
            pageTitle: "Radio",
            rule: "editor"
          }
        },
        {
          path: "/forms/form-elements/input",
          name: "form-element-input",
          component: () =>
            import("./views/forms/form-elements/input/Input.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Form Elements"
              },
              {
                title: "Input",
                active: true
              }
            ],
            pageTitle: "Input",
            rule: "editor"
          }
        },
        {
          path: "/forms/form-elements/number-input",
          name: "form-element-number-input",
          component: () =>
            import("./views/forms/form-elements/number-input/NumberInput.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Form Elements"
              },
              {
                title: "Number Input",
                active: true
              }
            ],
            pageTitle: "Number Input",
            rule: "editor"
          }
        },
        {
          path: "/forms/form-elements/textarea",
          name: "form-element-textarea",
          component: () =>
            import("./views/forms/form-elements/textarea/Textarea.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Form Elements"
              },
              {
                title: "Textarea",
                active: true
              }
            ],
            pageTitle: "Textarea",
            rule: "editor"
          }
        },
        // -------------------------------------------------------------------------------------------------------------------------------------------
        {
          path: "/forms/form-layouts",
          name: "forms-form-layouts",
          component: () => import("@/views/forms/FormLayouts.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Forms"
              },
              {
                title: "Form Layouts",
                active: true
              }
            ],
            pageTitle: "Form Layouts",
            rule: "editor"
          }
        },
        {
          path: "/forms/form-wizard",
          name: "extra-component-form-wizard",
          component: () => import("@/views/forms/form-wizard/FormWizard.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Extra Components"
              },
              {
                title: "Form Wizard",
                active: true
              }
            ],
            pageTitle: "Form Wizard",
            rule: "editor"
          }
        },
        {
          path: "/forms/form-validation",
          name: "extra-component-form-validation",
          component: () =>
            import("@/views/forms/form-validation/FormValidation.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Extra Components"
              },
              {
                title: "Form Validation",
                active: true
              }
            ],
            pageTitle: "Form Validation",
            rule: "editor"
          }
        },
        {
          path: "/forms/form-input-group",
          name: "extra-component-form-input-group",
          component: () =>
            import("@/views/forms/form-input-group/FormInputGroup.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Extra Components"
              },
              {
                title: "Form Input Group",
                active: true
              }
            ],
            pageTitle: "Form Input Group",
            rule: "editor"
          }
        },

        // =============================================================================
        // Pages Routes
        // =============================================================================
        {
          path: "/pages/user-settings",
          name: "page-user-settings",
          component: () =>
            import("@/views/pages/user-settings/UserSettings.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Pages"
              },
              {
                title: "User Settings",
                active: true
              }
            ],
            pageTitle: "Settings",
            rule: "editor"
          }
        },
        {
          path: "/pages/faq",
          name: "page-faq",
          component: () => import("@/views/pages/Faq.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Pages"
              },
              {
                title: "FAQ",
                active: true
              }
            ],
            pageTitle: "FAQ",
            rule: "editor"
          }
        },
        {
          path: "/pages/addfaq",
          name: "page-faq-add",
          component: () => import("@/views/pages/AddFaq.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Pages"
              },
              {
                title: "Add FAQ",
                active: true
              }
            ],
            pageTitle: "Add FAQ",
            rule: "editor"
          }
        },
        {
          path: "/pages/editfaq/:id",
          name: "page-faq-edit",
          props: true,
          component: () => import("@/views/pages/EditFaq.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Pages"
              },
              {
                title: "Edit FAQ",
                active: true
              }
            ],
            pageTitle: "Edit FAQ",
            rule: "editor"
          }
        }
        // =============================================================================
        // CHARTS & MAPS
        // =============================================================================

        // =============================================================================
        // EXTENSIONS
        // =============================================================================
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: "",
      component: () => import("@/layouts/full-page/FullPage.vue"),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: "/callback",
          name: "auth-callback",
          component: () => import("@/views/Callback.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/login",
          name: "page-login",
          component: () => import("@/views/pages/login/Login.vue"),
          meta: {
            rule: "editor"
          },
          beforeEnter(to, from, next) {
            if (state.token) {
              next("/");
            } else {
              next();
            }
          }
        },
        {
          path: "/pages/forget",
          name: "page-forget",
          component: () => import("@/views/pages/forget/forget.vue"),
          meta: {
            rule: "editor"
          },
          beforeEnter(to, from, next) {
            if (state.token) {
              next("/");
            } else {
              next();
            }
          }
        },
        {
          path: "/pages/confirm",
          name: "page-confirm",
          component: () => import("@/views/pages/forget/confirm.vue"),
          meta: {
            rule: "editor"
          },
          beforeEnter(to, from, next) {
            if (state.token) {
              next("/");
            } else {
              next();
            }
          }
        },
        {
          path: "/pages/register",
          name: "page-register",
          component: () => import("@/views/pages/register/Register.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/forgot-password",
          name: "page-forgot-password",
          component: () => import("@/views/pages/ForgotPassword.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/comingsoon",
          name: "page-coming-soon",
          component: () => import("@/views/pages/ComingSoon.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/error-404",
          name: "page-error-404",
          component: () => import("@/views/pages/Error404.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/error-500",
          name: "page-error-500",
          component: () => import("@/views/pages/Error500.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/not-authorized",
          name: "page-not-authorized",
          component: () => import("@/views/pages/NotAuthorized.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/maintenance",
          name: "page-maintenance",
          component: () => import("@/views/pages/Maintenance.vue"),
          meta: {
            rule: "editor"
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: "*",
      redirect: "/pages/error-404"
    }
  ]
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(() => {
    // get firebase current user
    const firebaseCurrentUser = firebase.auth().currentUser;

    // if (
    //     to.path === "/pages/login" ||
    //     to.path === "/pages/forgot-password" ||
    //     to.path === "/pages/error-404" ||
    //     to.path === "/pages/error-500" ||
    //     to.path === "/pages/register" ||
    //     to.path === "/callback" ||
    //     to.path === "/pages/comingsoon" ||
    //     (auth.isAuthenticated() || firebaseCurrentUser)
    // ) {
    //     return next();
    // }

    // If auth required, check login. If login fails redirect to login page
    // if (to.meta.authRequired) {
    //   if (!(auth.isAuthenticated() || firebaseCurrentUser)) {
    //     router.push({
    //       path: '/pages/login',
    //       query: {
    //         to: to.path
    //       }
    //     })
    //   }
    // }

    return next();
    // Specify the current path as the customState parameter, meaning it
    // will be returned to the application after auth
    // auth.login({ target: to.path });
  });
});

export default router;
