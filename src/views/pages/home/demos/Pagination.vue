<template>
  <v-simple-table>
    <template v-slot:default>
      <tfoot>
        <v-pagination
          class="pagination"
          v-model="newPage"
          :length="total_page"
          @input="pagination(newPage)"
        ></v-pagination>
      </tfoot>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    total_page: {
      type: Number,
    },
  },
  data() {
    return {
      newPage: 0,
    }
  },

  methods: {
    pagination: function (page) {
      console.log(page)
      this.$emit('refreshList', page)
    },
  },
}
</script>
