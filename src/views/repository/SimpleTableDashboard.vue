<template>
  <v-row>
    <!-- basic -->
    <v-col cols="12">
      <v-card>
        <v-card-title>Basics</v-card-title>
        <demo-simple-table-basic></demo-simple-table-basic>
      </v-card>
    </v-col>
    <!-- pagination -->
    <v-col cols="12">
      <v-card>
        <demo-simple-table-pagination></demo-simple-table-pagination>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DemoSimpleTableBasic from './demos/DemoSimpleTableBasic.vue'
import DemoSimpleTablePagination from './demos/DemoSimpleTablePagination.vue'

export default {
  components: {
    DemoSimpleTableBasic,
    DemoSimpleTablePagination,
  },
  setup() {
    return {}
  },
}
</script>
