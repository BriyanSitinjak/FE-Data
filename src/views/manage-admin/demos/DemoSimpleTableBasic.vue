<template>
  <v-simple-table height="450" fixed-header>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-uppercase">Name</th>
          <th class="text-center text-uppercase">Email</th>
          <th class="text-center text-uppercase">Type</th>
          <th class="text-center text-uppercase">Status</th>
          <th class="text-center text-uppercase">Operation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in listAdmin" :key="item.dessert">
          <td>{{ item.name }}</td>
          <td class="text-center">
            {{ item.email }}
          </td>
          <td class="text-center">
            {{ item.type }}
          </td>
          <td class="text-center">
            <v-chip :color="statusColor[status[checkUser(item.dateConfirmed)]]" class="text-center">
              {{ status[checkUser(item.dateConfirmed)] }}
            </v-chip>
          </td>
          <td class="text-center">
            <v-btn color="error" outlined class="mx-2" @click="goToDetail(item.id)">Delete</v-btn>
          </td>

          <!-- <td class="text-center">
            {{ item.fat }}
          </td>
          <td class="text-center">
            {{ item.carbs }}
          </td>
          <td class="text-center">
            {{ item.protein }}
          </td> -->
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mdiSquareEditOutline, mdiDotsVertical } from '@mdi/js'

export default {
  props: {
    listAdmin: {
      type: Array,
    },
  },
  created: async function () {},
  setup() {
    const statusColor = {
      /* eslint-disable key-spacing */
      Active: 'success',
      Pending: 'warning',
      /* eslint-enable key-spacing */
    }
    return {
      statusColor,
      status: {
        1: 'Active',
        2: 'Pending',
      },
      icons: {
        mdiSquareEditOutline,
        mdiDotsVertical,
      },
    }
  },

  methods: {
    checkUser(dateConfirmed) {
      if (dateConfirmed) {
        return 1
      } else {
        return 2
      }
    },
  },
}
</script>
