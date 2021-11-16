<template>
  <v-card align="center" justify="center">
    <home-header></home-header>
    <profile-settings-account :account-data="accountSettingData.account" ></profile-settings-account>

    <v-divider></v-divider>

    <profile-settings-security></profile-settings-security>
    
    <v-row>
      <v-col>
        <v-btn color="primary" class="me-3 mt-3"> Save changes </v-btn>
        <v-btn color="secondary" outlined class="mt-3" type="reset" @click.prevent="resetForm"> Cancel </v-btn>
      </v-col>
    </v-row>
  
  </v-card>
</template>

<script>
import { mdiAccountOutline, mdiLockOpenOutline, mdiInformationOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import ProfileSettingsAccount from '@/views/pages/home/profile-settings/ProfileSettingsAccount.vue'
import ProfileSettingsSecurity from '@/views/pages/home/profile-settings/ProfileSettingsSecurity.vue'
import HomeHeader from '@/views/pages/home/demos/HomeHeader.vue'

export default {
  components: {
    ProfileSettingsAccount,
    ProfileSettingsSecurity,
    HomeHeader,
  },
  setup() {
    const accountSettingData = {
      account: {
        avatarImg: require('@/assets/images/avatars/1.png'),
      },
    }

    return {
      accountSettingData,
      icons: {
        mdiAccountOutline,
        mdiLockOpenOutline,
        mdiInformationOutline,
      },
    }
  },
}
</script>
