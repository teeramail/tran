//  pages/endpoint.vue

<template>
  <div>
    <p>transNo: {{ transNo }}</p>
    <pre>{{ requestData }}</pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const transNo = ref(null)
const requestData = ref(null)

const fetchTransNo = async () => {
  const response = await fetch('/endpoint')
  const data = await response.json()
  return { transNo: data.transNo, requestData: data }
}

useAsyncData('transNo', fetchTransNo, { transNo, requestData })
</script>
