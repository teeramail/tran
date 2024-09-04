save as email
<template>
    <div v-for="record in records" :key="record._id">
      <p style="color: red;">Reminder: {{ formatDate(record.createdAt) }}</p>
      <h3>Mobile: {{ record.user.mobile }}</h3>
      <p>Hi {{ record.user.name }} show this SMS, pay at gate get FREE  {{ record.eventGift === "g01" ? "Food Coupons" : "beach pants" }}, we reserved seat until 20:40, {{ record.eventInfo }}
</p>
      <h2>Email Address: {{ record.user.email }}</h2>
      <h3>Subject: {{ subject }}</h3>
    
      <p>Dear {{ record.user.name }},</p>
      <p>
        Join us for the Muay Thai match @ {{ record.eventInfo }} and receive a FREE
        {{ record.eventGift === "g01" ? "Food Coupons" : "pair of our beautiful, comfortable, and stylish pants" }}! An exclusive offer
        just for you.
      </p>
      <p>
        We've reserved
        {{ record.tickets[0].qty == 1 ? " a" : "" }} {{ record.tickets[0].type }}
        seat{{ record.tickets[0].qty > 1 ? "s" : "" }} especially for you. Each
        seat is priced at {{ record.tickets[0].price }}, and there are
        {{ record.tickets[0].qty }} seat{{ record.tickets[0].qty > 1 ? "s" : "" }}
        available under this special offer.
      </p>
      <p>Important to Remember:</p>
      <ul>
        <li>
          To avail of the {{ record.eventGift === "g01" ? "Food Coupons" : "free pants" }}, simply present this email at the gate and
          complete your payment.
        </li>
        <li>
          Kindly ensure your arrival at the gate before 20:40 to benefit from this
          unique opportunity.
        </li>
      </ul>
      <p>We're eagerly looking forward to welcoming you!</p>
      <p>
        If you wish to make any adjustments or book for another match, please let
        us know. We're here to assist you!
      </p>
      <p>Warm regards,</p>
      <p>Khwan</p>
      <p>Hospitality Associate</p>
      <p>Tel/WhatsApp: +66810608540</p>
      <hr /> <!-- Separator between emails -->
    </div>
  </template>
    
  <script setup>
  import { ref, onMounted } from "vue";
  
  const records = ref([]);
  const subject = "Exclusive Offer: Join us for the Muay Thai Match!";
  
  onMounted(async () => {
    try {
      const response = await fetch("https://koh-samui.com:53005/willbookext");
      const data = await response.json();
  
      // Filter the data based on PaymentStatus not being 0
      const filteredData = data.filter(record => {
        return record.reservation && record.reservation.paymentResult && record.reservation.paymentResult.PaymentStatus !== 0;
      });
  
      // Sort filtered data by _id in descending order and take the latest 10 records
      const sortedData = filteredData.sort((a, b) => (b._id > a._id ? 1 : -1)).slice(0, 10);
      records.value = sortedData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
  
  const formatDate = (dateString) => {
    return dateString.substring(0, 16); // Extracts only YYYY-MM-DDTHH:MM from the timestamp
  };
  </script>
  