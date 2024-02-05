<template>
    <div>
      <!-- Dropdown for eventId -->
      <div class="input-section">
        <label for="eventId">Select Event:</label>
        <select v-model="selectedEventId">
          <option v-for="e in events" :key="e._id" :value="e._id">{{ e.eventName }} ({{ new Date(e.eventDate).toLocaleDateString() }})</option>
        </select>
        <button @click="fetchEventData">Fetch Data</button>
      </div>
      <!-- Event Table ... (this remains the same as your provided code) -->
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

const events = ref([]);                 // This will hold all the events for the dropdown
const selectedEventId = ref('');  // Renamed from selectedEvent
const event = ref({});

// Fetch all events for dropdown
const fetchAllEvents = async () => {
  try {
    const response = await fetch('https://koh-samui.com:53005/eventticket/c/events-in-range/'); 
    if (response.ok) {
      const data = await response.json();
      console.log("All Events Data:", data);  // Log the fetched data
      events.value = data;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const fetchEventData = async () => {
  try {
    // Using selectedEventId.value directly for fetching data
    const response = await fetch(`https://koh-samui.com:53005/eventticket/${selectedEventId.value}`);
    
    if (response.ok) {
      const data = await response.json();

      // Log the fetched data for debugging
      console.log("Fetched Data:", data);

      // Assign the first object from the fetched data array to event.value
      event.value = Array.isArray(data) ? data[0] : data;
    } else {
      console.error("Failed to fetch event data with status:", response.status);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Call this function when component is mounted to populate the dropdown
fetchAllEvents();

</script>

<style scoped>
  .input-section {
    margin-bottom: 20px;
  }
  
  .alternate-row {
    background-color: #f0f0f0; /* Gray color for alternate rows */
  }
  </style>