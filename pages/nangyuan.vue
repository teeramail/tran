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
    <Enter :idenger="idenger" @prereservation-created="handlePrereservationCreated" />
    <div class="flex flex-col p-4 max-w-md mx-auto text-black bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl md:flex-row">
    <div class="flex flex-col p-4 space-y-4">
      <div class="text-sm tracking-wide text-indigo-500 font-semibold uppercase">
        🌴 Full Day Exotic Adventure: Koh Tao & Koh Nang Yuan by Speedboat! 🌴
      </div>
      <div class="text-lg font-medium leading-tight">
        Experience the turquoise waters, stunning marine life, and tranquil sandy beaches of the breathtaking Koh Tao and Koh Nang Yuan islands on our exclusive full day trip. Hop on a speedy and comfortable boat from Bophut Beach, Koh Samui, and let us whisk you away to the serene beauty of these Thai paradises.
      </div>
      <img :src="`https://koh-samui.com/travelmain/mainimage/nangyuan/ko_tao_image2.webp`" class="object-cover w-full  rounded-md" />

      <div class="text-gray-500">
        🕖 Itinerary: 07:30 - 08:30 - Pick-up from your hotel and transfer to the Bophut Beach speedboat pier. A day full of snorkeling, relaxation, and exploration begins as we embark on a journey to Koh Tao, known for its remarkable natural scenery. Spend the morning snorkeling in the vibrant, fish-filled waters of Mango Bay, Lighthouse Bay, or Hin Wong Bay. Relish in a delightful lunch at one of Koh Tao's top-rated restaurants. After a fulfilling meal, engage in various activities at your own pace on the island. Next, we will visit the unique island of Koh Nang Yuan. Here you can snorkel at the famous Japanese Garden, known for its stunning underwater coral formations. A highlight of the trip is the panoramic view of the three small islands interconnected by a white sandy beach. Enjoy leisure time, explore, relax, and soak up the idyllic setting before we head back to Koh Samui. 03:20 - Return to Koh Samui. Expect to be back at your hotel by approximately 05:00 P.M.
      </div>
      <img :src="`https://koh-samui.com/travelmain/mainimage/nangyuan/ko_tao_image1.webp`" class="object-cover w-full  rounded-md" />
      <div class="text-gray-500">
        💼 What to Bring: Beach towel, sunscreen, sunglasses, comfortable clothes and swimwear, camera, extra cash for personal expenses.
      </div>
      <img :src="`https://koh-samui.com/travelmain/mainimage/nangyuan/ko_tao_image6.webp`" class="object-cover w-full h38  rounded-md" />

      <div class="text-gray-500">
        ✨ Included in the Tour:  hotel round trip transfer, experienced crew (Captain, Local Guide/Tour Leader, and Crews), drinking water and soft drinks on board, delicious lunch, snorkeling gear, life jacket, travel accident insurance, basic first aid equipment.
      </div>
      <img :src="`https://koh-samui.com/travelmain/mainimage/nangyuan/ko_tao_image7.webp`" class="object-cover w-full h50 rounded-md" />

      <div class="text-gray-500">
        ❌ Not Included in the Tour: Island entry fees (Adult: 250, Child: 120, Thai: 50, Child Thai: 20)
      </div>
      <img :src="`https://koh-samui.com/travelmain/mainimage/nangyuan/ko_tao_image4.webp`" class="object-cover w-full  rounded-md" />

      <div class="text-gray-500">
        🌺 Join us on this unforgettable journey, experience the tropical splendor of Koh Tao and Koh Nang Yuan, and create memories that will last a lifetime! Book your tour today. 🌺
      </div>
      <img :src="`https://koh-samui.com/travelmain/mainimage/nangyuan/ko_tao_image3.webp`" class="object-cover w-full  rounded-md" />

      <div>
        🌺 Click Book Now button to book online  🌺
      </div>

      <img :src="`https://koh-samui.com/travelmain/mainimage/nangyuan/ko_tao_image5.webp`" class="object-cover w-full  rounded-md" />

    </div> 
  </div>  
<br/><br/><br/><br/><br/><br/><br/><br/><br/>

    </div>
    <div id="floating-button">
      <div class="button-container">
        <BookNowButton :preserId="preserId" :idenger="idenger" :organizerId="organizerId" class="mb-4" />
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
const organizerId = '64a656a1d69cad6a83b943e1';

console.log(route.query.idenger)
watch(() => route.query, newQuery => {
  idenger.value = newQuery.idenger;
});

const handlePrereservationCreated = (prereservationId) => {
  console.log(prereservationId);
  preserId.value = prereservationId;
}

const images = ref([
  { src: 'https://koh-samui.com/travelmain/grandsea/img/grandseatour carousel-2.jpg' },

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
