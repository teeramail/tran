<template>
    <div class="min-h-screen flex flex-col items-center justify-center">
      <image-slider :slider-images="sliderImages" slide-text="Beautiful Car"></image-slider>
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
    </div>
  </template>
  
  <script setup>
  import ImageSlider from '~/components/ImageSlider.vue';
  
  const sliderImages = [
    { src: 'https://koh-samui.com/travelmain/phetchbuncha/img/Petbuncha%20carousel-3.jpg', alt: 'Slider Image 1' },
    { src: 'https://koh-samui.com/travelmain/phetchbuncha/img/Petbuncha%20carousel-4.jpg', alt: 'Slider Image 2' },
  ];
  
  const products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Product 1 description goes here...',
      price: 100,
      imageSrc: 'https://koh-samui.com/travelmain/phetchbuncha/img/Petbuncha%20package-1.jpg',
    },
    {
      id: 2,
      name: 'Product 1',
      description: 'Product 1 description goes here...',
      price: 100,
      imageSrc: 'https://koh-samui.com/travelmain/phetchbuncha/img/Petbuncha%20package-2.jpg',
    },
    {
      id: 3,
      name: 'Product 1',
      description: 'Product 1 description goes here...',
      price: 100,
      imageSrc: 'https://koh-samui.com/travelmain/phetchbuncha/img/Petbuncha%20package-3.jpg',
    },
    {
      id: 4,
      name: 'Product 1',
      description: 'Product 1 description goes here...',
      price: 100,
      imageSrc: 'https://koh-samui.com/travelmain/phetchbuncha/img/Petbuncha%20package-4.jpg',
    },
    {
      id: 5,
      name: 'Product 1',
      description: 'Product 1 description goes here...',
      price: 100,
      imageSrc: 'https://koh-samui.com/travelmain/phetchbuncha/img/Petbuncha%20package-5.jpg',
    },
    {
      id: 6,
      name: 'Product 1',
      description: 'Product 1 description goes here...',
      price: 100,
      imageSrc: 'https://koh-samui.com/travelmain/phetchbuncha/img/Petbuncha%20package-6.jpg',
    },
   
  ];
  
  defineComponent({
    components: {
      ImageSlider,
    },
  });
  </script>
  