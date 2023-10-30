<template>
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
    <Enter   :idenger="idenger"   :organizerId="organizerId" @prereservation-created="handlePrereservationCreated"  /> 
    <div class="text-center mt-8">
    <p class="text-lg">Discover Koh Samui's best Muay Thai experiences. Featured venues: Phetchbuncha Stadium & Samui International Stadium. Plus, dive into other sports events on the island.</p>

    <p class="text-lg font-bold mt-4">Muay Thai starts at 21:00 every Wednesday, Saturday,in PhetchBuncha stadium  Thursday, and Friday. In Samui international stadium</p>

    <p class="text-lg mt-4">Dive into the "Art of eight limbs". Experience striking techniques with fists, elbows, knees, and shins. Join us for a night you won't forget.</p>
    
    <p class="text-lg mt-4">At Phetchbuncha: Air-conditioned comfort in Chaweng. Ringside: 2000 units. Normal: 1500 units. Fights on Wednesday & Saturday.</p>

    <p class="text-lg mt-4">Samui International in Chaweng, Soi Reggae, has fights every Thursday & Friday.</p>
    
    <p class="text-lg mt-4 font-bold">Book your thrilling Muay Thai experience now!</p>

    <p class="text-lg mt-4">
        <a href="https://goo.gl/maps/SvdrnGVSfun71vEj6">PhetchBuncha Stadium Location</a>
    </p>

    <p class="text-lg mt-4">
        <a href="https://maps.app.goo.gl/pobfuGfQbPbT8E9y9">Samui International Stadium Location</a>
    </p>
<br/><br/><br/><br/><br/><br/><br/><br/><br/>

    </div>
    <div id="floating-button">
      <div class="button-container">
        <BookNowButton :preserId="preserId" :idenger="idenger" :organizerId="organizerId"   :eventGroup="eventGroup" class="mb-4" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Enter from '@/components/Enter.vue'
import BookNowButton from '@/components/BookNowButton.vue'
import { useRoute } from 'vue-router';

const route = useRoute();

const idenger = ref('lh8o66gwjf21pcl'); 
const preserId = ref(null); 

// If organizerId is a constant value, it can be set like this:
// const organizerId = '645d64c086e4d377b0496543';
const eventGroup = 'a001';



console.log(route.query.idenger)
watch(() => route.query, newQuery => {
  idenger.value = newQuery.idenger;
});

const handlePrereservationCreated = (prereservationId) => {
  console.log(prereservationId);
  preserId.value = prereservationId;
}

const images = ref([
  { src: 'https://koh-samui.com/travelmain/mainimage/muaythai/samui/samuiMatch1.webp' },
  { src: 'https://koh-samui.com/travelmain/mainimage/muaythai/samui/samuiMatch2.webp' },
  { src: 'https://koh-samui.com/travelmain/mainimage/muaythai/samui/phetsamui07_samui_thai_boxing.webp' },
  { src: 'https://koh-samui.com/travelmain/mainimage/muaythai/samui/phetsamui02_samui_thai_boxing.webp' },
  { src: 'https://koh-samui.com/travelmain/mainimage/muaythai/samui/phetsamui05_samui_thai_boxing.webp' },
  { src: 'https://koh-samui.com/travelmain/mainimage/muaythai/samui/phetsamui03_samui_thai_boxing.webp' },
  { src: 'https://koh-samui.com/travelmain/mainimage/muaythai/samui/phetsamui_samui_thai_boxing.webp' },
  { src: 'https://koh-samui.com/travelmain/mainimage/muaythai/samui/phetsamui12_samui_thai_boxing.webp' },
  { src: 'https://koh-samui.com/travelmain/mainimage/muaythai/samui/phetsamui15_samui_thai_boxing.webp' },
  { src: 'https://koh-samui.com/travelmain/mainimage/muaythai/samui/phetsamui19_samui_thai_boxing.webp' },
]);
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
