<template>
  <div>
    <ClientOnly>
      <qrcode-stream v-if="scanning" @decode="onDecode" @error="onError"></qrcode-stream>
    </ClientOnly>
    <div v-if="decodedContent">Decoded content: {{ decodedContent }}</div>
    <div v-if="result">Result: {{ result }}</div>
    <button v-if="decodedContent" @click="onButtonClick">Update usedatetime</button>
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

    if (data.length > 0 && data[0].orderno === decodedContent.value) {
      result.value = data[0];
    } else {
      result.value = "Order number not found or doesn't match";
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const onButtonClick = async () => {
  try {
    const response = await fetch("https://koh-samui.com:53005/payresultone/update-usedatetime", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ orderno: decodedContent.value }) // Replace this with the actual orderno
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Updated usedatetime:", data);
  } catch (error) {
    console.error("Error updating usedatetime:", error);
  }
};

</script>
