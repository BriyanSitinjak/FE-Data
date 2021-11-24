<template>
  <v-card>
    <v-data-table :headers="headers" :items="transactionAllList" item-key="id" class="table-rounded" disable-sort>
      <!-- name -->
      <template #[`item.user.name`]="{ item }">
        <div class="d-flex flex-column">
          <span class="d-block font-weight-semibold text--primary text-truncate">{{ item.user.name }}</span>
          <small>{{ item.user.type }}</small>
        </div>
      </template>
      <template #[`item.createdAt`]="{ item }">
        {{
          `${new Date(item.createdAt).toISOString().substr(0, 10)} ` +
          `${new Date(item.createdAt).toISOString().slice(11, 19)}`
        }}
      </template>
      <template #[`item.amount`]="{ item }">
        <p class="font-weight-bold" v-if="item.type == 'Debit'" :style="{ color: 'red' }">
          <!-- {{ `- Rp ${item.amount}` }} -->
          {{ ` ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.amount)}` }}
        </p>
        <p class="font-weight-bold" v-if="item.type == 'Credit'" :style="{ color: 'green' }">
          <!-- {{ `Rp ${item.amount}` }} -->
          {{ ` ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.amount)}` }}
        </p>
      </template>
      <!-- status -->
      <template #[`item.status`]="{ item }">
        <v-chip small :color="statusColor[status[item.status]]" class="font-weight-medium">
          {{ status[item.status] }}
        </v-chip>
      </template>
      <template #[`item.detail`]="{ item }">
        <v-btn outlined @click="goToDetail(item.id)">Detail</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mdiSquareEditOutline, mdiDotsVertical } from '@mdi/js'
import crypto from 'crypto'
const algorithm = 'aes-256-ctr'
const secretKey = 'qwertyuiopasdfghjklzxcvbnmqwerty'
const iv = crypto.randomBytes(16)

export default {
  props: {
    transactionAllList: {
      type: Array,
    },
  },
  created: async function () {
    console.log(this.transactionAllList.length)
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
        { text: 'NAMA', value: 'user.name' },
        { text: 'EMAIL', value: 'user.email' },
        { text: 'DATE', value: 'createdAt' },
        { text: 'AMOUNT', value: 'amount' },
        { text: 'TYPE', value: 'type' },
        { text: 'STATUS', value: 'status' },
        { text: 'Detail', value: 'detail' },
      ],
      status: {
        request: 'Request',
        success: 'Success',
        rejected: 'Rejected',
        pending: 'Pending',
        admin: 'Admin',
      },
      statusColor,

      // icons
      icons: {
        mdiSquareEditOutline,
        mdiDotsVertical,
      },
    }
  },
  methods: {
    goToDetail(id) {
      console.log(id)
      //encrypt
      const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
      const encrypted = Buffer.concat([cipher.update(id.toString()), cipher.final()])

      const ivHex = iv.toString('hex')
      const contentHex = encrypted.toString('hex')
      this.$router.push({ name: 'transactionDetail', params: { id: contentHex + ':' + ivHex } })
      // this.$router.push({ name: 'transactionDetail', params: { id } })
    },
  },
}
</script>
