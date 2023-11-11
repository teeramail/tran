// muaythai.vue
<template>

<main class="uno-container">
  <section class="uno-hero">
    <h1 class="uno-title">Upcoming Muay Thai events at variousl stadiums in Chiang Mai</h1>
    <p class="uno-subtitle">Upcoming Muay Thai Events – Book & Confirm Instantly please be sure after book can not refund   </p>
  </section>

 
  <section class="uno-assistance">
    <h2>Need Assistance?</h2>
    <p>If you require any help with your booking or have questions, feel free to call or WhatsApp us at Tel/WhatsApp: +66985964947 . We're here to ensure your experience is seamless and thrilling.</p>
  </section>


</main>
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
  <Enter :idenger="idenger" :organizerId="organizerId"  @prereservation-created="handlePrereservationCreated" />
   
  <div class="container mx-auto flex flex-col items-center min-h-screen flex-grow">

 
    <div id="floating-button">
      <div class="button-container">
        <BookNowButton :preserId="preserId" :idenger="idenger" :organizerId="organizerId" :eventGroup="eventGroup" class="mb-4" />
      </div>
    </div>
  </div>
</template>



<script setup>
// organizerId = 'aaa' will list all events
import { ref, watch } from 'vue';
import Enter from '@/components/Enter.vue'
import BookNowButton from '@/components/BookNowButton.vue'
import { useRoute } from 'vue-router';

const route = useRoute();

const idenger = ref('lh8o66gwjf21pcl'); 
const preserId = ref(null); 
const events = ref([])
const router = useRouter()
// If organizerId is aaa then all events will be listed
const organizerId = 'aaa';
const eventGroup = 'cm001';

console.log(route.query.idenger)
watch(() => route.query, newQuery => {
  idenger.value = newQuery.idenger;
});

const handlePrereservationCreated = (prereservationId) => {
  console.log("Received prereservationId:", prereservationId);
  preserId.value = prereservationId;
}




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
  console.log("showDetails function called for event:", event._id, "with prereservationId:", preserId.value);

  // Check if prereservationId is set
  if (!preserId.value) {
    console.error('prereservationId is undefined');
    return; // Stop further execution if prereservationId is not set
  }

  const eventId = event._id;

  // Update the prereservation document with the event ID
  try {
    const response = await fetch(`https://koh-samui.com:53005/prereservation/${preserId.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ eventId: eventId }) // Send eventId in the request body
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    await response.json(); // Updated prereservation
    console.log("Prereservation updated successfully for event:", eventId);

    // Create new object with only the properties you want
    const eventData = {
      preReservationId: preserId.value,
      tickets: event.tickets.map(ticket => ({
        type: ticket.type,
        price: ticket.price
      })),
    };

    const eventQuery = encodeURIComponent(JSON.stringify(eventData));
    const ticketPageURL = `/ticket/${eventId}?event=${eventQuery}`;
    router.push(ticketPageURL);

  } catch (error) {
    console.error('Error updating prereservation:', error);
  }
}



const formatDate = (dateString) => {
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', options)
}

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

