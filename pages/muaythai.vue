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

    <Enter :idenger="idenger" :organizerId="organizerId" @prereservation-created="handlePrereservationCreated" />



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

