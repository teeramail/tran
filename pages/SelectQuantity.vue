<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="mb-4 text-3xl">Select Quantity</h1>
    <div class="flex flex-col items-center mb-4">
      <label for="quantity">Quantity:</label>
      <div class="flex items-center mb-4">
        <button class="px-4 py-2 text-white bg-blue-500 rounded-lg" @click="decrement" :disabled="quantity.value <= 1">-</button>
        <input id="quantity" v-model="quantity" type="number" min="1" max="20" class="mx-4 text-center"/>
        <button class="px-4 py-2 text-white bg-blue-500 rounded-lg" @click="increment" :disabled="quantity.value >= 20">+</button>
      </div>
      <button class="p-4 text-white bg-blue-500 rounded-lg" @click="confirmQuantity">
        Confirm
      </button>
    </div>
    <div>
      <h2>Total price: THB {{ totalPrice }}</h2>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
console.log(route.query.preReservationId)

let ticket

if (route.query.ticket) {
  ticket = ref(JSON.parse(route.query.ticket))
} else {
  ticket = ref(null)
  console.error('No ticket data provided')
}
const quantity = ref(1)
const totalPrice = computed(() => quantity.value * ticket.value.price)
const increment = () => {
  if (quantity.value < 20) {
    quantity.value++
  }
}
const decrement = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}
const confirmQuantity = async () => {
  const preReservationData = {
    tickets: [{
      type: ticket.value.type,
      price: ticket.value.price,
      qty: quantity.value
    }],
    expiresAt: new Date(Date.now() + 20 * 60000) // expires in 20 minutes
  }
  
  // Send the POST request to the server
  try {
    const response = await fetch(`https://koh-samui.com:53005/prereservation/${route.query.preReservationId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(preReservationData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log(data);

    // Navigate to the 'guestname' page after successfully updating the pre-reservation data
    router.push({ name: 'guestname', query: { preReservationId: route.query.preReservationId }});
    
  } catch (error) {
    console.log(error);
  }
}

</script>
