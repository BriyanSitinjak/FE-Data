<template>
  <v-row>
    <!-- Multiple Column -->
    <v-col cols="12">
      <v-card>
        <v-card-title>Add Staff Account</v-card-title>
        <v-card-text>
          <demo-form-layout-multiple-column @refreshList="getListAdmin()"></demo-form-layout-multiple-column>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- basic -->
    <v-col cols="12">
      <v-card>
        <v-card-title>Staff List</v-card-title>
        <demo-simple-table-basic v-bind:listAdmin="listAdmin"></demo-simple-table-basic>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DemoSimpleTableBasic from './demos/DemoSimpleTableBasic.vue'
import DemoFormLayoutMultipleColumn from './demos/DemoFormLayoutMultipleColumn.vue'

export default {
  components: {
    DemoSimpleTableBasic,
    DemoFormLayoutMultipleColumn,
  },
  data() {
    return {
      cobain: 'verry',
      listAdmin: [],
    }
  },
  created: async function () {
    await this.getListAdmin()
  },
  setup() {
    return {}
  },
  methods: {
    getListAdmin: async function () {
      //clear data
      this.listAdmin = []
      let url = process.env.VUE_APP_URL + 'staff'
      const token = localStorage.getItem('token').toString()
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      }
      const response = await fetch(url, requestOptions)
      const dataResponse = await response.json()

      if (dataResponse.statusCode === 200) {
        dataResponse.data.forEach(element => {
          this.listAdmin.push(element)
        })
        //SET User Local Storage
        // this.listAdmin = dataResponse.data
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
