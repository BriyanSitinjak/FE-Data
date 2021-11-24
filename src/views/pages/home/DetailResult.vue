<template>
  <v-card >
    <v-card-title>Transaction Detail</v-card-title>
    <v-row class="ma-0 pb-5 px-2">
      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap">Nama</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0">
        <p class="font-weight-bold body-1 mb-0" v-if="repositoryDetail">{{ repositoryDetail.nama }}</p>
        <!-- <small>font-size: 1rem / line-height: 1.75rem / font-weight: 400</small> -->
      </v-col>

      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap">Umur</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0">
        <p class="font-weight-bold body-1 mb-0" v-if="repositoryDetail">{{ repositoryDetail.umur }}</p>
        <!-- <small>font-size: 0.875rem / line-height: 1.375rem / font-weight: 500</small> -->
      </v-col>

      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap">Alamat</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0" >
        <p  class="font-weight-bold body-1 mb-0">{{ repositoryDetail.alamat }}</p>
        <!-- <small>font-size: 1rem / line-height: 1.5rem / font-weight: 400</small> -->
      </v-col>

      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap">Jenis Kelamin</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0">
        <p class="font-weight-bold body-1 mb-0">{{ repositoryDetail.jenisKelamin }}</p>
        <!-- <small>font-size: 1rem / line-height: 1.5rem / font-weight: 400</small> -->
      </v-col>

      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap">Tempat Lahir</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0">
        <p class="font-weight-bold body-1 mb-0">{{ repositoryDetail.tempatLahir }}</p>
        <!-- <small>font-size: 1rem / line-height: 1.5rem / font-weight: 400</small> -->
      </v-col>

      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap">Tanggal Lahir</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0">
        <p class="font-weight-bold body-1 mb-0">{{ date }}</p>
        <!-- <small>font-size: 1rem / line-height: 1.5rem / font-weight: 400</small> -->
      </v-col>

      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap">Status Pernikahan</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0">
        <p class="font-weight-bold body-1 mb-0">{{ repositoryDetail.statusPernikahan }}</p>
        <!-- <small>font-size: 0.875rem / line-height: 1.25rem / font-weight: 400</small> -->
      </v-col>

      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap">Agama</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0">
        <p class="font-weight-bold body-1 mb-0">{{ repositoryDetail.agama }}</p>
        <!-- <small>font-size: 0.875rem / line-height: 1.25rem / font-weight: 400</small> -->
      </v-col>

      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap">Email</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0">
        <p class="font-weight-bold body-1 mb-0">{{ repositoryDetail.email }}</p>
        <!-- <small>font-size: 0.875rem / line-height: 1.25rem / font-weight: 400</small> -->
      </v-col>

      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap">No Hp</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0">
        <p class="font-weight-bold body-1 mb-0">{{ repositoryDetail.noHp }}</p>
        <!-- <small>font-size: 0.875rem / line-height: 1.25rem / font-weight: 400</small> -->
      </v-col>

      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap">NIK</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0">
        <p class="font-weight-bold body-1 mb-0">{{ repositoryDetail.nik }}</p>
        <!-- <small>font-size: 0.875rem / line-height: 1.25rem / font-weight: 400</small> -->
      </v-col>

      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap">No KK</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0">
        <p class="font-weight-bold body-1 mb-0">{{ repositoryDetail.noKk }}</p>
        <!-- <small>font-size: 0.875rem / line-height: 1.25rem / font-weight: 400</small> -->
      </v-col>

      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap">No NPWP</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0">
        <p class="font-weight-bold body-1 mb-0">{{ repositoryDetail.noNpwp }}</p>
        <!-- <small>font-size: 0.875rem / line-height: 1.25rem / font-weight: 400</small> -->
      </v-col>

      <v-card-title class="justify-center text-center">
        <v-col cols="12" sm="6" md="12">
          <v-btn color="primary" class="mx-2 mb-2" :href="`${pdf}`" download="download.pdf" target="_blank"> DOWNLOAD </v-btn>
          <v-btn color="accent" outlined class="mx-2 mb-2" @click="reject()"> PRINT </v-btn>
          <v-btn outlined class="mx-2 mb-2" @click="back()"> BACK </v-btn>
        </v-col>
      </v-card-title>
      

      <!-- 
      <v-col cols="3" sm="2">
        <span class="caption">caption</span>
      </v-col>
      <v-col cols="9" sm="10">
        <p class="caption mb-0">Cupcake ipsum dolor sit amet fruitcake donut chocolate.</p>
        <small>font-size: 0.75rem / line-height: 1.25rem / font-weight: 400</small>
      </v-col>

      <v-col cols="3" sm="2">
        <span class="overline text-no-wrap">overline</span>
      </v-col>
      <v-col cols="9" sm="10">
        <p class="overline mb-0">Cupcake ipsum dolor sit amet fruitcake donut chocolate.</p>
        <small>font-size: 0.75rem / line-height: 2rem / font-weight: 500</small>
      </v-col> -->
    </v-row>
  </v-card>
</template>


<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      menu: false,
      isDisabled: true,
      isRequest: false,
      dynamicButton: 'edit',
      repositoryDetail: {},
      date: new Date(),
      menu2: false,
      age: 0, //intial
      testImage: 'https://khsblogdotnet.files.wordpress.com/2018/07/waspada-struk-transfer-atm-editan-brosis.jpg',
      pdf: '',
    }
  },
  created: function () {
    //listen close
    window.addEventListener('beforeunload', this.onClose)
    //disable back button
    history.pushState(null, null, location.href)
    window.onpopstate = function () {
      history.go(1)
    }

    this.getDataRepositoryDetail()
  },
  methods: {
    openImage(link) {
      Swal.fire({
        imageUrl: link,
        // imageHeight: 1500,
        imageAlt: 'A tall image',
      })
    },
    getDataRepositoryDetail: function () {
      let url = process.env.VUE_APP_URL + 'repository/user/getDataById/' + this.$route.params.id
      const token = localStorage.getItem('tokenUser').toString()
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      }
      fetch(url, requestOptions)
        .then(async response => {
          const dataArray = await response.json()
          if (dataArray.statusCode == 400) {
            Swal.fire({
              icon: 'error',
              title: dataArray.message,
              text: 'Please deposit your balance',
            })
            return this.$router.push({ name: 'home' })
          }
          console.log(await dataArray)
          this.repositoryDetail = await dataArray.data.repository
          this.pdf = process.env.VUE_APP_URL + 'pdf/' + (await dataArray.data.pdf)
          this.date = `${new Date(this.repositoryDetail.tanggalLahir).toISOString().slice(0, 10)} `
          if (dataArray.data.status === 'request') {
            this.isRequest = true
          }
          console.log(this.pdf)
          // this.age = dataArray.data.umur
        })
        .catch(error => console.error('ERROR', error))
    },

    back() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You can't see this page after you back or close! Please makesure the data already DOWNLOAD or PRINT!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'Redirect To home page!.',
            showConfirmButton: false,
            timer: 1000,
          })
          this.$router.push({ name: 'home' })
        }
      })
    },
    onClose(event) {
      console.log('unload')
      if (this.$store.state.curOrder != '') {
        event.preventDefault()
        event.returnValue = ''
      }
    },
  },
}
</script>
