<template>
    <select name="timezone-select" id="timezone-select" v-model="timezone">
      <option :value="undefined">Select timezone</option>
      <option v-for="zone in timezones" :value="zone" :key="zone">{{ zone }}</option>
    </select>
    <VueDatePicker 
            v-model="date" 
            multi-calendars
            range
            :timezone="timezone"
            :partial-range="false" />
</template>

<script setup>
import { ref } from 'vue';
import { addDays } from 'date-fns';

const date = ref([new Date(), addDays(new Date(), 5)]);
const timezone = ref(undefined);

// These are just for the demo purposes
const timezones = [
  'Pacific/Midway', // -11
  'America/Adak', // -10,
  'Pacific/Gambier', // -9
  'America/Los_Angeles', // -8
  'America/Denver', // -7
  'America/Chicago', // -6
  'America/New_York', // -5
  'America/Santiago', // -4
  'America/Sao_Paulo', // -3
  'America/Noronha', // -2
  'Atlantic/Cape_Verde', // -1
  'UTC', // utc
  'Europe/Brussels', //+1
  'Africa/Cairo', // +2
  'Europe/Minsk', // +3
  'Europe/Moscow', // +4
  'Asia/Tashkent', // +5
  'Asia/Dhaka', // +6
  'Asia/Novosibirsk', // +7
  'Australia/Perth', // +8
  'Asia/Tokyo', // +9
  'Australia/Hobart', // +10
  'Asia/Vladivostok', // +11
  'Pacific/Auckland', // +12
];
</script>