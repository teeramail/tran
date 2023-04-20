// pages/yourPage.vue
<script setup>
import { ref } from 'vue';
import { onRequest } from 'nuxt3';

const requestData = ref({});

onRequest(async (req) => {
  requestData.value = req.body;
});
</script>

<template>
  <div>
    <h1>Request Data</h1>
    <pre>{{ JSON.stringify(requestData, null, 2) }}</pre>
  </div>
</template>
