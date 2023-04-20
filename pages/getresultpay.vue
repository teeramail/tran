// pages/getresultpay.vue
<template>
  <div>
    <h1>Request Data</h1>
    <pre>{{ JSON.stringify(requestData, null, 2) }}</pre>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAsyncData } from '#app';

const requestData = ref({});

useAsyncData('requestData', async () => {
  const response = await fetch('/api/getStoredData');

  if (response.ok) {
    const data = await response.json();
    requestData.value = data;
  } else {
    console.error('Error fetching data');
  }
});
</script>
