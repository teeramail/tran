// C:\Users\cteer\vueproject\nuxt3\samui\pages\a01.vue
<template>
  <div class="container mx-auto flex flex-col items-center">
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
      <BookNowButton v-if="index === 0" :preserId="preserId" :idenger="idenger"  />
    </div>
    <Enter :idenger="idenger" @prereservation-created="handlePrereservationCreated" />

  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Enter from '@/components/Enter.vue'
import BookNowButton from '@/components/BookNowButton.vue'

// import { useRoute, useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const route = useRoute();
// const router = useRouter();

const idenger = ref(); 
const preserId = ref(null); 


console.log(route.query.idenger)
watch(() => route.query, newQuery => {
  idenger.value = newQuery.idenger;
});

const handlePrereservationCreated = (prereservationId) => {
  console.log(prereservationId);
  preserId.value = prereservationId ;
}

const images = ref([
  { src: 'https://koh-samui.com/travelmain/phetchbuncha/img/Petbuncha%20package-1.jpg' },
  { src: 'https://koh-samui.com/travelmain/phetchbuncha/img/Petbuncha%20package-2.jpg' },
  { src: 'https://koh-samui.com/travelmain/phetchbuncha/img/Petbuncha%20package-3.jpg' },
  { src: 'https://koh-samui.com/travelmain/phetchbuncha/img/Petbuncha%20package-4.jpg' },
  { src: 'https://koh-samui.com/travelmain/phetchbuncha/img/Petbuncha%20package-5.jpg' },
  { src: 'https://koh-samui.com/travelmain/phetchbuncha/img/Petbuncha%20package-6.jpg' },
  { src: 'https://koh-samui.com/travelmain/phetchbuncha/img/Petbuncha%20about-1.jpg' },
  { src: 'https://koh-samui.com/travelmain/phetchbuncha/img/Petbuncha%20about-2.jpg' },
]);



</script>

<style>
img {
  max-width: 100%;
  height: auto;
}
</style>

<style>
img {
  max-width: 100%;
  height: auto;
}
</style>
