<template>
  <div class="container mx-auto flex flex-col items-center min-h-screen flex-grow">
    
    <Enter :idenger="idenger" @prereservation-created="handlePrereservationCreated" />
    <div class="flex flex-col p-4 max-w-md mx-auto text-black bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl md:flex-row">
    <div class="flex flex-col p-4 space-y-4">
      <div class="text-sm tracking-wide text-indigo-500 font-semibold uppercase">
        🌴 Full Day Experience the captivating beauty of Angthong National Marine Park 🌴
      </div>
      <div class="text-lg font-medium leading-tight">
        Experience the captivating beauty of Angthong National Marine Park, an Asean Heritage Park, with our exclusive tour package. This journey will take you through one of Thailand's most picturesque marine parks, famed for its rich biodiversity and awe-inspiring landscapes.
      </div>
      <img :src="`https://koh-samui.com/travelmain/mainimage/angthong/Angthong_nationalpark1.webp`" class="object-cover w-full  rounded-md" />
     
      <div class="text-gray-500">
    
        🕖 Itinerary: 07:30 - 08:30 - Kick start your day with a comfortable pickup from your hotel. We'll escort you to our speedboat pier at the stunning Bophut Beach. From there, we'll set sail for the stunning Angthong National Marine Park.  

 

Your first treat is snorkeling in the vibrant underwater world of Koh Wao. Marvel at the marine life and immerse yourself in the soothing azure waters. 

 

Next, we navigate through the beautiful islands within the National Park. Soak in the serene views from our speedboat before we head to Koh Mae Koh. Here, you'll witness the majestic Emerald Lake or Talay Nai, an Unseen Tourist Attraction of Suratthani. Surrounded by towering limestone mountains and verdant islands, the Lake's beauty will leave you breathless. 

 

Post the sightseeing, relish a delicious lunch at our designated service area. 

      </div>
      <img :src="`https://koh-samui.com/travelmain/mainimage/angthong/Angthong_nationalpark12.webp`" class="object-cover w-full  rounded-md" />
      <img :src="`https://koh-samui.com/travelmain/mainimage/angthong/Angthong_nationalpark6.webp`" class="object-cover w-full  rounded-md" />



      <div class="text-gray-500">
        The afternoon is packed with exciting activities. Choose to kayak through the tranquil waters, or unwind at your leisure. Don't miss the spectacular panoramic landscape at Pha Jun Jaras View Point. 

 

We wind up the tour at 04:00 P.M. and head back to Koh Samui. You'll reach your hotel by approximately 05:30 P.M. 

      </div>
      <img :src="`https://koh-samui.com/travelmain/mainimage/angthong/Angthong_nationalpark16.webp`" class="object-cover w-full h38  rounded-md" />

      <div class="text-gray-500">
        ✨ Included in the Tour: 

- Hotel round-trip transfer 

- Experienced Captain, Local Guide / Tour Leader, and Crew 

- Refreshing drinking water and soft drinks onboard 

- Scrumptious lunch 

- Snorkeling gear 

- Life jackets 

- Travel accident insurance 

- Basic first aid equipment equipment.
      </div>
      <img :src="`https://koh-samui.com/travelmain/mainimage/angthong/Angthong_nationalpark97.webp`" class="object-cover w-full h50 rounded-md" />

      <div class="text-gray-500">
        ❌ Not Included in the Tour: Island entry fees (Adult: 250, Child: 120, Thai: 50, Child Thai: 20)
      </div>
      <img :src="`https://koh-samui.com/travelmain/mainimage/angthong/Angthong_nationalpark98.webp`" class="object-cover w-full  rounded-md" />

      <div class="text-gray-500">
        🌺 Join us on this unforgettable journey, experience the tropical splendor of Angthong National park, and create memories that will last a lifetime! Book your tour today. 🌺
      </div>
      <img :src="`https://koh-samui.com/travelmain/mainimage/angthong/Angthong_nationalpark7.webp`" class="object-cover w-full  rounded-md" />

      <div>
        🌺 Click Book Now button to book online  🌺
      </div>

      <img :src="`https://koh-samui.com/travelmain/mainimage/angthong/Angthong_nationalpark99.webp`" class="object-cover w-full  rounded-md" />

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
const organizerId = '64d185ef8e3c50cd71063f2d';

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
