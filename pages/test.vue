<template>
    <div class="min-h-screen flex flex-col items-center justify-center">
      <image-slider :slider-images="sliderImages"></image-slider>
      <div class="flex flex-wrap mt-8 container mx-auto">
        <div v-for="i in 20" :key="i" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
          <img :src="'https://source.unsplash.com/random/200x200?sig=' + i" alt="Product Image" class="rounded-lg shadow-md w-full">
          <h2 class="text-xl font-semibold mt-4">Product {{ i }}</h2>
          <p class="text-gray-600 mt-1">Product description goes here...</p>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700">Buy Now</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import ImageSlider from '~/components/ImageSlider.vue';
  
  const sliderImages = [
    { src: 'https://koh-samui.com/travelmain/img/carousel-1-laemsamui.jpg', alt: 'Slider Image 1' },
    { src: 'https://koh-samui.com/travelmain/img/carousel-2.jpg', alt: 'Slider Image 2' },
  ];
  
  defineComponent({
    components: {
      ImageSlider,
    },
  });
  </script>
  