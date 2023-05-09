<template>
    <div>
      <label>Email:</label>
      <input type="email" v-model="email" @blur="validateEmail" />
      <span v-if="emailTouched && !isEmailValid" style="color: red;">Invalid email format</span>
    </div>
  </template>
  
  <script setup>
    
  import { ref, computed, watchEffect, defineProps, defineEmit } from 'vue';
  
  const props = defineProps({
    modelValue: String,
  });
  
  const emit = defineEmit(['update:modelValue', 'is-email-valid']);
  
  const email = ref(props.modelValue);
  const emailTouched = ref(false);
  
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const isEmailValid = computed(() => emailRegex.test(email.value));
  
  const validateEmail = () => {
    emailTouched.value = true;
    emit('update:modelValue', email.value);
    emit('is-email-valid', isEmailValid.value);
  };
  
  watchEffect(() => {
    email.value = props.modelValue;
  });
  </script>
  