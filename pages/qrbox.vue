<template>
  <div>
    <ClientOnly>
      <qrcode-stream @decode="onDecode" @error="onError"></qrcode-stream>
    </ClientOnly>
    <div v-if="decodedContent">Decoded content: {{ decodedContent }}</div>
    <div v-if="result">Result: {{ result }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { QrcodeStream } from "vue3-qrcode-reader";

const decodedContent = ref(null);
const result = ref(null);

const onDecode = async (content) => {
  console.log("Decoded QR code:", content);
  decodedContent.value = content;
  
  try {
    const response = await fetch(`https://koh-samui.com:53005/reservations?orderno=${content}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.orderno === content) {
      result.value = data;
    } else {
      result.value = "Order number not found or doesn't match";
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const onError = (error) => {
  console.error("QR code scanning error:", error);
};
</script>
