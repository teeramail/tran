<!-- components/ImageSlider.vue -->
<template>
  <div class="w-full overflow-hidden">
    <swiper class="h-[400px] w-full" :options="{loop: true, autoplay: { delay: 3000 }, pagination: { clickable: true }}">
      <swiper-slide v-for="i in sliderImages" :key="i" class="bg-cover bg-center h-[400px] w-full relative">
        <img :src="i.src" :alt="i.alt" class="h-[400px] w-full object-cover">
        <div :class="['absolute inset-0 flex flex-col items-center justify-center', i.backgroundColor]">
          <h1 class="text-4xl md:text-6xl font-semibold text-white mb-4">{{ slideText }}</h1>
          <button @click="goToReser" class="bg-green-500 text-white text-2xl px-8 py-5 mt-39 rounded-full hover:bg-green-700 transition-colors duration-200">
            Book Now
          </button>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<style>
@media screen and (min-width: 1024px) {
  .swiper, .swiper-slide, .swiper-slide img {
    height: 600px;
  }
}
</style>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.min.css';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const goToReser = () => {
  router.push({
    name: 'reser',
    query: {
      dataCustomerId: props.dataCustomerId,
      dataAmount: route.query.idenger,
    },
  });
};

const props = defineProps({
  sliderImages: {
    type: Array,
    required: true,
  },
  slideText: {
    type: String,
    required: true,
  },
  dataCustomerId: {
    type: String,
    required: false,
    default: '',
  },
  idenger: {
    type: String,
    required: false,
    default: '',
  },
});



defineComponent({
  components: {
    Swiper,
    SwiperSlide,
  },
});
</script>
