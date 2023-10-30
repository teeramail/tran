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
      <p class="text-lg font-bold">The exhilarating Muay Thai matches will begin promptly at 21:00.</p>
      <p class="text-lg">Experience the captivating world of the "Art of eight limbs" every Wednesday and Saturday.</p>
      <p class="text-lg">Witness electrifying combat sport with striking and clinching techniques using fists, elbows, knees, and shins.</p>
      <p class="text-lg">Join us for an unforgettable evening in our air-conditioned stadium.</p>
      <p class="text-lg">Ringside seats available at 2000 units, Normal seats at 1500 units.</p>
      <p class="text-lg">Don't miss out on this thrilling display of athleticism and skill. Book your tickets now!</p>
      <p class="text-lg">PhetchBuncha Boxing Stadium is indeed a well-known venue for Muay Thai fights It is located in the center of Chaweng Beach Koh Samui, which is a popular tourist destination known for its beautiful coastline, vibrant nightlife, and various entertainment options.</p>
      <p class="text-lg">PhetchBuncha Boxing Stadium in google map</p>
      <p class="text-lg">
<a href="https://goo.gl/maps/SvdrnGVSfun71vEj6">PhetchBuncha Boxing Stadium Location</a>
</p>
<br/><br/><br/><br/><br/><br/><br/><br/><br/>

    </div>
    <div id="floating-button">
      <div class="button-container">
        <BookNowButton :preserId="preserId" :idenger="idenger" :organizerId="organizerId" class="mb-4" />
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
const organizerId = '645d64c086e4d377b0496543';



console.log(route.query.idenger)
watch(() => route.query, newQuery => {
  idenger.value = newQuery.idenger;
});

const handlePrereservationCreated = (prereservationId) => {
  console.log(prereservationId);
  preserId.value = prereservationId;
}

const images = ref([
  { src: 'https://koh-samui.com/travelmain/phetchbuncha/img/Phetbancha.webp' },
  { src: 'https://koh-samui.com/travelmain/phetchbuncha/img/phetsamui07_samui_thai_boxing.webp' },
  { src: 'https://koh-samui.com/travelmain/phetchbuncha/img/phetsamui02_samui_thai_boxing.webp' },
  { src: 'https://koh-samui.com/travelmain/phetchbuncha/img/phetsamui05_samui_thai_boxing.webp' },
  { src: 'https://koh-samui.com/travelmain/phetchbuncha/img/phetsamui03_samui_thai_boxing.webp' },
  { src: 'https://koh-samui.com/travelmain/phetchbuncha/img/phetsamui_samui_thai_boxing.webp' },
  { src: 'https://koh-samui.com/travelmain/phetchbuncha/img/phetsamui12_samui_thai_boxing.webp' },
  { src: 'https://koh-samui.com/travelmain/phetchbuncha/img/phetsamui15_samui_thai_boxing.webp' },
  { src: 'https://koh-samui.com/travelmain/phetchbuncha/img/phetsamui19_samui_thai_boxing.webp' },
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
