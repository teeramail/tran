<template>
  <div>
    <!-- Render the records here -->
    <div v-for="record in records" :key="record._id">
      <p style="color: red;">Reminder: {{ formatDate(record.createdAt) }}</p>
      <p>
        {{ record.message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const records = ref([]);

const formatDate = (dateString) => {
  if (!dateString) return ""; // Return an empty string if dateString is undefined or null
  return dateString.substring(0, 16); // Extracts only YYYY-MM-DDTHH:MM from the timestamp
};

onMounted(async () => {
  try {
      const response = await fetch('https://koh-samui.com:53005/willbookext');
      const data = await response.json();
      
      // Filter the data based on PaymentStatus not being 0
      const filteredData = data.filter(record => {
          return record.reservation && record.reservation.paymentResult && record.reservation.paymentResult.PaymentStatus !== 0;
      });

      // Sort by _id in descending order and take the latest 10 records
      const sortedData = filteredData.sort((a, b) => (b._id > a._id ? 1 : -1)).slice(0, 10);
      
      // Extract the "name" and "eventInfo" fields
      records.value = sortedData.map(record => ({
          _id: record._id,
          message: `${record.user.name}, show SMS, pay at gate for FREE  ${record.eventGift === "g01" ? "Food Coupons" : "pants"} + reserved seat! Arrive by 20:45, ${record.eventInfo}`
      }));
  } catch (error) {
      console.error("Error fetching data:", error);
  }
});
</script>
