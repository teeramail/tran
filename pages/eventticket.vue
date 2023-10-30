<template>
    <div>
      <!-- Input for eventId -->
      <div class="input-section">
        <label for="eventId">Enter Event ID:</label>
        <input v-model="eventId" id="eventId" @keyup.enter="fetchEventData" />
        <button @click="fetchEventData">Fetch Data</button>
      </div>
  
      <!-- Event Table -->
      <table v-if="event && event.reservations && event.reservations.length">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>User Name</th>
            <th>User Mobile</th>
            <th>User Email</th>
            <th>Ticket Type</th>
            <th>Ticket Price</th>
            <th>Ticket Quantity</th>
            <th>Payment Amount</th>
            <th>Payment Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(reservation, index) in event.reservations" :key="index" :class="{ 'alternate-row': index % 2 === 1 }">
            <td>{{ event.eventName }}</td>
            <td>{{ event.eventDate }}</td>
            <td>{{ reservation.user.name }}</td>
            <td>{{ reservation.user.mobile }}</td>
            <td>{{ reservation.user.email }}</td>
            <td v-for="ticket in reservation.tickets" :key="ticket.type">{{ ticket.type }}</td>
            <td v-for="ticket in reservation.tickets" :key="ticket.type">{{ ticket.price }}</td>
            <td v-for="ticket in reservation.tickets" :key="ticket.type">{{ ticket.qty }}</td>
            <td>{{ reservation.paymentDetail.Amount }}</td>
            <td>{{ reservation.paymentDetail.PaymentDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';

const eventId = ref('');
const event = ref({});

const fetchEventData = async () => {
  try {
    const response = await fetch(`https://koh-samui.com:53005/eventticket/${eventId.value}`);
    if (response.ok) {
      const data = await response.json();
      console.log("Fetched Data:", data);  // Log the fetched data

      // Assuming the backend returns the data within an array and we want the first object
      event.value = Array.isArray(data) ? data[0] : data;
    } else {
      console.error("Failed to fetch event data with status:", response.status);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};







</script>

  
<style scoped>
  .input-section {
    margin-bottom: 20px;
  }
  
  .alternate-row {
    background-color: #f0f0f0; /* Gray color for alternate rows */
  }
  </style>
  