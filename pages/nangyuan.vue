<!-- /pages/chada.vue -->

<template>
  <div><h1>test Nangyuan</h1></div>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <image-slider :slider-images="sliderImages"></image-slider>
    <div class="flex flex-wrap mt-8 container mx-auto">
      <div
        v-for="product in products"
        :key="product.id"
        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-4"
      >
        <img
          :src="product.imageSrc"
          :alt="`Product Image ${product.id}`"
          class="rounded-lg shadow-md w-full"
        />

      </div>
    </div>
    <button @click="goToReser" class="bg-green-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700">
      Book Now
    </button>
  </div>
</template>

  
  <script setup>
  import ImageSlider from '~/components/ImageSlider.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const goToReser = () => {
  router.push({
    name: 'reser',
    query: {
      dataCustomerId: 'Chada Restaurant',
      dataAmount: '5000', // Replace 'someAmount' with the actual value or variable
    },
  });



  };

  
  const sliderImages = [
    { src: 'https://koh-samui.com/travelmain/chada/img/chada%20carousel-1.jpg', alt: 'Slider Image 1' },
    { src: 'https://koh-samui.com/travelmain/chada/img/chada%20carousel-2.jpg', alt: 'Slider Image 2' },
  ];
  
  const products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Product 1 description goes here...',
      price: 100,
      imageSrc: 'https://koh-samui.com/travelmain/chada/img/chada%20package-11.jpg',
    },
    {
      id: 2,
      name: 'Product 1',
      description: 'Product 1 description goes here...',
      price: 100,
      imageSrc: 'https://koh-samui.com/travelmain/chada/img/chada%20package-21.jpg',
    },
    {
      id: 3,
      name: 'Product 1',
      description: 'Product 1 description goes here...',
      price: 100,
      imageSrc: 'https://koh-samui.com/travelmain/chada/img/chada%20package-31.jpg',
    },
    {
      id: 4,
      name: 'Product 1',
      description: 'Product 1 description goes here...',
      price: 100,
      imageSrc: 'https://koh-samui.com/travelmain/chada/img/chada%20package-41.jpg',
    },
    {
      id: 5,
      name: 'Product 1',
      description: 'Product 1 description goes here...',
      price: 100,
      imageSrc: 'https://koh-samui.com/travelmain/chada/img/chada%20package-51.jpg',
    },
    {
      id: 6,
      name: 'Product 1',
      description: 'Product 1 description goes here...',
      price: 100,
      imageSrc: 'https://koh-samui.com/travelmain/chada/img/chada%20package-61.jpg',
    },
   
  ];
  

  </script>
