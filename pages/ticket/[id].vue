// pages/ticket/[id].vue
<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="mb-8 text-3xl">Select a Ticket</h1>
    <div v-if="!event">
      No event data
    </div>
    <div v-else>
      <div v-for="ticket in event.tickets" :key="ticket._id" class="mb-4">
        <button
          class="p-4 text-white bg-blue-500 rounded-lg"
          @click="selectTicket(ticket)"
        >
          {{ ticket.type }}@THB {{ ticket.price }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// parse the stringified event data back into an object
const event = ref(JSON.parse(route.query.event))
console.log(event)

const preReservationId = event.value.preReservationId;
console.log(preReservationId);

const selectTicket = (ticket) => {
  // navigate to the new page with the selected ticket
  router.push({
    name: 'SelectQuantity',
    query: { 
      ticket: JSON.stringify(ticket),
      preReservationId: preReservationId,
     }
  })
}
</script>
