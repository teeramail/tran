<template>
    <div>
      <button class="btn-large" @click="goToA">{{ language === 'th' ? 'Register' : 'ลงทะเบียน' }}</button><br/><br/>
      <button class="btn-large" @click="goToD">{{ language === 'th' ? 'Register Secondpage' : 'ลงทะเบียนใบถัดไป' }}</button><br/><br/>
      <button class="btn-large" @click="goToB">{{ language === 'th' ? 'Report' : 'ตรวจสอบ' }}</button><br/><br/>
      <button class="btn-large" @click="goToC">{{ language === 'th' ? 'ฺBelong to' : 'ของใคร' }}</button><br/><br/>
      <button class="btn-large" @click="switchLanguage">{{ language === 'en' ? 'Switch to Eng' : 'เปลี่ยนเป็นภาษาไทย' }}</button><br/><br/>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const language = ref('en');
  
  const goToA = () => {
    window.open('https://mykohsamui.com/qrboxsetup', '_blank');
  }
  
  const goToB = () => {
    window.open('https://mykohsamui.com/qrboxenger', '_blank');
  }
  
  const goToC = () => {
    window.open('https://mykohsamui.com/qrboxcheckagent', '_blank');
  }

  const goToD = () => {
    window.open('https://mykohsamui.com/qrboxsetupq1', '_blank');
  }
  
  const switchLanguage = () => {
    language.value = language.value === 'en' ? 'th' : 'en';
  }
  
  defineExpose({
    language: language.value,
    goToA,
    goToB,
    goToC,
    goToD,
    switchLanguage
  });
  </script>
  
  <style scoped>
  .btn-large {
    font-size: 20px; /* Adjust this value to increase/decrease the font size */
    padding: 15px 30px; /* Increase the padding to make the button larger */
    margin-bottom: 1rem;
  }
  </style>
  