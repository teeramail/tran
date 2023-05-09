<!-- Page1.vue -->
<template>
    <div>
      <h1>Page 1</h1>
      <custom-date-picker
        :min-date="'2023-01-01'"
        :max-date="'2023-12-31'"
        @change="onDateChange"
      ></custom-date-picker>
    </div>
  </template>
  
  <script setup>
  import CustomDatePicker from '@/components/CustomDatePicker.vue';
  
  function onDateChange(value) {
    console.log('Selected date:', value);
  }
  </script>
  