<!-- /pages/reser.vue -->
<template>
  <div class="page-background">
  <div class="header-container">
    <h2 class="header">{{headerText}}</h2>
  </div>
  <div class="form-container">
    <div class="form-wrapper">
      <form @submit.prevent="showConfirmDialog">
        <div>
          <label>Name:</label>
          <input type="text" v-model="reservation.name" />
        </div>
        <div>
          <label>Reserve Date:</label>
          <VueDatePicker v-model="reservation.reserveDate" :min-date="new Date()" :disabled-dates="disableNonWedSat" auto-apply :enable-time-picker="false"/>
        </div>
        <div>
          <label>Mobile:</label>
          <input type="text" v-model="reservation.mobile" @blur="validateMobile" />
          <span v-if="mobileTouched && !isMobileValid" style="color: red;">Invalid mobile format</span>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" v-model="reservation.email" @blur="validateEmail" />
          <span v-if="emailTouched && !isEmailValid" style="color: red;">Invalid email format</span>
        </div>
        <div class="tickets-container">
          <label for="tickets">Number of Tickets:</label>
          <div class="ticket-control">
            <button @click.prevent="decrementTickets">-</button>
            <input type="number" id="tickets" class="ticket-input" v-model.number="reservation.tickets" min="1" max="20" />
            <button @click.prevent="incrementTickets">+</button>
          </div>
        </div>
        <button type="submit" :disabled="!isEmailValid || !isMobileValid">Submit Reservation</button>
      </form>
      <!-- <div class="bottom-text">
        Join us at  Phetchbuncha boxing stadium for an unforgettable night! Start at 21:00, with live music and spectacular performances to entertain you - all for FREE before the main event begins! Arrive early and savor complimentary food and drinks at our stadium. Don't miss out on this incredible experience!
      </div> -->
      <div class="bottom-text">
        Join us at  Chada Restaurant  for an unforgettable night! Start at 19:00, with live music and spectacular performances to entertain you - all for FREE before the main event begins! Arrive early and savor complimentary food 
      </div>
      <transition name="modal">
        <div v-if="confirmReservation" class="modal">
          <div class="modal-content">
            <h3>Confirm Reservation</h3>
            <p>Are you sure you want to submit the reservation?</p>
            <button @click="submitReservation">Yes</button>
            <button @click="confirmReservation = false">No</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</div>
</template>

<script setup>
import '~/assets/ReserStyles.css';
import { ref, computed } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const dataCustomerId = ref(route.query.dataCustomerId);
const dataAmount = ref(route.query.dataAmount || 0);
const headerText = ref(route.query.dataCustomerId || 'Start Booking');

async function generateUniqueID() {
  const { customAlphabet } = await import('nanoid');
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const length = 7;
  const nanoid = customAlphabet(alphabet, length);

  const timestamp = Date.now().toString(36);
  const uniqueID = timestamp + nanoid(); // Set the value of uniqueID ref
  console.log(uniqueID);
  return uniqueID;
}

async function getIpAddress() {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      console.log("Your IP Address:", data.ip);
      const ipAddress = data.ip;
      return ipAddress;
    }

getIpAddress();

// const reserveDate = ref(new Date());

const reservation = ref({
  name: '',
  reserveDate: new Date() ,
  mobile: '',
  email: '',
  tickets: 1,
});


const confirmReservation = ref(false);

const incrementTickets = (event) => {
  event.preventDefault();
  if (reservation.value.tickets < 20) {
    reservation.value.tickets += 1;
  }
};

const decrementTickets = (event) => {
  event.preventDefault();
  if (reservation.value.tickets > 1) {
    reservation.value.tickets -= 1;
  }
};

const emailTouched = ref(false);
const mobileTouched = ref(false);

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const mobileRegex = /^(\+\d{1,3})?\s?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}$/;

const isEmailValid = computed(() => emailRegex.test(reservation.value.email));
const isMobileValid = computed(() => mobileRegex.test(reservation.value.mobile));

const validateEmail = () => {
  emailTouched.value = true;
};

const validateMobile = () => {
  mobileTouched.value = true;
};

const showConfirmDialog = () => {
  if (isEmailValid.value && isMobileValid.value) {
    confirmReservation.value = true;
  } else {
    if (!isEmailValid.value) {
      emailTouched.value = true;
    }
    if (!isMobileValid.value) {
      mobileTouched.value = true;
    }
  }
};

const disableNonWedSat = (date) => {
  const day = date.getDay();
  return day !== 3 && day !== 6; // Disables all dates that are not Wednesday (3) or Saturday (6)
};


const submitReservation = async () => {
  if (isEmailValid.value && isMobileValid.value) {
    try {
      // Close the confirmation dialog
      confirmReservation.value = false;

      const uniqueID = await generateUniqueID();
      reservation.value.orderno = uniqueID ;


      const ipAddress = await getIpAddress();
      reservation.value.ipaddress = ipAddress;

      // Log the reservation data before sending it
      console.log('Sending reservation data:', reservation.value);

      // Save the reservation data to MongoDB
      const response = await fetch("https://koh-samui.com:53005/reservations", {
        method: "POST",
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

      // Store data in temporary variables before clearing the form
      const tempTickets = createdReservation.tickets;
      const tempOrderNo = reservation.value.orderno
      const tempIpaddress = reservation.value.ipaddress ;
      const tempEmail = reservation.value.email;

      // Clear the form
      reservation.value = {
        name: '',
        reserveDate: '',
        mobile: '',
        email: '',
        tickets: 1,
        orderno: '',
      };
      
      // Redirect to the /payment route with the 'tickets' parameter
      router.push({
        name: 'payment',
        query: {
          tickets: tempTickets,
          dataCustomerId: dataCustomerId.value,
          dataAmount: dataAmount.value,
          dataOrderNo: tempOrderNo,
          dataDescription: tempOrderNo,
          dataEmail: tempEmail,
          datClientip: tempIpaddress,
        },
      });

    } catch (error) {
      console.error('Error submitting reservation:', error);
    }
  }
};



</script>

