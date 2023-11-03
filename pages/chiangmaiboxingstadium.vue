<template>
  <div class="container mx-auto flex flex-col items-center min-h-screen flex-grow">
    <h1>Experience Authentic Muay Thai in Comfort at Chiangmai Boxing Stadium</h1>
    
    <p>
      Air-conditioned stadium situated in the heart of Chiang Mai at 177 Changphuak Soi 4, Tambon Si Phum, the Chiangmai Boxing Stadium offers not only the thrill of Muay Thai but also the comfort of an air-conditioned environment. With matches held from Monday to Saturday, the stadium remains a bustling hub of activity, pausing only on Sundays. Doors welcome fans at 21:00, setting the stage for an exhilarating and comfortable night of boxing.
    </p>
    
    
    
  
    <div @click="goToReser" class="text-gray-500 cursor-pointer">
      🌺 Booking Muay Thai match click here 🌺
    </div>
    
    <img src="~/assets/ChiangMai/airconditionedstadium.webp" alt="Chiangmai Muay Thai boxing stadium" /> 
    
    <p>
      The stadium is more than just a venue; it's a cultural experience. Dive deep into the essence of Muay Thai and its significance to the Thai people. And while the matches captivate you, enjoy a selection of beverages, from beer and soda to refreshing water.
    </p>
    
    <p>
      For an authentic and comfortable Muay Thai experience, Chiangmai Boxing Stadium is the place to be.
    </p>
    
    <p>
      Witness skilled fighters showcase their prowess in the ring. Choose from a variety of ticket options: VIP seats at 1500 baht, ringside views for 1000 baht, or regular seating at 600 baht.
    </p>

    <img src="~/assets/ChiangMai/SeatChiangmaiBoxingStadium.webp" alt="stadium seat plan" /> 

    <Enter :idenger="idenger" :organizerId="organizerId" @prereservation-created="handlePrereservationCreated" />

    <div id="floating-button">
      <div class="button-container">
        <!-- The BookNowButton component -->
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
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const idenger = ref('lh8o66gwjf21pcl'); 
const preserId = ref(null); 

// If organizerId is aaa then all events will be listed
const organizerId = '653f2d54a02c73d66e1eec99';
const eventGroup = 'cm001';

// Function to navigate to the event page
const goToReser = () => {
  router.push({
    path: '/event',
    query: {
      preserId: preserId.value,
      idenger: idenger.value,
      organizerId: organizerId,
      eventGroup: eventGroup,
    },
  });
};

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

console.log(route.query.idenger)
watch(() => route.query, newQuery => {
  idenger.value = newQuery.idenger;
});

const handlePrereservationCreated = (prereservationId) => {
  console.log(prereservationId);
  preserId.value = prereservationId;
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

