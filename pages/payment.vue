<!-- /pages/payment.vue -->
<template>
  <div>
    <Payment :data-customerid="dataCustomerId" />
  </div>


  
</template>

<script setup>
import Payment from '/components/payment.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const dataCustomerId = ref(route.query.dataCustomerId);

console.log(dataCustomerId.value);


</script>
