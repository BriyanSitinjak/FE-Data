<template>
  <v-form class="multi-col-validation">
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="email" label="Email" outlined dense placeholder="Email" hide-details></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field v-model="name" label="Name" outlined dense placeholder="Name" hide-details></v-text-field>
      </v-col>

      <!-- <v-col cols="12" md="6">
        <v-text-field v-model="email" label="Email" outlined dense hide-details type="password"></v-text-field>
      </v-col> -->
      <v-col cols="12" md="6">
        <v-text-field
          v-model="password"
          outlined
          :type="isPasswordVisible ? 'text' : 'password'"
          label="Password"
          placeholder="············"
          :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
          hide-details
          @click:append="isPasswordVisible = !isPasswordVisible"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-btn color="primary" @click="registerStaff()"> Register </v-btn>
        <v-btn type="reset" outlined class="mx-2"> Reset </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { ref } from '@vue/composition-api'
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import Swal from 'sweetalert2'

export default {
  props: {
    listAdmin: {
      type: Array,
    },
  },
  setup() {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const isPasswordVisible = ref(false)

    return {
      name,
      email,
      password,
      isPasswordVisible,

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
  methods: {
    async registerStaff() {
      const url = process.env.VUE_APP_URL + 'staff/register'
      const token = localStorage.getItem('token').toString()

      const body = {
        name: this.name,
        email: this.email,
        password: this.password,
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify(body),
      }
      const response = await fetch(url, requestOptions)
      const data = await response.json()
      console.log('respon register ', data)
      if (data.statusCode === 201) {
        //SET User Local Storage
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Success',
          text: 'Success Add staff!',
          showConfirmButton: false,
          timer: 1500,
        })
        // Refresh table list staff
        this.$emit('refreshList')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: data.message,
        })
      }
    },
  },
}
</script>
