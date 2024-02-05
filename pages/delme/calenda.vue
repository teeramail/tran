<template>
    <div>
      <label>Name:</label>
      <input type="text" v-model="name" />
  
      <label>Reserve Date:</label>
      <VueDatePicker v-model="reserveDate"></VueDatePicker>
  
      <label>Mobile:</label>
      <input type="text" v-model="mobile" @blur="validateMobile" />
      <span v-if="mobileTouched && !isMobileValid" style="color: red;">Invalid mobile format</span>
  
      <label>Email:</label>
      <input type="email" v-model="email" @blur="validateEmail" />
      <span v-if="emailTouched && !isEmailValid" style="color: red;">Invalid email format</span>
  
      <button type="submit" @click="submitForm" :disabled="!isEmailValid || !isMobileValid">Submit</button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  
  const name = ref('');
  const reserveDate = ref(null);
  const mobile = ref('');
  const email = ref('');
  const isEmailValid = ref(false);
  const isMobileValid = ref(false);
  const emailTouched = ref(false);
  const mobileTouched = ref(false);
  
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const mobileRegex = /^\d{10,15}$/;
  
  const validateEmail = () => {
    emailTouched.value = true;
    isEmailValid.value = emailRegex.test(email.value);
  };
  
  const validateMobile = () => {
    mobileTouched.value = true;
    isMobileValid.value = mobileRegex.test(mobile.value);
  };
  
  const submitForm = () => {
    if (isEmailValid.value && isMobileValid.value) {
      console.log('Form submitted:', name.value, reserveDate.value, mobile.value, email.value);
    }
  };
  </script>
  