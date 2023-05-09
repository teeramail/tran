<template>
    <div class="min-h-screen bg-gray-100">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 gap-4 mt-10">
          <button
            v-for="event in events"
            :key="event._id"
            class="p-4 text-white bg-blue-500 rounded-lg"
            @click="showDetails(event.description)"
          >
            {{ event._id }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

  import { ref, onMounted } from 'vue'
  
  const events = ref([])
  
  onMounted(async () => {
    try {
      const response = await fetch('https://koh-samui.com:53005/agent')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      events.value = data
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  })
  
  const showDetails = (detail) => {
    alert(detail)
  }
  </script>
  
