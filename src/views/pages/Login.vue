<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <v-card hover flat class="text-center">
          <theme-switcher></theme-switcher>
        </v-card>
        
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link to="/" class="d-flex align-center">
            <v-img
              :src="require('@/assets/images/logos/logo_192.png')"
              max-height="150px"
              max-width="150px"
              alt="logo"
              contain
              class="me-3"
            ></v-img>

            <!-- <h2 class="text-2xl font-weight-semibold">enara Digital</h2> -->
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text class="text-center">
          <p class="text-2xl font-weight-semibold text--primary mb-2">Hi There! 👋🏻</p>
          <p class="font-size-subtitle mb-2">Please Sign-In To Your Account and Start The Adventure</p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              outlined
              label="Email"
              placeholder="abc@example.com"
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
              @keyup.enter="login()"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <!-- <v-checkbox label="Remember Me" hide-details class="me-3 mt-1"> </v-checkbox> -->

              <!-- forgot link -->
              <!-- <a href="javascript:void(0)" class="mt-1"> Forgot Password? </a> -->
            </div>
            <!-- :to="{ name: 'dashboard' }" -->
            <v-btn block color="primary" @click="login()" class="mt-6"> Login </v-btn>
          </v-form>
        </v-card-text>

        <!-- divider
        <v-card-text class="d-flex align-center mt-2">
          <v-divider></v-divider>
          <span class="mx-5">or</span>
          <v-divider></v-divider>
        </v-card-text> -->

        <!-- create new account 
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2"> New on our platform? </span>
          <router-link :to="{ name: 'pages-register' }"> Create an account </router-link>
        </v-card-text> -->

        <!-- social links
        <v-card-actions class="d-flex justify-center">
          <v-btn v-for="link in socialLink" :key="link.icon" icon class="ms-1">
            <v-icon :color="$vuetify.theme.dark ? link.colorInDark : link.color">
              {{ link.icon }}
            </v-icon>
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
    />

    <!-- tree -->
    <v-img class="auth-tree" width="247" height="185" src="@/assets/images/misc/tree.png"></v-img>

    <!-- tree  -->
    <v-img class="auth-tree-3" width="377" height="289" src="@/assets/images/misc/tree-3.png"></v-img>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import ThemeSwitcher from '@/layouts/components/ThemeSwitcher.vue'
import { ref } from '@vue/composition-api'
import Swal from 'sweetalert2'

export default {
  setup() {
    const isPasswordVisible = ref(false)
    const email = ref('')
    const password = ref('')
    const socialLink = [
      {
        icon: mdiFacebook,
        color: '#4267b2',
        colorInDark: '#4267b2',
      },
      {
        icon: mdiTwitter,
        color: '#1da1f2',
        colorInDark: '#1da1f2',
      },
      {
        icon: mdiGithub,
        color: '#272727',
        colorInDark: '#fff',
      },
      {
        icon: mdiGoogle,
        color: '#db4437',
        colorInDark: '#db4437',
      },
    ]

    return {
      isPasswordVisible,
      email,
      password,
      socialLink,

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
  components:{
    ThemeSwitcher,
  },
  methods: {
    async login() {
      const url = process.env.VUE_APP_URL + 'user/login'
      const body = {
        email: this.email,
        password: this.password,
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
      const response = await fetch(url, requestOptions)
      const data = await response.json()
      if (data.statusCode === 200) {
        //SET User Local Storage
        await this.checkUser(data.data.accessToken)
        localStorage.setItem('token', data.data.accessToken)
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Success',
          text: 'Login sucessful!',
          showConfirmButton: false,
          timer: 1500,
        })
        this.$router.push({ name: 'home'})
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: data.message,
        })
      }
    },

    async checkUser(tokenJwt) {
      const url = process.env.VUE_APP_URL + 'user/profile'
      const token = tokenJwt
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
      const response = await fetch(url, requestOptions)
      const data = await response.json()
      if (data.statusCode === 200) {
        localStorage.setItem('user', JSON.stringify(data.data))
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Session Expired',
          text: 'Please relogin!',
        })
        this.$router.push({ name: 'pages-login' })
      }
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>

<style scoped>
  .font-size-subtitle {
    font-size: 0.8rem;
  }
</style>