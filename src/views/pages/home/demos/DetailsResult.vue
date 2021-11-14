<template>
  <v-container
  fluid
  class="mt-5">
    <v-row align="center" justify="center">
      <v-col cols="8">
        <v-row align="center" justify="space-around">
          <v-card
          class="mx-auto"
          >
            <home-header></home-header>
            <v-card-title>Result Detail</v-card-title>
            <v-row class="ma-0 pb-5 px-2">

              <v-col cols="3" sm="2">
                <span class="subtitle-1 text-no-wrap">
                  Nama
                </span>
              </v-col>
              <v-col cols="9" sm="10">
                <p class="body-1 mb-0">{{biodataDetail.nama}}</p>
              </v-col>

              <v-col cols="3" sm="2">
                <span class="subtitle-1 text-no-wrap">
                  Umur
                </span>
              </v-col>
              <v-col cols="9" sm="10">
                <p class="body-1 mb-0">{{biodataDetail.umur}}</p>
              </v-col>

              <v-col cols="3" sm="2">
                <span class="subtitle-1 text-no-wrap">
                  Alamat
                </span>
              </v-col>
              <v-col cols="9" sm="10">
                <p class="body-1 mb-0">{{biodataDetail.alamat}}</p>
              </v-col>

              <v-col cols="3" sm="2">
                <span class="subtitle-1 text-no-wrap">
                  Jenis Kelamin
                </span>
              </v-col>
              <v-col cols="9" sm="10">
                <p class="body-1 mb-0">{{biodataDetail.jenisKelamin}}</p>
              </v-col>

              <v-col cols="3" sm="2">
                <span class="subtitle-1 text-no-wrap">
                  Tempat Lahir
                </span>
              </v-col>
              <v-col cols="9" sm="10">
                <p class="body-1 mb-0">{{biodataDetail.tempatLahir}}</p>
              </v-col>

              <v-col cols="3" sm="2">
                <span class="subtitle-1 text-no-wrap">
                  Tanggal Lahir
                </span>
              </v-col>
              <v-col cols="9" sm="10">
                <p class="body-1 mb-0">{{biodataDetail.tanggalLahir}}</p>
              </v-col>

              <v-col cols="3" sm="2">
                <span class="subtitle-1 text-no-wrap">
                  Status Pernikahan
                </span>
              </v-col>
              <v-col cols="9" sm="10">
                <p class="body-1 mb-0">{{biodataDetail.statusPernikahan}}</p>
              </v-col>

              <v-col cols="3" sm="2">
                <span class="subtitle-1 text-no-wrap">
                  Agama
                </span>
              </v-col>
              <v-col cols="9" sm="10">
                <p class="body-1 mb-0">{{biodataDetail.agama}}</p>
              </v-col>

              <v-col cols="3" sm="2">
                <span class="subtitle-1 text-no-wrap">
                  Email
                </span>
              </v-col>
              <v-col cols="9" sm="10">
                <p class="body-1 mb-0">{{biodataDetail.email}}</p>
              </v-col>

              <v-col cols="3" sm="2">
                <span class="subtitle-1 text-no-wrap">
                  Nomor Telepon
                </span>
              </v-col>
              <v-col cols="9" sm="10">
                <p class="body-1 mb-0">{{biodataDetail.noHp}}</p>
              </v-col>
              
              <v-col cols="3" sm="2">
                <span class="subtitle-1 text-no-wrap">
                  NIK
                </span>
              </v-col>
              <v-col cols="9" sm="10">
                <p class="body-1 mb-0">{{biodataDetail.nik}}</p>
              </v-col>

              <v-col cols="3" sm="2">
                <span class="subtitle-1 text-no-wrap">
                  No.KK
                </span>
              </v-col>
              <v-col cols="9" sm="10">
                <p class="body-1 mb-0">{{biodataDetail.noKk}}</p>
              </v-col>

              <v-col cols="3" sm="2">
                <span class="subtitle-1 text-no-wrap">
                  NPWP
                </span>
              </v-col>
              <v-col cols="9" sm="10">
                <p class="body-1 mb-0">{{biodataDetail.noNpwp}}</p>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
    <div class="text-center ma-5">
      <v-btn outlined class="mx-2" @click="back()"> BACK </v-btn>
      <v-btn color="success" class="mx-2"> DOWNLOAD </v-btn>
      <v-btn color="error" class="mx-2"> PRINT </v-btn>
    </div>
  </v-container>
</template>


<script>
import HomeHeader from '@/views/pages/home/demos/HomeHeader.vue'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      repositoryDetail: {},
      biodataDetail: {},
    }
  },
  components:{
    HomeHeader,
  },
  created: function () {
    this.getDataRepositoryDetail()
  },
  methods: {
    openImage(link) {
      console.log(link)
      Swal.fire({
        imageUrl: link,
        // imageHeight: 1500,
        imageAlt: 'A tall image',
      })
    },
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
          this.biodataDetail = dataArray.data
          console.log(this.biodataDetail)
        })
        .catch(error => console.error(error))
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

