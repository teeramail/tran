<template>
  <div>
    <ClientOnly>
      <qrcode-stream @decode="onDecode" @error="onError"></qrcode-stream>
    </ClientOnly>
    <div v-if="decodedContent">Decoded content: {{ decodedContent }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { QrcodeStream } from "vue3-qrcode-reader";

const decodedContent = ref(null);

const onDecode = (content) => {
  console.log("Decoded QR code:", content);
  decodedContent.value = content;
};

const onError = (error) => {
  console.error("QR code scanning error:", error);
};
</script>
