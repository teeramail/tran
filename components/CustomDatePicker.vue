<!-- CustomDatePicker.vue -->
<template>
    <div>
      <Datepicker
        :disabled-dates="disabledDates"
        :min-date="minDate"
        :max-date="maxDate"
        v-model="date"
        @change="onChange"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  
  const props = defineProps({
    disabledDates: {
      type: Object,
      default: () => ({}),
    },
    minDate: {
      type: String,
      default: '',
    },
    maxDate: {
      type: String,
      default: '',
    },
  });
  
  const date = ref();
  function onChange(value) {
    emit('change', value);
  }
  </script>
  