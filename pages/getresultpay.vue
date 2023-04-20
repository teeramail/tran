// pages/getresultpay

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

useAsyncData('requestData', async (context) => {
  const { req } = context;
  requestData.value = req.body;
});
</script>


