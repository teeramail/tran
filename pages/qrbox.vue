<template>
  <div>
    <ClientOnly>
      <qrcode-stream v-if="scanning" @decode="onDecode" @error="onError"></qrcode-stream>
    </ClientOnly>
    <div v-if="decodedContent">Decoded content: {{ decodedContent }}</div>
    <div v-if="result">Result: {{ result }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { QrcodeStream } from "vue3-qrcode-reader";

const scanning = ref(true);
const decodedContent = ref(null);
const result = ref(null);

const onError = (error) => {
  console.error("QR code scanning error:", error);
};

const onDecode = async (content) => {
  console.log("Decoded QR code:", content);
  decodedContent.value = content;
  scanning.value = false;

  try {
    const response = await fetch(`https://koh-samui.com:53005/payresultone?orderno=${decodedContent.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.orderno === decodedContent.value) {
      result.value = data;
    } else {
      result.value = "Order number not found or doesn't match";
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

</script>
