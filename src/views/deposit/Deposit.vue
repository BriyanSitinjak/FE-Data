<template>
  <v-row>
    <!-- Multiple Column -->
    <v-col cols="12">
      <v-card>
        <v-card-title>Create Deposit Request</v-card-title>
        <v-card-text>
          <demo-form-layout-multiple-column
            v-bind:userProfile="userProfile"
            @refreshList="checkDepositUser()"
          ></demo-form-layout-multiple-column>
          <p class="mt-7">
            # pending deposit will be deleted automatically in 24 hours by system if not paid and upload proof of
            payment!
          </p>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- basic -->
    <v-col cols="12">
      <v-card>
        <v-card-title>Deposit History</v-card-title>
        <demo-simple-table-basic
          v-bind:listDepositUser="listDepositUser"
          @refreshList="checkDepositUser()"
        ></demo-simple-table-basic>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DemoSimpleTableBasic from './demos/DemoSimpleTableBasic.vue'
import DemoFormLayoutMultipleColumn from './demos/DemoFormLayoutMultipleColumn.vue'
import Swal from 'sweetalert2'

export default {
  components: {
    DemoSimpleTableBasic,
    DemoFormLayoutMultipleColumn,
  },
  data() {
    return {
      userProfile: {},
      listDepositUser: [],
    }
  },
  created: async function () {
    await this.checkUserProfile()
    await this.checkDepositUser()
  },
  setup() {
    return {}
  },
  methods: {
    checkUserProfile: async function () {
      //clear data
      this.userProfile = {}
      let url = process.env.VUE_APP_URL + 'user/profile'
      const token = localStorage.getItem('tokenUser').toString()
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      }
      const response = await fetch(url, requestOptions)
      const dataResponse = await response.json()

      if (dataResponse.statusCode === 200) {
        this.userProfile = dataResponse.data

        //  dataArray.data.forEach(element => {
        //       this.transactionAllList.push(element)
        //     })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: dataResponse.message,
        })
      }
    },

    checkDepositUser: async function () {
      //clear data
      this.listDepositUser = []
      let url = process.env.VUE_APP_URL + 'user/deposit/list'
      const token = localStorage.getItem('tokenUser').toString()
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      }
      const response = await fetch(url, requestOptions)
      const dataResponse = await response.json()

      if (dataResponse.statusCode === 200) {
        this.listDepositUser = dataResponse.data
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: dataResponse.message,
        })
      }
    },
  },
}
</script>
