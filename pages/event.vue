// pages/event.vue
<template>
  <h2 class="mb-8 text-3xl">Choose Match & Stadium</h2>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 gap-4 mt-10">
        <button
          v-for="event in events"
          :key="event._id"
          class="p-4 text-white bg-blue-500 rounded-lg"
          @click="showDetails(event)"
        >
        {{ formatDate(event.eventDate) }}  {{event.eventName}}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()
const events = ref([])
const router = useRouter()
console.log(route.query)
const preReservationId = route.query.preserId
const organizerId = route.query.organizerId;

const eventGroup = route.query.eventGroup

onMounted(async () => {
  let url;
  
  if (organizerId === 'aaa') {
    url = `https://koh-samui.com:53005/event/events-by-group/${eventGroup}`;
  } else {
    url = `https://koh-samui.com:53005/event/event/${organizerId}`;
  }

  try {
    // specify the organizerId here, you may want to get this from user input or some other source
    // const organizerId = '645d64c086e4d377b0496543'; 
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    events.value = data
  } catch (error) {
    console.error('Error fetching events:', error)
  }
})


const showDetails = async (event) => {
  // Get event ID
  const eventId = event._id;

  // Create new object with only the properties you want
  const eventData = {
    preReservationId: route.query.preserId, 
    tickets: event.tickets.map(ticket => ({
      type: ticket.type,
      price: ticket.price
    })),
  };

  // Try to update the prereservation document with the event ID
  try {
    const response = await fetch(`https://koh-samui.com:53005/prereservation/${preReservationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ eventId: eventId }) // Send eventId in the request body
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    console.log('Updated prereservation:', data)
  } catch (error) {
    console.error('Error updating prereservation:', error)
  }

  // Then, redirect to the next page with event data
  router.push({
    path: `/ticket/}`,
    query: { event: JSON.stringify(eventData) }
  })
}


const formatDate = (dateString) => {
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', options)
}
</script>
