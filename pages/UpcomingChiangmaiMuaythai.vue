// UpcomingChiangmaiMuaythai.vue.vue
<template>
  <!-- Main Container -->
  <main class="uno-container">
    <!-- Hero Section: Displaying Event Title and Booking Information -->
    <section class="uno-hero">
      <h1 class="uno-title">Upcoming Muay Thai events at various stadiums in Chiang Mai</h1>
      <p class="uno-subtitle">Book & Confirm Instantly. Please note that bookings are non-refundable. All prices include taxes and fees, with no charges for booking and no hidden fees.</p>
    </section>
     
    <img src="~/assets/ChiangMai/mainfight.webp" alt="Muay Thai main fight" /> 
      <br>
      <img src="~/assets/ChiangMai/UpChiangmai1.webp" alt="Muay Thai Chiang mai logo" /> 
      <br>
      <img src="~/assets/ChiangMai/UpChiangmai2.webp" alt="Thaiboxing Chiang mai logo" /> 
      <br>
     <img src="~/assets/ChiangMai/UpChiangmai3.webp" alt="Muay Thai Chiang mai Thapare Chiangmai stadium" /> 

    <!-- Assistance Section: Providing Contact Information -->
    <section class="uno-assistance">
      <h2>Need Assistance?</h2>
      <p>Contact us at Tel/WhatsApp: +66985964947 for help with your booking or any questions.</p>
    </section>

      <section class="uno-assistance">
      <h2>Click the button below to book</h2>
    </section>
  
  </main>

    <div id="floating-button">
      <div class="button-container">
        <BookNowButton :preserId="preserId" :idenger="idenger" :organizerId="organizerId" :eventGroup="eventGroup" class="mb-4" />
      </div>
    </div>

  <!-- Event Listing: Displaying a List of Events -->
<div class="grid grid-cols-1 gap-4 mt-10">
  <button v-for="event in events" :key="event._id" :class="['p-4 text-white rounded-lg', organizerColors.get(event.organizerId)]" @click="showDetails(event)">
    {{ formatDate(event.eventDate) }} {{ event.eventName }}
  </button>
</div>
    <div>
            <p class="text-lg font-bold"> Any help or complimentary Pick-Up Service , please contact us via telephone or WhatsApp or email at the following numbers: +66 985 964 947 or +66 842 578 299. khwansamuiplay@gmail.com </p>

    </div>

<br><br><br><br><br><br><br><br><br><br><br>



  <!-- Enter Component: Handling Pre-reservation -->
  <Enter :idenger="idenger" :organizerId="organizerId" @prereservation-created="handlePrereservationCreated" />
   
  
</template>

<script setup>
// Importing necessary Vue components and router utilities
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Enter from '@/components/Enter.vue';
import BookNowButton from '@/components/BookNowButton.vue';

// Initializing route and router for handling navigation and query parameters
const route = useRoute();
const router = useRouter();

// Reactive references for component state
const idenger = ref('lh8o66gwjf21pcl'); // Default identifier value
const preserId = ref(null); // Preserved ID for reservation, initially null
const events = ref([]); // Array to store event data

// Mapping organizer IDs to color classes for UI distinction
const organizerColors = new Map();
let nextColorIndex = 0;
const colorClasses = ['bg-color-1', 'bg-color-2', 'bg-color-3', 'bg-color-4', 'bg-color-5', 'bg-color-6', 'bg-color-7'];

// Assigning colors to organizers based on their IDs
const assignOrganizerColors = () => {
  events.value.forEach(event => {
    if (!organizerColors.has(event.organizerId)) {
      organizerColors.set(event.organizerId, colorClasses[nextColorIndex % colorClasses.length]);
      nextColorIndex++;
    }
  });
};

// Constants for event handling
const organizerId = 'aaa'; // Default organizer ID to list all events
const eventGroup = 'cm001'; // Group ID for the event

// Watching for changes in route query parameters
watch(() => route.query, newQuery => {
  idenger.value = newQuery.idenger; // Updating idenger with new query value
});

// Handling the creation of pre-reservations
const handlePrereservationCreated = (prereservationId) => {
  console.log("Received prereservationId:", prereservationId);
  preserId.value = prereservationId; // Updating preserId with the newly created prereservation ID
};


useHead({
  title: 'Muay Thai on Chiang Mai: Premier Boxing Stadiums | Ringside',
  meta: [
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'description', content: 'An in-depth guide to the premier Muay Thai boxing stadiums On Chiang Mai.Book ticket, Experience the traditional martial art in the city\'s top venues.' },
    { name: 'keywords', content: 'Muay Thai, Chiang Mai, Boxing Stadiums,Tapare, Thaphare , Martial Art, Thai Culture' }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.muaythaiphangan.com/muaythai' }
  ]
})
// Fetching event data on component mount
onMounted(async () => {
  let url;
  
  // Determining the URL based on the organizerId
  if (organizerId === 'aaa') {
    url = `https://koh-samui.com:53005/event/events-by-group/${eventGroup}`;
  } else {
    url = `https://koh-samui.com:53005/event/event/${organizerId}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    events.value = data; // Updating events array with fetched data 
    assignOrganizerColors(); // Assigning colors after fetching events
  } catch (error) {
    console.error('Error fetching events:', error);
  }
});

// Function to show event details and handle pre-reservation updates
const showDetails = async (event) => {
  console.log("showDetails function called for event:", event._id, "with prereservationId:", preserId.value);

  // Checking if prereservationId is set
  if (!preserId.value) {
    console.error('prereservationId is undefined');
    return; // Stopping execution if prereservationId is not set
  }

  const eventId = event._id;

  // Updating the prereservation with the event ID
  try {
    const response = await fetch(`https://koh-samui.com:53005/prereservation/${preserId.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId: eventId })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    await response.json(); // Awaiting updated prereservation
    console.log("Prereservation updated successfully for event:", eventId);

    // Preparing data for the ticket page
    const eventData = {
      preReservationId: preserId.value,
      tickets: event.tickets.map(ticket => ({ type: ticket.type, price: ticket.price })),
    };

    const eventQuery = encodeURIComponent(JSON.stringify(eventData));
    const ticketPageURL = `/ticket/${eventId}?event=${eventQuery}`;
    router.push(ticketPageURL); // Navigating to the ticket page
  } catch (error) {
    console.error('Error updating prereservation:', error);
  }
};

// Function to format date strings into a readable format
const formatDate = (dateString) => {
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options); // Formatting date
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

/* Color classes */
.bg-color-1 { background-color: #4a90e2; } /* Blue */
.bg-color-2 { background-color: #7ed321; } /* Green */
.bg-color-3 { background-color: #bd10e0; } /* Purple */
.bg-color-4 { background-color: #f5a623; } /* Orange */
.bg-color-5 { background-color: #d0021b; } /* Red */
.bg-color-6 { background-color: #50e3c2; } /* Teal */
.bg-color-7 { background-color: #8b572a; } /* Brown */
</style>

