// pages/event.vue
<template>
  <main class="uno-container">
    <div class="flex justify-center">
      <h2 class="mb-8 text-3xl">Choose Match & Stadium</h2>
    </div>
    <!-- Other sections of your component -->
    <div class="grid grid-cols-1 gap-4 mt-10">


      <button
        v-for="event in events"
        :key="event._id"
        :style="{ backgroundColor: organizerColors.get(event.organizerId) }"
        class="p-4 text-white rounded-lg"
        @click="showDetails(event)"
      >
        {{ formatDate(event.eventDate) }} {{ event.eventName }}
      </button>

    </div>
    <div>
            <p class="text-lg font-bold"> Any help or complimentary Pick-Up Service , please contact us via telephone or WhatsApp or email at the following numbers: +66 985 964 947 or +66 842 578 299. khwansamuiplay@gmail.com </p>

    </div>
  </main>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const events = ref([]);
const organizerColors = new Map();
const colorClasses = ['#4a90e2', '#7ed321', '#bd10e0', '#f5a623', '#d0021b', '#50e3c2', '#8b572a'];

// Retain the preReservationId from the query string
const preReservationId = route.query.preserId;
const organizerId = route.query.organizerId;

// Function to assign a color to each organizer
const assignOrganizerColors = () => {
  let nextColorIndex = 0;
  events.value.forEach(event => {
    if (!organizerColors.has(event.organizerId)) {
      organizerColors.set(event.organizerId, colorClasses[nextColorIndex % colorClasses.length]);
      nextColorIndex++;
    }
  });
};

onMounted(async () => {
  let url;
  
  if (organizerId === 'aaa') {
    url = `https://koh-samui.com:53005/event/events-by-group/${route.query.eventGroup}`;
  } else {
    url = `https://koh-samui.com:53005/event/event/${organizerId}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    events.value = data;
    assignOrganizerColors(); // Assign colors to organizers after fetching the events
  } catch (error) {
    console.error('Error fetching events:', error);
  }
});

const showDetails = async (event) => {
  const eventId = event._id;
  const eventData = {
    preReservationId: preReservationId, 
    tickets: event.tickets.map(ticket => ({
      type: ticket.type,
      price: ticket.price
    })),
  };

  try {
    const response = await fetch(`https://koh-samui.com:53005/prereservation/${preReservationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ eventId: eventId })
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Updated prereservation:', data);
    router.push({
      path: `/ticket/}`,
      query: { event: JSON.stringify(eventData) }
    });
  } catch (error) {
    console.error('Error updating prereservation:', error);
  }
};

const formatDate = (dateString) => {
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
</script>



<style>
img {
  max-width: 100%;
  height: auto;
}

#floating-button {
  position: fixed;
  width: 100%;
  bottom: 20px;
  z-index: 100;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>

