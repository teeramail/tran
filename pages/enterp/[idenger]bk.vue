<template>
  <div>
    <h1>Enterp - Add New Record</h1>
    <button @click="submitForm">Submit</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const idenger = ref('');

async function submitForm() {
  try {
    const response = await fetch('https://koh-samui.com:53005/enterp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idenger: route.params.idenger }),
    });

    if (!response.ok) {
      throw new Error('Error adding record: ' + response.statusText);
    }

    alert('Record added successfully');
    idenger.value = '';
  } catch (error) {
    alert('Error adding record: ' + error.message);
  }
}
</script>
  