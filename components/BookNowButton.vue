// components/BookNowButton.vue
<template>
    <button @click="goToReser" class="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-white text-2xl bg-green-500 py-4 px-8 rounded-full">Book Now</button>

</template>
  
<script setup>

import { useRouter } from 'vue-router'
import { watchEffect } from 'vue';

  const props = defineProps({
    preserId: {
      type: [String, null],
      default: null
    },
    idenger: String, // Add this if it's not already there
    organizerId: String, // Add this prop
    eventGroup: String, // Add this prop
  })

  const router = useRouter()
  
  const goToReser = () => {
    router.push({
      name: 'event',
      query: {
        preserId: props.preserId,
        idenger: props.idenger,
        organizerId: props.organizerId,
        eventGroup: props.eventGroup,
       
      },
    })
  }


</script>
  