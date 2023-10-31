<template>
  <div class="container mx-auto flex flex-col items-center min-h-screen flex-grow">
    <nuxt-head>
      <title>Muay Thai in Chiang Mai: Premier Boxing Stadiums | YourSiteName</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="An in-depth guide to the premier Muay Thai boxing stadiums in Chiang Mai. Experience the traditional martial art in the city's top venues.">
      <meta name="keywords" content="Muay Thai, Chiang Mai, Boxing Stadiums, Martial Art, Thai Culture">
      <link rel="canonical" href="https://www.muaythaicm.com/muaythai">
    </nuxt-head>

    <header>
      <h1>Muay Thai in Chiang Mai: An In-depth Look at the City's Premier Boxing Stadiums</h1>
    </header>

    <section>
      <p>Chiang Mai, a city rich in history and culture, is also a vibrant hub for the ancient martial art of Muay Thai. This traditional sport, known as the "Art of Eight Limbs", is a significant part of Thai heritage. The city boasts several stadiums, each offering its unique flavor of this traditional combat sport. Here's a comprehensive overview:</p>
    </section>

    <article>
      <h2>Loikroh Boxing Stadium:</h2>
      <p>Centrally located, Loikroh Boxing Stadium is a beacon for Muay Thai enthusiasts. It seamlessly blends traditional rituals with adrenaline-pumping matches. The stadium's ambiance is electric, with passionate crowds and rhythmic music setting the tone for intense bouts.</p>

      <h2>Chiangmai Boxing Stadium:</h2>
      <p>Another central attraction, Chiangmai Boxing Stadium is celebrated for its authentic Muay Thai showcases. It features skilled fighters from various Thai regions, making it a favorite among both locals and tourists.</p>

      <h2>Thapae Stadium:</h2>
      <p>Located near the historic Thapae Gate, this stadium offers a mix of modern and traditional Muay Thai experiences. It's frequented by both locals and international visitors, with reviews highlighting the authenticity of the fights and the vibrant atmosphere.</p>

      <h2>Kalare Boxing Stadium:</h2>
      <p>Nestled within the Kalare Night Bazaar, Kalare Boxing Stadium is a prime spot for Muay Thai in Chiang Mai. Hosting fights thrice a week—every Monday, Wednesday, and Friday—it's renowned for its thrilling bouts and dynamic atmosphere. Whether you're a Muay Thai aficionado or just seeking an exhilarating experience, Kalare promises a well-organized event with amiable staff and affordable ticket prices starting at 400 baht.</p>

      <h2>Pavilion Boxing Stadium Chiang Mai:</h2>
      <p>Located in the Pavilion Night Bazaar, this stadium is another hotspot for Muay Thai enthusiasts. Hosting fights every Thursday, it guarantees an energetic atmosphere and thrilling matches.</p>
      <ul>
        <li><strong>Electrifying Fights:</strong> The bouts at Pavilion Boxing Stadium are always unpredictable, featuring highly skilled and seasoned fighters.</li>
        <li><strong>Vibrant Ambiance:</strong> The stadium buzzes with energy, thanks to an enthusiastic crowd and pulsating music.</li>
        <li><strong>Budget-friendly Experience:</strong> With tickets starting at just 600 baht, it's an affordable way to immerse oneself in authentic Muay Thai.</li>
      </ul>
    </article>

    <section>
      <h3>Tips for Visitors:</h3>
      <ol>
        <li>Show respect for the fighters, crowd, and the sport's cultural significance.</li>
        <li>Engage with the crowd by cheering for your preferred fighters.</li>
        <li>Most importantly, enjoy the experience! Muay Thai in Chiang Mai is a unique spectacle you won't want to miss.</li>
      </ol>
    </section>

    <footer>
      <p>In conclusion, Chiang Mai offers a diverse range of venues for experiencing Muay Thai. Each stadium, with its distinct offerings, ensures visitors get a taste of this traditional martial art in all its glory.</p>
    </footer>

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
import { ref, watch } from 'vue';
import Enter from '@/components/Enter.vue'
import BookNowButton from '@/components/BookNowButton.vue'
import { useRoute } from 'vue-router';

const route = useRoute();

const idenger = ref('lh8o66gwjf21pcl'); 
const preserId = ref(null); 

// If organizerId is a constant value, it can be set like this:
// const organizerId = '645d64c086e4d377b0496543';
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

