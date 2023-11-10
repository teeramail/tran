// muaythai.vue
<template>

<main class="uno-container">
  <section class="uno-hero">
    <h1 class="uno-title">Discover the Gateway to Muay Thai in Chiang Mai</h1>
    <p class="uno-subtitle">Upcoming Muay Thai Events – Book & Confirm Instantly</p>
  </section>

  <section class="uno-description">
    <p>As your trusted gateway to the vibrant world of Muay Thai in Chiang Mai, we bring you the latest and most exciting events from all stadiums across the city. With each booking, receive instant confirmation straight to your email. Experience the raw energy of Muay Thai up close and personal!</p>
  </section>

  <section class="uno-assistance">
    <h2>Need Assistance?</h2>
    <p>If you require any help with your booking or have questions, feel free to call or WhatsApp us at 081xxxx. We're here to ensure your experience is seamless and thrilling.</p>
  </section>

  <section class="uno-pickup-service">
    <h2>Complimentary Pick-Up Service:</h2>
    <p>Some stadium events offer the convenience of a pick-up service. Simply indicate your pick-up location in the provided text field when selecting your match. This service is typically complimentary, enhancing your Muay Thai adventure.</p>
  </section>

  <section class="uno-connection">
    <h2>Stay Connected:</h2>
    <p>For the pick-up service, we’ll communicate with you via phone/WhatsApp. If you're using an international phone number, please include your country code to ensure we can reach you. Our team will contact you to coordinate the pick-up location and time.</p>
  </section>

  <section class="uno-important-notice">
    <p>Important Notice:</p>
    <p>Please be ready for your pick-up as scheduled. If our staff cannot reach you by telephone or WhatsApp at the appointed time, we kindly ask you to make your way to the stadium independently. Please note, in such instances, refunds cannot be issued.</p>
  </section>

  <section class="uno-booking">
    <h2>Booking Your Muay Thai Experience Is Just a Step Away:</h2>
    <p>Select your preferred Muay Thai match, complete your booking, and get ready for an electrifying experience in Chiang Mai. Your journey into the heart of Muay Thai culture starts here!</p>
    <button class="uno-button">Book Now</button>
  </section>
</main>


  <div class="container mx-auto flex flex-col items-center min-h-screen flex-grow">

     <div
      v-for="(image, index) in images"
      :key="index"
      class="w-full p-4 relative"
    >
      <img
        :src="image.src"
        :alt="'Image ' + (index + 1)"
        class="rounded-lg shadow-md w-full"
      />
    </div>

    <Enter :idenger="idenger" :organizerId="organizerId"  @prereservation-created="handlePrereservationCreated" />



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
// If organizerId is aaa then all events will be listed
const organizerId = 'aaa';
const eventGroup = 'cm001';

console.log(route.query.idenger)
watch(() => route.query, newQuery => {
  idenger.value = newQuery.idenger;
});

const handlePrereservationCreated = (prereservationId) => {
  console.log(prereservationId);
  preserId.value = prereservationId;
}

const images = ref([

  { src: 'https://koh-samui.com/travelmain/mainimage/muaythai/samui/phetsamui07_samui_thai_boxing.webp' }, 
  { src: 'https://koh-samui.com/travelmain/mainimage/muaythai/samui/phetsamui15_samui_thai_boxing.webp' },
  { src: 'https://koh-samui.com/travelmain/mainimage/muaythai/samui/phetsamui19_samui_thai_boxing.webp' },
]);


useHead({
  title: 'Muay Thai in Chiang Mai: Premier Boxing Stadiums | Ringside',
  meta: [
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'description', content: 'An in-depth guide to the premier Muay Thai boxing stadiums in Chiang Mai. Experience the traditional martial art in the city\'s top venues.' },
    { name: 'keywords', content: 'Muay Thai, Chiang Mai, Boxing Stadiums, Martial Art, Thai Culture' }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.muaythaicm.com/muaythai' }
  ]
})

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

