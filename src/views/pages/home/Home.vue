<template>
  <section id="hero">
    <v-row align="center" justify="center">
      <v-col>
        <v-row align="center" justify="center">
          <v-col cols="12" md="12" xl="8">
            <h2 id="titleHome" class="display-1 font-weight-bold text-center mt-16 hidden-xs-only">
              Work Wisely,Do Business Wisely <br />
              For A Bright Future
            </h2>
            <h2 id="titleHome" class="headline font-weight-bold text-center mt-16 hidden-sm-and-up">
              Work Wisely,Do Business Wisely <br />
              For A Bright Future
            </h2>
            <v-text-field
              rounded
              background-color="#fff"
              dense
              outlined
              class="app-bar-search flex-grow-0 mt-10 px-12 py-10"
              :prepend-inner-icon="icons.mdiMagnify"
              placeholder="Search Name..."
              v-model="searchText"
              @keyup.enter="search()"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if="!repository[0]" id="hide" class="mt-10">
      <v-col cols="12" md="4">
        <dashboard-congratulation-user v-bind:userProfile="userProfile"></dashboard-congratulation-user>
      </v-col>
      <v-col cols="12" md="8">
        <dashboard-statistics-card></dashboard-statistics-card>
      </v-col>
    </v-row>
    <v-simple-table>
      <thead v-if="repository[0]" id="!hide">
        <tr>
          <th class="text-center text-uppercase">No</th>
          <th class="text-center text-uppercase">Name</th>
          <th class="text-center text-uppercase">Gender</th>
          <th class="text-center text-uppercase">Age</th>
          <th class="text-center text-uppercase">Religion</th>
          <th class="text-center text-uppercase">Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in repository" :key="index.nama">
          <td class="text-center">
            {{ index + 1 + (newPage * 10 - 10) }}
          </td>
          <td class="text-center">
            {{ item.nama }}
          </td>
          <td class="text-center">
            {{ item.jenisKelamin }}
          </td>
          <td class="text-center">
            {{ item.umur }}
          </td>
          <td class="text-center">
            {{ item.agama }}
          </td>
          <td class="text-center">
            <v-btn v-model="dialog" color="primary" dark @click="moreDetails(item.id)"> More </v-btn>
          </td>
          <!-- <v-col cols="12" class="text-center">
            <v-row justify="center">
              <v-dialog v-model="dialog" persistent max-width="290">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on"> More </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h6"> Are you sure? </v-card-title>
                  <v-card-text>When you click "YES" it will reduce your credit.</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="dialog = false"> NO </v-btn>
                    <v-btn text @click="moreDetails(item.id)"> YES </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </v-col> -->
        </tr>
      </tbody>
    </v-simple-table>
    <!-- pagination -->
    <v-col cols="12">
      <v-card v-if="repository[0]" id="!hide">
        <pagination v-bind:total_page="total_page" @refreshList="search"></pagination>
      </v-card>
    </v-col>
    <!-- </v-parallax> -->
  </section>
</template>

<script>
import { mdiMagnify } from '@mdi/js'
import DashboardCongratulationUser from './widget/DashboardCongratulationUser.vue'
import DashboardStatisticsCard from './widget/DashboardStatisticsCard.vue'
import Pagination from './widget/Pagination.vue'
import crypto from 'crypto'
import Swal from 'sweetalert2'

const algorithm = 'aes-256-ctr'
const secretKey = 'qwertyuiopasdfghjklzxcvbnmqwerty'
const iv = crypto.randomBytes(16)

export default {
  components: {
    DashboardCongratulationUser,
    DashboardStatisticsCard,
    Pagination,
  },
  data() {
    return {
      icons: {
        mdiMagnify,
      },
      searchText: '',
      repository: [],
      total_page: 0,
      newPage: Number(this.$route.params.id) || 1,
      dialog: false,
      userProfile: {},
    }
  },
  watch: {
    search(val) {
      val && val != this.select && this.querySelections(val)
    },
  },
  created: async function () {
    this.getProfile()
    //disable back button
    history.pushState(null, null, location.href)
    window.onpopstate = function () {
      history.go(1)
    }
  },
  methods: {
    moreDetails(id) {
      //confirmation
      Swal.fire({
        title: 'See Details?',
        text: 'You will be charged a transaction fee !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then(result => {
        if (result.isConfirmed) {
          //encrypt
          const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
          const encrypted = Buffer.concat([cipher.update(id.toString()), cipher.final()])

          const ivHex = iv.toString('hex')
          const contentHex = encrypted.toString('hex')

          this.$router.push({ name: 'data-details', params: { id: contentHex + ':' + ivHex } })
        }
      })
    },
    async search(id) {
      let page = id
      if (!page) {
        page = 1
      }
      this.newPage = page // update for no index tabel
      if (this.searchText == '') {
        this.repository = []
        // console.log(this.repository)
        return (this.total_page = 0)
      }
      let url = process.env.VUE_APP_URL + 'repository/getAllData?nama=' + this.searchText + '&page=' + page
      const token = localStorage.getItem('tokenUser').toString()
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      }
      fetch(url, requestOptions)
        .then(async response => {
          const dataArray = await response.json()
          this.repository = dataArray.data
          // console.log(this.repository)
          this.total_page = dataArray.success.total_page
        })
        .catch(error => console.error(error))
    },
    async getProfile() {
      let url = process.env.VUE_APP_URL + 'user/profile'
      const token = localStorage.getItem('tokenUser').toString()
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      }
      fetch(url, requestOptions)
        .then(async response => {
          const dataArray = await response.json()
          this.userProfile = dataArray.data
        })
        .catch(error => console.error(error))
    },
  },

  computed: {
    filterSearch() {
      return this.biodatas.filter(biodata => {
        return !this.searchBiodata || biodata.name.toLowerCase().indexOf(this.searchBiodata.toLowerCase()) > -1
      })
    },
  },
}
</script>


