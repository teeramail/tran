<template>
  <div>
    <!-- Display the transNo value -->
    <p>transNo: {{ transNo }}</p>
  </div>
</template>

<script setup>
import { useAsyncData, useContext } from '@nuxtjs/composition-api'

const context = useContext()
const fetchId = async () => {
  const transNo = context.req.value.body.transNo
  return { transNo }
}

const { data: transNo } = useAsyncData('transNo', fetchId)
</script>
