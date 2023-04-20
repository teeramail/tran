<template>
  <div>
    <h1>ChillPay Callback</h1>
    <div v-if="transactionResult">
      <h2>Transaction Details</h2>
      <ul>
        <li><strong>Transaction No:</strong> {{ transactionResult.transNo }}</li>
        <li><strong>Response Code:</strong> {{ transactionResult.respCode }}</li>
        <li><strong>Status:</strong> {{ transactionResult.status }}</li>
        <li><strong>Order No:</strong> {{ transactionResult.orderNo }}</li>
      </ul>
    </div>
    <div v-else>
      <p>No transaction data received.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

const transactionResult = ref(null);

async function fetchData(req) {
  if (req && req.method === 'POST') {
    const rawData = await new Promise((resolve) => {
      let data = '';
      req.on('data', (chunk) => (data += chunk));
      req.on('end', () => resolve(JSON.parse(data)));
    });
    transactionResult.value = rawData;
  }
}

onMounted(async () => {
  const nuxtApp = useNuxtApp();
  if (process.server) {
    const { req } = nuxtApp.ssrContext;
    await fetchData(req);
  }
});
</script>
