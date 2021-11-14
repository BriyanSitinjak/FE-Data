<template>
  <v-form class="multi-col-validation" :disabled="isDisabled">
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="repositoryDetail.nama"
          label="Nama"
          outlined
          dense
          placeholder="Nama"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="age"
          label="Umur"
          outlined
          dense
          placeholder="Umur"
          hide-details
          type="number"
          min="0"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="repositoryDetail.alamat"
          label="Alamat"
          outlined
          dense
          placeholder="Alamat"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="repositoryDetail.jenisKelamin"
          label="Jenis Kelamin"
          outlined
          dense
          placeholder="Jenis Kelamin"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="repositoryDetail.tempatLahir"
          label="Tempat Lahir"
          outlined
          dense
          placeholder="Tempat Lahir"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <!-- <v-text-field
          v-model="repositoryDetail.tanggalLahir"
          label="Tanggal Lahir"
          outlined
          dense
          placeholder="Tanggal Lahir"
          hide-details
        >
        </v-text-field> -->
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Tanggal Lahir"
              readonly
              v-bind="attrs"
              v-on="on"
              outlined
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="repositoryDetail.statusPernikahan"
          label="Status Pernikahan"
          outlined
          dense
          placeholder="Status Pernikahan"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="repositoryDetail.agama"
          label="Agama"
          outlined
          dense
          placeholder="Agama"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="repositoryDetail.email"
          label="Email"
          outlined
          dense
          placeholder="Email"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="repositoryDetail.noHp"
          label="No HP"
          outlined
          dense
          placeholder="No HP"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="repositoryDetail.nik"
          label="NIK"
          outlined
          dense
          placeholder="NIK"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="repositoryDetail.noKk"
          label="No KK"
          outlined
          dense
          placeholder="No KK"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="repositoryDetail.noNpwp"
          label="No NPWP"
          outlined
          dense
          placeholder="No NPWP"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-btn color="primary" @click="edit()"> {{ dynamicButton }} </v-btn>
        <v-btn color="error" outlined class="mx-2"> Delete </v-btn>
        <v-btn outlined class="mx-2" @click="back()"> BACK </v-btn>
        <v-btn color="accent" outlined class="mx-2"> Print </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      menu: false,
      isDisabled: true,
      dynamicButton: 'edit',
      repositoryDetail: {},
      date: new Date(),
      menu2: false,
      age: 0, //intial
    }
  },
  created: function () {
    this.getDataRepositoryDetail()
  },
  methods: {
    getDataRepositoryDetail: function () {
      let url = process.env.VUE_APP_URL + 'repository/getDataById/' + this.$route.params.id
      const token = localStorage.getItem('token').toString()
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      }
      fetch(url, requestOptions)
        .then(async response => {
          const dataArray = await response.json()
          this.repositoryDetail = dataArray.data
          this.date = new Date(dataArray.data.tanggalLahir).toISOString().substr(0, 10)
          this.age = dataArray.data.umur
        })
        .catch(error => console.error(error))
    },
    async edit() {
      if (this.isDisabled == true) {
        this.isDisabled = false
        this.dynamicButton = 'SAVE'
      } else {
        this.isDisabled = true
        this.dynamicButton = 'EDIT'

        //validaton
        this.age = Number(this.age)
        if (this.age === 0) {
          this.age = this.repositoryDetail.umur //reset value form
          return Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'Umur must be number',
          })
        } else {
          this.repositoryDetail.umur = this.age //set age to body
        }

        //update datepicker
        this.repositoryDetail.tanggalLahir = this.date

        //update to api
        const url = process.env.VUE_APP_URL + 'repository/update/' + this.repositoryDetail.id
        const token = localStorage.getItem('token').toString()

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify(this.repositoryDetail),
        }
        const response = await fetch(url, requestOptions)
        const data = await response.json()
        if (data.statusCode === 200) {
          Swal.fire({
            // position: 'top-end',
            icon: 'success',
            title: 'Saved!',
            text: 'Data has been updated!',
            showConfirmButton: false,
            timer: 1500,
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: data.message,
          })
        }
      }
    },
    back() {
      this.$router.go(-1)
    },
    log() {
      console.log(this.repositoryDetail)
    },
  },
}
</script>
  

<style scoped>
.searchbar {
    padding: 1rem 1.5rem !important;
    width: 100%;
    box-shadow: 0 0 70px 0 rgba(0, 0, 0, 0.3);
    background: #fafafa;
}
</style>