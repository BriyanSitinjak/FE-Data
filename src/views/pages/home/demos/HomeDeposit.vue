<template>
  <v-card>
        <home-header></home-header>
        <v-col cols="12" md="4">
            <dashboard-congratulation-john v-bind:userProfile="userProfile"></dashboard-congratulation-john>
        </v-col>
        <v-col cols="12" md="8">
            <dashboard-statistics-card></dashboard-statistics-card>
        </v-col>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import HomeHeader from '@/views/pages/home/demos/HomeHeader.vue'
import DashboardCongratulationJohn from '@/views/dashboard/DashboardCongratulationJohn.vue'
import DashboardStatisticsCard from '@/views/dashboard/DashboardStatisticsCard.vue'

export default {
    components:{
        HomeHeader,
        DashboardCongratulationJohn,
        DashboardStatisticsCard,
    },
    data(){
        return{
            userProfile: {},
        }
    },
    methods: {
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
}
</script>
