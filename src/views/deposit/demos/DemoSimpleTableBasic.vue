<template>
  <v-simple-table height="450" fixed-header>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-uppercase">Name</th>
          <th class="text-center text-uppercase">Date</th>
          <th class="text-center text-uppercase">Type</th>
          <th class="text-center text-uppercase">Balance</th>
          <th class="text-center text-uppercase">Status</th>
          <th class="text-center text-uppercase">Note</th>
          <th class="text-center text-uppercase">Operation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in listDepositUser" :key="item.dessert">
          <td>{{ item.user.name }}</td>
          <td class="text-center">
            {{
              `${new Date(item.createdAt).toISOString().substr(0, 10)} ` +
              `${new Date(item.createdAt).toISOString().slice(11, 19)}`
            }}
          </td>
          <td class="text-center">
            {{ item.type }}
          </td>
          <td class="text-left font-weight-bold">
            {{ new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.amount) }}
          </td>
          <td class="text-center">
            <v-chip :color="statusColor[status[item.status]]" class="text-center">
              {{ status[item.status] }}
            </v-chip>
          </td>
          <td>
            <p class="note-two text-center mt-16 hidden-xs-only">{{ item.note }}</p>
            <p class="text-center mt-16 hidden-sm-and-up">{{ item.note }}</p>
          </td>
          <td class="text-center">
            <v-btn
              color="primary"
              outlined
              class="mx-2"
              @click="Upload(item.id)"
              v-if="item.status == 'pending'"
              id="!hide"
              >Upload</v-btn
            >
            <v-btn
              color="error"
              outlined
              class="mx-2"
              @click="Upload(item.id)"
              v-if="item.status == 'rejected'"
              id="!hide"
              >Reupload</v-btn
            >
            <v-btn
              color="success"
              outlined
              class="mx-2"
              @click="ViewImage(item.image)"
              v-if="item.status == 'request'"
              id="!hide"
              >View</v-btn
            >
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
import Swal from 'sweetalert2'

export default {
  props: {
    listDepositUser: {
      type: Array,
    },
  },
  created: async function () {},
  setup() {
    const statusColor = {
      /* eslint-disable key-spacing */
      Success: 'success',
      Request: 'primary',
      Pending: 'warning',
      Rejected: 'error',
      /* eslint-enable key-spacing */
    }
    return {
      statusColor,
      status: {
        success: 'Success',
        request: 'Request',
        pending: 'Pending',
        rejected: 'Rejected',
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
    async uploadImage(event, id, e) {
      let data = new FormData()
      data.append('name', 'my-picture')
      // data.append('image', event.target.files[0])
      data.append('image', event)
      console.log(data)
      console.log(id)
      const url = process.env.VUE_APP_URL + 'user/upload/proofOfPayment/' + id
      const token = localStorage.getItem('tokenUser').toString()
      const body = data
      const requestOptions = {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + token },
        body,
      }
      const response = await fetch(url, requestOptions)
      const dataResponse = await response.json()
      if (dataResponse.statusCode === 200) {
        Swal.fire({
          title: 'Thank you, we will check your payment.',
          imageUrl: e.target.result,
          imageAlt: 'The uploaded picture',
        })
        this.$emit('refreshList')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops',
          text: dataResponse.message,
        })
      }
    },

    async Upload(id) {
      const { value: file } = await Swal.fire({
        title: 'Upload proof of payment',
        input: 'file',
        inputAttributes: {
          accept: 'image/*',
          'aria-label': 'Upload your profile picture',
        },
      })
      if (file) {
        const reader = new FileReader()
        reader.onload = e => {
          this.uploadImage(file, id, e)
        }
        reader.readAsDataURL(file)
      }
    },
    async ViewImage(urlImage) {
      console.log(process.env.VUE_APP_URL + urlImage)
      Swal.fire({
        title: 'Thank you, we will check your payment.',
        imageUrl: process.env.VUE_APP_URL + urlImage,
        imageAlt: 'The uploaded picture',
      })
    },
    deleteUser(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete user!',
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire('Deleted!', 'User has been deleted.', 'success')
        }
      })
    },
  },
}
</script>

<style scoped>
  .none-two {
    font-size: 60px;
  }
</style>