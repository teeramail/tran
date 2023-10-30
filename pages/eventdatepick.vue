<template>
    <div>
      <Datepicker v-model="date" />
        
    </div>

    <div>
        <datepicker
    :start-date="startDate"
    :show-last-in-range="false"
  ></datepicker>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const date = ref();
const startDate = ref(new Date());
</script>
