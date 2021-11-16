<template>
  <section id="hero">
    <home-header></home-header>
    <v-parallax 
    dark
    src="@/assets/images/pages/bg-home.jpg"
    height="850">
      <v-row align="center" justify="center">
        <v-col>
          <v-row align="center" justify="center">
            <v-col cols="12" md="12" xl="8">
              <h2 class="display-1 font-weight-bold text-center">Work Wisely,Do Business Wisely <br> For A Bright Future</h2>
              <v-text-field
              rounded
              background-color="#fff"
              dense
              outlined
              class="app-bar-search flex-grow-0 mt-5 px-12"
              :prepend-inner-icon="icons.mdiMagnify"
              placeholder="Nama..."
              v-model="searchText"
              @keyup.enter="search()"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-simple-table>
        <thead>
          <tr>
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
            <v-col cols="12" class="text-center">
              <v-row justify="center" align="center">
                <v-dialog
                  v-model="dialog"
                  persistent
                  max-width="290"
                >
                  <template v-slot:activator="{ on, attrs }" class="ma-0">
                    <v-btn
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      More
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="text-h6">
                      Are you sure?
                    </v-card-title>
                    <v-card-text>When you click "YES" it will reduce your credit.</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        @click="dialog = false"
                      >
                        NO
                      </v-btn>
                      <v-btn
                        text
                        @click="moreDetails(item.id)"
                      >
                        YES
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-col>
          </tr>
        </tbody>
      </v-simple-table>
    </v-parallax>
  </section>
</template>

<script>
import HomeHeader from '@/views/pages/home/demos/HomeHeader.vue'
import {mdiMagnify} from '@mdi/js'

export default {
  components:{
    HomeHeader,
  },
  data() {
    return {
      icons: {
        mdiMagnify,
      },
      searchText:'',
      repository:[],
      total_page: 0,
      newPage: Number(this.$route.params.id) || 1,
      dialog: false,
    };
  },
  created: function(){
    if (this.$route.query.nama) {
      this.search()
    } else {
      this.getDataRepository()
    }
  },
  watch: {
    search (val) {
      val && val != this.select && this.querySelections(val)
    },
  },
  methods: {
    moreDetails(id){
      this.$router.push({ name: 'detailsResult', params: { id: id } })
    },
    async search() {
      let page = Number(this.$route.query.page)
      if (!page) {
        page = 1
      }
      let url = process.env.VUE_APP_URL + 'repository/getAllData?nama=' + this.searchText + '&page=' + page
      const  token = localStorage.getItem('token').toString()
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type' : 'application/json', Authorization:'Bearer' + token},
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
  },
  computed: {
    filterSearch(){
      return this.biodatas.filter( biodata => {
        return !this.searchBiodata ||
          biodata.name.toLowerCase().indexOf(this.searchBiodata.toLowerCase()) > -1
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.circle {
  stroke: white;
  stroke-dasharray: 650;
  stroke-dashoffset: 650;
  // -webkit-transition: all 0.5s ease-in-out;
  opacity: 0.3;
}

.playBut {
  /*  border: 1px solid red;*/
  display: inline-block;
  // -webkit-transition: all 0.5s ease;

  .triangle {
    // -webkit-transition: all 0.7s ease-in-out;
    stroke-dasharray: 240;
    stroke-dashoffset: 480;
    stroke: white;
    transform: translateY(0);
  }

  &:hover {
    .triangle {
      stroke-dashoffset: 0;
      opacity: 1;
      stroke: white;
      animation: nudge 0.7s ease-in-out;

      @keyframes nudge {
        0% {
          transform: translateX(0);
        }
        30% {
          transform: translateX(-5px);
        }
        50% {
          transform: translateX(5px);
        }
        70% {
          transform: translateX(-2px);
        }
        100% {
          transform: translateX(0);
        }
      }
    }

    .circle {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }
}
</style>

<style scoped>
.btn-play {
  transition: 0.2s;
}

.svg-border-waves .v-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}

#hero {
  z-index: 0;
}
.svg-border-waves img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: -2px;
  z-index: -1;
}

.card {
  min-height: 300px;
  padding: 10px;
  transition: 0.5s ease-out;
}

.card .v-image {
  margin-bottom: 15px;
  transition: 0.75s;
}

.card h1 {
  margin-bottom: 10px;
}

.zoom-efect {
  transform: scale(1.1);
}

.up {
  transform: translateY(-20px);
  transition: 0.5s ease-out;
}
</style>

<style scoped>
section {
  position: relative;
}
</style>
