<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-uppercase">No</th>
          <th class="text-center text-uppercase">Name</th>
          <th class="text-center text-uppercase">Gender</th>
          <th class="text-center text-uppercase">Age</th>
          <th class="text-center text-uppercase">Religion</th>
          <th class="text-center text-uppercase">Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in repository" :key="index.nama">
          <td>{{ item.id }}</td>
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

          <v-col cols="12">
            <v-btn outlined class="mx-2" @click="goToDetail(item.id)">Detail</v-btn>
          </v-col>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  data() {
    return {
      repository: [],
      total_page: 0, //initial
      newPage: Number(this.$route.params.id) || 1, //initial
    }
  },
  created: function () {
    if (this.$route.query.nama) {
      this.search()
    } else {
      this.getDataRepository()
    }
  },
  methods: {
    pagination() {
      // console.log('pagination params', this.$route.params.id)
      if (this.$route.query.nama) {
        this.$router.push({
          name: 'repositorySearch',
          query: { nama: this.$route.query.nama, page: Number(this.newPage) },
        })
        this.search()
      } else {
        console.log(this.newPage)
        this.$router.push({ name: 'repository', params: { id: Number(this.newPage) } })
        this.getDataRepository()
      }
    },
    getDataRepository: function () {
      let page = Number(this.$route.params.id)
      if (!page) {
        page = 1
      }

      let url = process.env.VUE_APP_URL + 'repository/getAllData?&page=' + page
      const token = localStorage.getItem('token').toString()
      const requestOptions = {
        method: 'GET',
        // headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      }
      fetch(url, requestOptions)
        .then(async response => {
          const dataArray = await response.json()
          this.repository = dataArray.data
          this.total_page = dataArray.success.total_page //set new value total page
        })
        .catch(error => console.error(error))
    },
    goToDetail(id) {
      this.$router.push({ name: 'repositoryDetail', params: { id: id } })
    },
    async search() {
      let page = Number(this.$route.query.page)
      if (!page) {
        page = 1
      }
      let url = process.env.VUE_APP_URL + 'repository/getAllData?nama=' + this.$route.query.nama + '&page=' + page
      const token = localStorage.getItem('token').toString()
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      }
      fetch(url, requestOptions)
        .then(async response => {
          const dataArray = await response.json()
          this.repository = dataArray.data
          this.total_page = dataArray.success.total_page //set new value total page
        })
        .catch(error => console.error(error))
    },
  },
  watch: {
    //update data when search
    $route: function (to, from) {
      if (this.$route.query.nama) {
        this.search()
      }
      if (this.$route.params.id) {
        this.getDataRepository()
      }
    },
  },
}
</script>
