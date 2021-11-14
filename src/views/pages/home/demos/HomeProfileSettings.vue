<template>
  <v-card flat class="pa-3 mt-2">
    <home-header></home-header>
    <v-card-text class="d-flex">
      <v-avatar rounded size="120" class="me-6">
        <v-img></v-img>
      </v-avatar>

      <v-card-text>
        <v-form class="multi-col-validation mt-6">
          <v-row>

            <v-col md="6" cols="12">
              <v-text-field v-model="user.data.name" label="Name" dense outlined></v-text-field>
            </v-col>

            <v-col md="6" cols="12">
              <v-text-field v-model="user.data.email" label="E-" dense outlined></v-text-field>
            </v-col>

          </v-row>
        </v-form>
      </v-card-text>

    </v-card-text>
  </v-card>
</template>

<script>
import { mdiAlertOutline, mdiCloudUploadOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import HomeHeader from '@/views/pages/home/demos/HomeHeader.vue'

export default {
    components:{
        HomeHeader,
    },
  props: {
    accountData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      emailConfirmWarning: false,
    }
  },
  created: function () {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user.dateConfirmed) {
      this.emailConfirmWarning = false
    } else {
      this.emailConfirmWarning = true
    }
  },
  setup(props) {
    const status = ['Active', 'Inactive', 'Pending', 'Closed']
    const data = JSON.parse(localStorage.getItem('user')) || []

    const accountDataLocale = ref(JSON.parse(JSON.stringify(props.accountData)))

    const resetForm = () => {
      accountDataLocale.value = JSON.parse(JSON.stringify(props.accountData))
    }

    return {
      status,
      accountDataLocale,
      resetForm,
      icons: {
        mdiAlertOutline,
        mdiCloudUploadOutline,
      },
      user: {
        data,
      },
    }
  },
}
</script>
