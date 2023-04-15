<template>
  <VueDatePicker v-model="date" :disabled-dates="disableNonWedSat" />
</template>

<script setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const date = ref(new Date());

const disableNonWedSat = (date) => {
const day = date.getDay();
return day !== 3 && day !== 6; // Disables all dates that are not Wednesday (3) or Saturday (6)
};
</script>
