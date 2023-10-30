<!-- pages\guestname.vue -->
<template>
  <div class="page-background">
    <div class="header-container">
      <h2 class="header">{{ headerText }}</h2>
    </div>
    <div class="form-container">
      <div class="form-wrapper">
        <form @submit.prevent="submitReservation">
          <div>
            <label>Name:</label>
            <input type="text" :value="reservation.user.name" @input="e => reservation.user.name = e.target.value" />
          </div>
          <div>
            <label>Mobile:</label>
            <input type="text" :value="reservation.user.mobile" @input="e => reservation.user.mobile = e.target.value" @blur="validateMobile" />
            <span v-if="mobileTouched && !isMobileValid" style="color: red;">Invalid mobile format</span>
          </div>
          <div>
            <label>Email:</label>
            <input type="email" :value="reservation.user.email" @input="e => reservation.user.email = e.target.value" @blur="validateEmail" />
            <span v-if="emailTouched && !isEmailValid" style="color: red;">Invalid email format</span>
          </div>
          <div v-if="showPickup">
            <label>Place to pickup please specific Hotel name and room number</label>
            <input type="text" :value="reservation.user.pickup" @input="e => reservation.user.pickup = e.target.value" />
          </div>
          <button type="submit" :disabled="!isEmailValid || !isMobileValid">Submit Reservation</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import '~/assets/ReserStyles.css';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { getIpAddress } from '~/utils/ipAddress.js'; 

const router = useRouter();
const route = useRoute();
const preReservationId = route.query.preReservationId;
const headerText = ref(route.query.dataCustomerId || 'We are almost done');

console.log(preReservationId)

const reservation = ref({
  user: {
    name: '',
    mobile: '',
    email: '',
  },
  ipadress: '',
});

const emailTouched = ref(false);
const mobileTouched = ref(false);

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const mobileRegex = /^(\+\d{1,3})?\s?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}$/;

const isEmailValid = computed(() => emailRegex.test(reservation.value.user.email));
const isMobileValid = computed(() => mobileRegex.test(reservation.value.user.mobile));

const validateEmail = () => {
  emailTouched.value = true;
};

const validateMobile = () => {
  mobileTouched.value = true;
};

const showPickup = ref(false);

// New code to find IP address when page loads
onMounted(async () => {
  try {
    const ipAddress = await getIpAddress();
    reservation.value.ipadress = ipAddress;
        // Fetch the event details
        const response = await fetch(`https://koh-samui.com:53005/pickup/${preReservationId}`);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const eventData = await response.json();

    // Compute the maximum date for pickup
    let eventDate = new Date(eventData[0].eventDetails[0].eventDate);
    let maxPickupDate = new Date(eventDate.getTime() - eventData[0].eventDetails[0].pickupMinute * 60 * 1000);

    // Check if pickup is 'Y' and the current date is less than the max pickup date
    if (eventData[0].eventDetails[0].pickup === 'Y' && new Date() < maxPickupDate) {
      showPickup.value = true;
    }


  } catch (error) {
    console.error('Error getting IP address:', error);
  }
});

const submitReservation = async () => {
  if (isEmailValid.value && isMobileValid.value) {
    try {
      // Add the preReservationId to the reservation data
      reservation.value.preReservationId = preReservationId;

      // Log the reservation data before sending it
      console.log('Sending reservation data:', reservation.value);

      // Save the reservation data to MongoDB
      const response = await fetch(`https://koh-samui.com:53005/prereservation/guestinfo/${preReservationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation.value),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const createdReservation = await response.json();
      console.log('Reservation submitted:', createdReservation);

      // Reset reservation values after submit
      reservation.value.user = {
        name: '',
        mobile: '',
        email: '',
        pickup: '',
      };
      reservation.value.ipadress = '';

      router.push({ name: 'confirmpage', query: { preReservationId: route.query.preReservationId }});

    } catch (error) {
      console.error('Error submitting reservation:', error);
    }
  }
};
</script>
