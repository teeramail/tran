<template>
  <div>
    <ClientOnly>
      <qrcode-stream v-if="scanning" @decode="onDecode" @error="onError"></qrcode-stream>
    </ClientOnly>

    <div v-if="result1">
      <div>Scanned At: {{ thaiDateTimeString(result1.createdAt) }}</div>
      <div>Agent Name: {{ result1.agenttool?.agent_name }}</div>
    </div>
    <div v-if="result2">
      <div>Scanned At: {{ thaiDateTimeString(result2.createdAt) }}</div>
      <div>Agent Name: {{ result2.agenttool?.agent_name }}</div>
    </div>

    <div v-if="decodedContent">Decoded content: {{ decodedContent }}</div>
    <div v-if="total">Total: {{ total }}</div>
    <div v-if="result">
  <div v-for="item in result" :key="item._id">
    <div>Scaned At: {{ thaiDateTimeString(item.createdAt) }}</div>
  </div>
</div>

    <button v-if="isPaymentSuccessful && isUsedatetimeNull && !usedatetimeUpdated" @click="onButtonClick">Update usedatetime</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { QrcodeStream } from "vue3-qrcode-reader";

const scanning = ref(true);
const decodedContent = ref(null);
const result = ref(null);
const usedatetimeUpdated = ref(false);
const total = ref(null);


const onError = (error) => {
  console.error("QR code scanning error:", error);
};

const thaiDateTimeString = (dateString) => {
  if(dateString) {
    const utcDateTime = new Date(dateString);
    const thaiDateTime = new Date(utcDateTime.getTime() + (7 * 60 * 60 * 1000));
    const thaiYear = thaiDateTime.getUTCFullYear();
    const thaiMonth = ("0" + (thaiDateTime.getUTCMonth() + 1)).slice(-2);
    const thaiDay = ("0" + thaiDateTime.getUTCDate()).slice(-2);
    const thaiHour = ("0" + thaiDateTime.getUTCHours()).slice(-2);
    const thaiMinute = ("0" + thaiDateTime.getUTCMinutes()).slice(-2);
    const thaiSecond = ("0" + thaiDateTime.getUTCSeconds()).slice(-2);

    return `${thaiYear}-${thaiMonth}-${thaiDay} ${thaiHour}:${thaiMinute}:${thaiSecond}`;
  }
  return '';
};



const onDecode = async (content) => {
  console.log("Decoded QR code:", content);
  
  const url = new URL(content);
  const idenger = url.searchParams.get('idenger');
  console.log("Idenger:", idenger);

  decodedContent.value = idenger;
  scanning.value = false;
  usedatetimeUpdated.value = false;

  try {
    const response = await fetch(`https://koh-samui.com:53005/agentscancheck/10/${decodedContent.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.enterps && data.enterps.length > 0) {
      result.value = data.enterps;
      total.value = data.total;
      console.log("Results:", result.value);
      console.log("Total:", data.total);
    } else {
      result.value = null;
      total.value = null;
    }

    
  

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


const isUsedatetimeNull = computed(() => result.value?.usedatetime == null);

const onButtonClick = async () => {
  try {
    const response = await fetch("https://koh-samui.com:53005/payresultone/update-usedatetime", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ orderno: decodedContent.value })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log("Updated usedatetime:", data);
    usedatetimeUpdated.value = true;
    onDecode(decodedContent.value); // Fetch the updated data
  } catch (error) {
    console.error("Error updating usedatetime:", error);
  }
};

const isPaymentSuccessful = computed(() => result.value?.paymentResult?.PaymentStatus === 0);

</script>
