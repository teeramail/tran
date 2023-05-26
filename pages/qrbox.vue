<template>
  <div>
    <ClientOnly>
      <qrcode-stream v-if="scanning" @decode="onDecode" @error="onError"></qrcode-stream>
    </ClientOnly>
    <div v-if="decodedContent">Decoded content: {{ decodedContent }}</div>
    <div v-if="result">
      <div>Name: {{ result.user.name }}</div>
      <div>Mobile: {{ result.user.mobile }}</div>
      <div>Tickets: {{ result.tickets }}</div>
      <div>OrderNo: {{ result.orderno }}</div>
      <div :class="{'text-green-500': isPaymentSuccessful, 'text-red-500': !isPaymentSuccessful}">
        PaymentStatus: {{ paymentStatusText }}
      </div>
      <div>Amount: {{ result.paymentResult.Amount }}</div>
      <div>Agent Name: {{ result.agent.agent_name }}</div>
      <div>Agent Email: {{ result.agent.agent_email }}</div>
      <div>Event Date: {{ readableDate }}</div>
      <div class="text-red-500">usedatetime: {{ thaiDateString }} {{ thaiTimeString}}</div>
    </div>
    <button v-if="decodedContent && !usedatetimeUpdated" @click="onButtonClick">Update usedatetime</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { QrcodeStream } from "vue3-qrcode-reader";
const scanning = ref(true);
const decodedContent = ref(null);
const result = ref(null);
const usedatetimeUpdated = ref(false);

const onError = (error) => {
  console.error("QR code scanning error:", error);
};

const readableDate = computed(() => {
  if(result.value && result.value.event && result.value.event.eventDate) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(result.value.event.eventDate));
  }
  return '';
});

const thaiDateString = computed(() => {
  if(result.value && result.value.usedatetime) {
    const utcDateTime = new Date(result.value.usedatetime);
    // Adjusting the date to Thai date
    const thaiDateTime = new Date(utcDateTime.getTime() + (7 * 60 * 60 * 1000));
    // Formatting the Thai date
    const thaiYear = thaiDateTime.getUTCFullYear();
    const thaiMonth = ("0" + (thaiDateTime.getUTCMonth() + 1)).slice(-2);
    const thaiDay = ("0" + thaiDateTime.getUTCDate()).slice(-2);
    
    return `${thaiYear}-${thaiMonth}-${thaiDay}`;
  }
  return '';
});

const thaiTimeString = computed(() => {
  if(result.value && result.value.usedatetime) {
    const utcDateTime = new Date(result.value.usedatetime);
    // Adjusting the time to Thai time
    const thaiDateTime = new Date(utcDateTime.getTime() + (7 * 60 * 60 * 1000));
    // Formatting the Thai time
    const thaiHour = ("0" + thaiDateTime.getUTCHours()).slice(-2);
    const thaiMinute = ("0" + thaiDateTime.getUTCMinutes()).slice(-2);
    const thaiSecond = ("0" + thaiDateTime.getUTCSeconds()).slice(-2);
    
    return `${thaiHour}:${thaiMinute}:${thaiSecond}`;
  }
  return '';
});

const onDecode = async (content) => {
  console.log("Decoded QR code:", content);
  decodedContent.value = content;
  scanning.value = false;
  usedatetimeUpdated.value = false;

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
      console.log(result.value);
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
      body: JSON.stringify({ orderno: decodedContent.value })
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Updated usedatetime:", data);
    usedatetimeUpdated.value = true;
    onDecode(decodedContent.value); // Fetch the updated data
  } catch (error) {
    console.error("Error updating usedatetime:", error);
  }
};

// computed properties
const isPaymentSuccessful = computed(() => result.value?.paymentResult?.PaymentStatus === 0);
const paymentStatusText = computed(() => isPaymentSuccessful.value ? 'success' : 'unsuccess');

</script>
