<template>
    <button @click="goToReser" class="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-white text-2xl bg-green-500 py-4 px-8 rounded-full">Book Now</button>

</template>
  
<script setup>

import { useRouter, useRoute } from 'vue-router'
  
  const props = defineProps({
    preserId: {
      type: [String, null],
      default: null
    }
  })

  const router = useRouter()
  const route = useRoute()
  
  const goToReser = () => {
    router.push({
      name: 'event',
      query: {
        preserId: props.preserId,
        idenger: props.idenger,
       
      },
    })
  }
</script>
  