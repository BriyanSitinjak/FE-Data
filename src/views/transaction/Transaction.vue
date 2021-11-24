<template>
  <v-card id="account-setting-card">
    <!-- tabs -->
    <v-tabs v-model="tab" show-arrows>
      <v-tab v-for="tab in tabs" :key="tab.icon">
        <v-icon size="20" class="me-3">
          {{ tab.icon }}
        </v-icon>
        <span>{{ tab.title }}</span>
      </v-tab>
    </v-tabs>

    <!-- tabs item -->
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <transaction-all v-bind:transactionAllList="transactionAllList"></transaction-all>
      </v-tab-item>

      <v-tab-item>
        <transaction-request></transaction-request>
      </v-tab-item>
      <!-- <v-tab-item>
        <account-settings-info :information-data="accountSettingData.information"></account-settings-info>
      </v-tab-item> -->
    </v-tabs-items>
  </v-card>
  <!-- <v-row>
    <v-col cols="12">
      <dashboard-datatable></dashboard-datatable>
    </v-col>
  </v-row> -->
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiPoll, mdiLabelVariantOutline, mdiCurrencyUsd, mdiHelpCircleOutline } from '@mdi/js'

// demos
import Swal from 'sweetalert2'
import TransactionAll from './demo/TransactionAll.vue'
import { mdiAccountOutline, mdiLockOpenOutline, mdiInformationOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'

export default {
  components: {
    TransactionAll,
  },
  data() {
    return {
      transactionAllList: [],
    }
  },
  created: async function () {
    await this.getDataAllTransaction()
  },

  setup() {
    const tab = ref('')

    const tabs = [
      { title: 'Transaction All', icon: mdiAccountOutline },
      // { title: 'Transaction Request', icon: mdiLockOpenOutline },
      // { title: 'Info', icon: mdiInformationOutline },
    ]

    return {
      tabs,
      tab,
      icons: {
        mdiAccountOutline,
        mdiLockOpenOutline,
        mdiInformationOutline,
      },
    }
  },
  methods: {
    getDataAllTransaction: async function () {
      this.transactionAllList = []
      let url = process.env.VUE_APP_URL + 'user/transaction/getAllTransaction'
      const token = localStorage.getItem('tokenUser').toString()
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      }
      fetch(url, requestOptions)
        .then(async response => {
          const dataArray = await response.json()

          if (dataArray.statusCode === 200) {
            dataArray.data.forEach(element => {
              this.transactionAllList.push(element)
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Failed',
              text: data.message,
            })
          }
        })
        .catch(error => console.error(error))
    },
  },
}
</script>
