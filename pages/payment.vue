<!-- /pages/payment.vue -->
<template>
  <div>
    <Payment :preReservationId="preReservationId" />
  </div>


  
</template>

<script setup>
import Payment from '/components/payment.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const preReservationId = route.query.preReservationId;


console.log(preReservationId);


</script>
