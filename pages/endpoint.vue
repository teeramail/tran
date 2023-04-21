<template>
  <div>
    <!-- Display the transNo value -->
    <p>transNo: {{ transNo }}</p>
  </div>
</template>

<script setup>

const transNo = ref(null)

const fetchtransNo = async () => {
  const { req } = useNuxt().ssrContext
  const data = req.body.transNo
  return { transNo: data }
}

useAsyncData('transNo', fetchtransNo, transNo)
</script>