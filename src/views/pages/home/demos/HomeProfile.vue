<template>
  <v-menu offset-y left nudge-bottom="14" min-width="230" content-class="user-profile-menu-content">
    <template v-slot:activator="{ on, attrs }">
      <v-badge bottom color="success" overlap offset-x="12" offset-y="12" class="ms-4" dot>
        <v-avatar size="40px" v-bind="attrs" v-on="on">
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

        <div class="d-inline-flex flex-column justify-center ms-3" style="vertical-align: emiddle">
          <span class="text--primary font-weight-semibold mb-n1">{{ user.data.name }} </span>
          <small class="text--disabled text-capitalize">{{ user.data.type }}</small>
        </div>
      </div>

      <v-divider></v-divider>

      <!-- Home Home
      <v-list-item link :to="{ name: 'home' }">
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiHome}}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <!-- Profile -->
      <v-list-item link :to="{ name: 'homeProfileSettings' }">
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiAccountOutline }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Transaction
      <v-list-item link :to="{ name: 'homeTransaction' }">
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiCurrencyUsd }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Transaction</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <!-- Deposit -->
      <v-list-item link :to="{ name: 'homeDeposit' }">
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiCashMultiple }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Deposit</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- History -->
      <v-list-item link :to="{ name: 'homeHistory' }">
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiHistory }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>History</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Chat
      <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiChatOutline }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Chat</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-badge inline color="error" content="2"> </v-badge>
        </v-list-item-action>
      </v-list-item> -->

      <v-divider class="my-2"></v-divider>

      <!-- Settings
      <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiCogOutline }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <!-- Theme Switcher -->
      <v-list-item link
      @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-list-item-icon class="me-2">
          <v-icon
            :key="$vuetify.theme.dark"
          >
            {{ $vuetify.theme.dark ? icons.mdiWeatherSunny : icons.mdiWeatherNight }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Theme Switcher</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Pricing
      <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiCurrencyUsd }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Pricing</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <!-- FAQ
      <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiHelpCircleOutline }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>FAQ</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

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
  mdiWeatherNight,
  mdiWeatherSunny,
  mdiCashMultiple,
  mdiHistory,
  mdiHome,
} from '@mdi/js'
import ThemeSwitcher from '@/layouts/components/ThemeSwitcher.vue'


export default {
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
        mdiWeatherNight,
        mdiWeatherSunny,
        mdiCashMultiple,
        mdiHistory,
        mdiHome,
      },
      user: {
        data,
      },
    }
  },
  components: {
      ThemeSwitcher,
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  }
}
</script>

<style lang="scss">
.user-profile-menu-content {
  .v-list-item {
    min-height: 2.5rem !important;
  }
}
</style>
