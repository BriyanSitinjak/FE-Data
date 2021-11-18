<template>
  <div>
    <!-- header menu - nav bar-->
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      src="@/assets/images/misc/triangle-dark.png">
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img src="@/assets/images/logos/logo_192.png" alt="Logo" />
          </v-list-item-avatar>

          <!-- <v-list-item-content>
            <v-list-item-title class="title">192</v-list-item-title>
          </v-list-item-content> -->
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense>
        <v-list-item
          v-for="([icon, text, link], i) in items"
          :key="i"
          link
          @click="$vuetify.goTo(link)"
        >
          <v-list-item-icon class="justify-center">
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">
              {{text}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      hide-on-scroll
      :color="color"
      :flat="flat"
      class="px-15"
      :class="{ expand: flat }">
      <router-link to="home">
        <v-img src="@/assets/images/logos/logo_192.png" max-width="50px" />
      </router-link>
      
      <v-spacer />

      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="mr-4"
        v-if="isXs"/>
      <div v-else>
      </div>

      <home-profile></home-profile>

    </v-app-bar>
  </div>


</template>

<style scoped>
.v-toolbar {
  transition: 0.6s;
}

.expand {
  height: 80px !important;
  padding-top: 10px;
}
</style>

<script>

import { mdiHome, mdiViewDashboard } from '@mdi/js'
import HomeProfile from '@/views/pages/home/demos/HomeProfile.vue'

export default {
  data: () => ({
    drawer: null,
    isXs: false,
    items: [
      [mdiHome, "Home", "#"],
    ],
  }),
  components: {
    HomeProfile,
  },
  props: {
    color: String,
    flat: Boolean,
  },
  methods: {
    onResize() {
      this.isXs = window.innerWidth < 850;
    },
  },

  watch: {
    isXs(value) {
      if (!value) {
        if (this.drawer) {
          this.drawer = false;
        }
      }
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
};
</script>
