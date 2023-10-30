<template>
    <div class="container mx-auto flex flex-col items-center">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="w-full p-4 relative"
        style="height: 400px" 
      >
        <img
          :src="image.src"
          :alt="'Image ' + (index + 1)"
          class="rounded-lg shadow-md w-full h-full object-cover"
        />
        <BookNowButton v-if="index === 0" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import BookNowButton from '@/components/BookNowButton.vue'
  

const images = ref([
  { src: 'https://koh-samui.com/travelmain/phetchbuncha/img/Petbuncha%20package-1.jpg' },

]);
</script>

<style>
img {
  max-width: 100%;
  height: auto;
}
</style>
