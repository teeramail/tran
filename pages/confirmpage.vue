// pages\confirmpage.vue
<template>
    <div class="flex justify-center">
      <div>
        <h1>Confirmation</h1>
        <div v-if="loading">Loading...</div>
        <div v-else>
          <p><strong>Name:</strong> {{ reservation.user.name }}</p>
          <p><strong>Email:</strong> {{ reservation.user.email }}</p>
          <p><strong>Mobile:</strong> {{ reservation.user.mobile }}</p>
          <p v-if="reservation.user.pickup"><strong>Pickup at:</strong> {{ reservation.user.pickup }}</p>
          <p><strong>Event ID:</strong> {{ reservation.eventId }}</p>
          <p v-if="reservation.event"><strong>Event Name:</strong> {{ reservation.event.eventName }}</p>
          <p v-if="reservation.event"><strong>Event Date:</strong> {{ new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Bangkok' }).format(new Date(reservation.event.eventDate)) }}</p>
          <p><strong>Tickets:</strong></p>
          <ul>
            <li v-for="(ticket, index) in reservation.tickets" :key="index">
              <strong>Type:</strong> {{ ticket.type }},
              <strong>Price:</strong> {{ ticket.price }},
              <strong>Quantity:</strong> {{ ticket.qty }}
            </li>
          </ul>
          <button @click="confirmAndPay">Confirm and Pay</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
console.log(route.query.preReservationId)
const preReservationId = route.query.preReservationId;

  
  const reservation = ref(null);
  const loading = ref(true);
  
  onMounted(async () => {
  try {
    const response = await fetch(`https://koh-samui.com:53005/prereservation/${preReservationId}`);

    if (response.ok) {
        reservation.value = await response.json();
        console.log('Reservation:', reservation.value); // Print the entire reservation object
        if (reservation.value.event) {
          console.log('Event:', reservation.value.event); // Print event object if it exists
          if (reservation.value.event.eventDate) {
            console.log('Event Date:', reservation.value.event.eventDate); // Print eventDate if it exists
          }
        }
    } else {
        const errorData = await response.json();
        console.error(errorData.message);
    }

    loading.value = false;
  } catch (error) {
    console.error(error);
    loading.value = false;
  }
});

const confirmAndPay = () => {
  router.push({ name: 'payment',  query: { preReservationId: route.query.preReservationId } });
}

  </script>
  