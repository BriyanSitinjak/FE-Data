<template>
  <v-card>
    <v-card-title>Transaction Detail</v-card-title>
    <v-row class="ma-0 pb-5 px-2">
      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap">Nama</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0">
        <p class="font-weight-bold body-1 mb-0" v-if="transactionDetail.user">{{ transactionDetail.user.name }}</p>
        <!-- <small>font-size: 1rem / line-height: 1.75rem / font-weight: 400</small> -->
      </v-col>

      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap">Email</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0">
        <p class="font-weight-bold body-1 mb-0" v-if="transactionDetail.user">{{ transactionDetail.user.email }}</p>
        <!-- <small>font-size: 0.875rem / line-height: 1.375rem / font-weight: 500</small> -->
      </v-col>

      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap">Date Transaction</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0">
        <p class="font-weight-bold body-1 mb-0">{{ date }}</p>
        <!-- <small>font-size: 1rem / line-height: 1.5rem / font-weight: 400</small> -->
      </v-col>

      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap">Amount</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0">
        <p class="font-weight-bold body-1 mb-0" v-if="transactionDetail.type == 'Credit'" :style="{ color: 'green' }">
          <!-- Rp {{ transactionDetail.amount }} -->
          {{
            ` ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
              transactionDetail.amount,
            )}`
          }}
        </p>
        <p class="font-weight-bold body-1 mb-0" v-if="transactionDetail.type == 'Debit'" :style="{ color: 'red' }">
          <!-- Rp {{ transactionDetail.amount }} -->
          {{
            ` ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
              transactionDetail.amount,
            )}`
          }}
        </p>
        <!-- <small>font-size: 0.875rem / line-height: 1.25rem / font-weight: 400</small> -->
      </v-col>

      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap">Type</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0">
        <p class="font-weight-bold body-1 mb-0">{{ transactionDetail.type }}</p>
        <!-- <small>font-size: 0.875rem / line-height: 1.25rem / font-weight: 400</small> -->
      </v-col>

      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap">Status</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0">
        <p class="font-weight-bold body-1 mb-0">{{ transactionDetail.status }}</p>
        <!-- <small>font-size: 0.875rem / line-height: 1.25rem / font-weight: 400</small> -->
      </v-col>

      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap">Note</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0">
        <p class="font-weight-bold body-1 mb-0">{{ testImage }}</p>
        <!-- <small>font-size: 0.875rem / line-height: 1.25rem / font-weight: 400</small> -->
      </v-col>

      <v-col cols="4" sm="2" class="pb-0">
        <span class="subtitle-1 text-no-wrap" v-if="transactionDetail.image" id="!hide">Image Payment</span>
      </v-col>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2" cols="10" class="mb-3 pt-0">
        <v-img
          :lazy-src="testImage"
          max-height="150"
          max-width="250"
          :src="testImage"
          @click="openImage(testImage)"
          v-if="transactionDetail.image"
          id="!hide"
        ></v-img>
      </v-col>
      <v-col cols="12">
        <v-btn outlined class="mx-2" @click="back()"> BACK </v-btn>
      </v-col>
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
      transactionDetail: {},
      date: new Date(),
      menu2: false,
      age: 0, //intial
      testImage: '',
      url: process.env.VUE_APP_URL,
    }
  },
  created: async function () {
    await this.getDataRepositoryDetail()
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
      this.testImage = ''
      let url = process.env.VUE_APP_URL + 'user/transaction/getDetailTransaction/' + this.$route.params.id
      const token = localStorage.getItem('tokenUser').toString()
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      }
      fetch(url, requestOptions)
        .then(async response => {
          const dataArray = await response.json()
          this.transactionDetail = await dataArray.data
          this.testImage = process.env.VUE_APP_URL + this.transactionDetail.image
          this.testImage = this.testImage.replace(/\\/g, '/') //format url

          this.date =
            `${new Date(this.transactionDetail.createdAt).toISOString().slice(0, 10)} ` +
            `${new Date(this.transactionDetail.createdAt).toISOString().slice(11, 19)}`
          console.log(this.transactionDetail)

          if (this.transactionDetail.status == 'request') {
            this.isRequest = true
          }
          // this.age = dataArray.data.umur
        })
        .catch(error => console.error(error))
    },

    back() {
      this.$router.go(-1)
    },
  },
}
</script>

