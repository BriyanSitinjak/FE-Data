<template>
  <v-form class="multi-col-validation">
    <v-row>
      <v-col class="d-flex" cols="12" sm="6">
        <v-select v-model="amount" :items="items" label="Select Amount" dense outlined>
          <template #[`item`]="{ item }">
            {{ ` ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item)}` }}
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="userProfile.balance"
          label="Balance"
          outlined
          dense
          placeholder="Balance"
          hide-details
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="userProfile.email" label="Email" outlined dense hide-details disabled></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="userProfile.name"
          label="Name"
          outlined
          dense
          placeholder="Name"
          hide-details
          disabled
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-btn color="primary" @click="depositRequest()"> DEPOSIT </v-btn>
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
    userProfile: {
      type: Object,
    },
  },
  created: async function () {
    console.log(this.userProfile)
  },
  data() {
    return {
      cobain: 'verry',
      items: [50000, 100000, 500000, 1000000],
    }
  },
  setup() {
    const amount = ref('')
    const isPasswordVisible = ref(false)
    return {
      amount,
      isPasswordVisible,

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
  methods: {
    async depositRequest() {
      const url = process.env.VUE_APP_URL + 'user/deposit/request'
      const token = localStorage.getItem('tokenUser').toString()

      const body = {
        amount: this.amount,
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify(body),
      }
      const response = await fetch(url, requestOptions)
      const data = await response.json()
      if (data.statusCode === 201) {
        //SET User Local Storage
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Success',
          text: 'Deposit submitted!',
          showConfirmButton: false,
          timer: 1500,
        })
        // Refresh table list staff
        this.$emit('refreshList')

        //Send email success deposit to user
        //
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
