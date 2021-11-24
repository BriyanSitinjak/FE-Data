<template>
  <v-menu offset-y left nudge-bottom="14" min-width="230" content-class="user-profile-menu-content">
    <template v-slot:activator="{ on, attrs }">
      <v-badge bottom color="success" overlap offset-x="12" offset-y="12" class="ms-4" dot>
        <v-avatar size="40px" v-bind="attrs" v-on="on" @click="test()">
          <v-img :src="require('@/assets/images/avatars/1.png')"></v-img>
        </v-avatar>
      </v-badge>
    </template>
    <v-list>
      <div class="pb-3 pt-2">
        <v-badge bottom color="success" overlap offset-x="12" offset-y="12" class="ms-4" dot>
          <v-avatar size="40px">
            <v-img :src="require('@/assets/images/avatars/1.png')"></v-img>
          </v-avatar>
        </v-badge>
        <div class="d-inline-flex flex-column justify-center ms-3" style="vertical-align: middle">
          <span class="text--primary font-weight-semibold mb-n1">{{ user.data.name }} </span>
          <small class="text--disabled text-capitalize">{{ user.data.type }}</small>
        </div>
      </div>

      <v-divider></v-divider>

      <!-- Profile -->
      <v-list-item link :to="{ name: 'pages-account-settings' }">
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiAccountOutline }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Email -->
      <v-list-item link :to="{ name: 'deposit' }">
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiCurrencyUsd }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Deposit</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-badge inline color="error" :content="notif"> </v-badge>
        </v-list-item-action>
      </v-list-item>

      <!-- Chat -->
      <v-list-item link :to="{ name: 'transaction' }">
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiClipboardOutline }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Transaction</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <!-- Logout -->
      <v-list-item link :to="{ name: 'pages-login' }">
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiLogoutVariant }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title @click="logout()">Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import {
  mdiAccountOutline,
  mdiEmailOutline,
  mdiCheckboxMarkedOutline,
  mdiChatOutline,
  mdiCogOutline,
  mdiCurrencyUsd,
  mdiHelpCircleOutline,
  mdiLogoutVariant,
  mdiClipboardOutline,
} from '@mdi/js'

export default {
  data() {
    return {
      notif: 0,
      status: false,
    }
  },
  setup() {
    const data = JSON.parse(localStorage.getItem('user')) || []
    console.log(data)
    return {
      icons: {
        mdiAccountOutline,
        mdiEmailOutline,
        mdiCheckboxMarkedOutline,
        mdiChatOutline,
        mdiCogOutline,
        mdiCurrencyUsd,
        mdiHelpCircleOutline,
        mdiLogoutVariant,
        mdiClipboardOutline,
      },
      user: {
        data,
      },
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('tokenUser')
      localStorage.removeItem('user')
    },
    async test() {
      if (this.status == false) {
        let url = process.env.VUE_APP_URL + 'user/notif/pendingDeposit'
        const token = localStorage.getItem('tokenUser').toString()
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        }
        const response = await fetch(url, requestOptions)
        const dataResponse = await response.json()
        console.log(dataResponse)

        if (dataResponse.statusCode === 200) {
          this.notif = dataResponse.data
        }
        this.status = true
      } else {
        this.status = false
      }
    },
  },
}
</script>

<style lang="scss">
.user-profile-menu-content {
  .v-list-item {
    min-height: 2.5rem !important;
  }
}
</style>
