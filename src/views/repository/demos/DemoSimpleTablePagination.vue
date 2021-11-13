<template>
  <v-simple-table>
    <template v-slot:default>
      <tfoot>
        <v-pagination class="pagination" v-model="newPage" :length="total_page" @input="pagination()"></v-pagination>
      </tfoot>
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
      // search
      if (this.$route.query.nama) {
        this.$router.push({
          name: 'repositorySearch',
          query: { nama: this.$route.query.nama, page: Number(this.newPage) },
        })
      } else {
        this.$router.push({ name: 'repository', params: { id: Number(this.newPage) } })
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
  // watch: {
  //   //update data when search
  //   $route: function (to, from) {
  //     if (this.$route.query.nama) {
  //       this.search()
  //     }
  //   },
  // },
}
</script>
