<!-- pages/getresultpay.vue -->
<template>
  <div>
    <h1>Payment Results</h1>
    <div v-if="paymentResults">
      <h2>Transactions</h2>
      <ul>
        <li v-for="paymentResult in paymentResults" :key="paymentResult.transNo">
          <strong>Transaction No:</strong> {{ paymentResult.transNo }}<br>
          <strong>Response Code:</strong> {{ paymentResult.respCode }}<br>
          <strong>Status:</strong> {{ paymentResult.status }}<br>
          <strong>Order No:</strong> {{ paymentResult.orderNo }}<br>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No transaction data received.</p>
    </div>
  </div>
</template>

<script setup>
import { useAsyncData } from '#app';

const { data: paymentResults } = useAsyncData('paymentResults', async () => {
  const response = await fetch('https://mykohsamui.com/getresultpay');
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  return await response.json();
});
</script>
