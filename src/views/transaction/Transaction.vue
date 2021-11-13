<template>
  <v-row>
    <v-col cols="12">
      <dashboard-datatable></dashboard-datatable>
    </v-col>
  </v-row>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiPoll, mdiLabelVariantOutline, mdiCurrencyUsd, mdiHelpCircleOutline } from '@mdi/js'

// demos
import DashboardDatatable from './DashboardDatatable.vue'
import Swal from 'sweetalert2'

export default {
  components: {
    DashboardDatatable,
  },
  mounted: async function () {
    const url = process.env.VUE_APP_URL + 'staff/profile'
    const token = localStorage.getItem('token').toString()
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
    const response = await fetch(url, requestOptions)
    const data = await response.json()
    if (data.statusCode === 200) {
      // Swal.fire({
      localStorage.setItem('user', JSON.stringify(data.data))

      //   // position: 'top-end',
      //   icon: 'success',
      //   title: 'Check',
      //   text: data.data.name,
      //   showConfirmButton: false,
      //   timer: 1500,
      // })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Session Expired',
        text: 'Please relogin!',
      })
    }
  },
  setup() {
    const totalProfit = {
      statTitle: 'Total Profit',
      icon: mdiPoll,
      color: 'success',
      subtitle: 'Weekly Project',
      statistics: '$25.6k',
      change: '+42%',
    }

    const totalSales = {
      statTitle: 'Refunds',
      icon: mdiCurrencyUsd,
      color: 'secondary',
      subtitle: 'Past Month',
      statistics: '$78',
      change: '-15%',
    }

    // vertical card options
    const newProject = {
      statTitle: 'New Project',
      icon: mdiLabelVariantOutline,
      color: 'primary',
      subtitle: 'Yearly Project',
      statistics: '862',
      change: '-18%',
    }

    const salesQueries = {
      statTitle: 'Sales Quries',
      icon: mdiHelpCircleOutline,
      color: 'warning',
      subtitle: 'Last week',
      statistics: '15',
      change: '-18%',
    }

    return {
      totalProfit,
      totalSales,
      newProject,
      salesQueries,
    }
  },
}
</script>
