<template>
    <v-card 
    class="mx-auto my-12"
    outlined
    >
    <home-header></home-header>
      <v-data-table
        :headers="headers"
        :items="transactionAllList"
        item-key="id"
        class="table-rounded elevation-1"
        loading
        loading-text="Loading.....  Please Wait"
        disable-sort
        fixed-header>
        <!-- Home -->
        <template #[`item.user.name`]="{ item }">
          <div class="d-flex flex-column">
            <span class="d-block font-weight-semibold text--primary text-truncate">{{ item.user.name }}</span>
            <small>{{ item.user.type }}</small>
          </div>
        </template>
        <template #[`item.createdAt`]="{ item }">
          {{ `${new Date(item.createdAt).toISOString().substr(0, 10)}` }}
        </template>
        <template #[`item.amount`]="{ item }">
          {{ `Rp ${item.amount}` }}
        </template>
        <!-- Status -->
        <template #[`item.status`]="{ item }">
          <v-chip small :color="statusColor[status[item.status]]" class="font-weight-medium">
            {{ status[item.status] }}
          </v-chip>
        </template>
        <template #[`item.action`]="{ item }">
          <v-btn outlined @click="printData(item.id)">Print</v-btn>
        </template>
      </v-data-table>
    </v-card>
</template>

<script>
import { mdiSquareEditOutline, mdiDotsVertical } from '@mdi/js'
import HomeHeader from '@/views/pages/home/demos/HomeHeader.vue'

export default {
  components: { HomeHeader },
  props: {
    transactionAllList: {
      type: Array,
    },
  },
  setup() {
    const statusColor = {
      /* eslint-disable key-spacing */
      Request: 'primary',
      Success: 'success',
      Rejected: 'error',
      Pending: 'warning',
      Admin: 'info',
      /* eslint-enable key-spacing */
    }

    return {
      headers: [
        { text: 'NAME', value: 'user.name' },
        { text: 'EMAIL', value: 'user.email' },
        { text: 'DATE', value: 'createdAt' },
        { text: 'AMOUNT', value: 'amount' },
        { text: 'TYPE', value: 'type' },
        { text: 'STATUS', value: 'status' },
        { text: 'ACTION', value: 'action' },
      ],
      status: {
        request: 'Request',
        success: 'Success',
        rejected: 'Rejected',
        pending: 'Pending',
        admin: 'Admin',
      },
      statusColor,
      icons: {
        mdiSquareEditOutline,
        mdiDotsVertical,
      },
    }
  },
  methods: {
    print(){
      
    }
  },
}
</script>
