<!-- /pages/reser.vue -->
<template>
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
    <div>
      <label for="tickets">Number of Tickets:</label>
      <button @click.prevent="decrementTickets">-</button>
      <input type="number" id="tickets" v-model.number="reservation.tickets" min="1" max="20" />
      <button @click.prevent="incrementTickets">+</button>
    </div>
    <button type="submit" :disabled="!isEmailValid || !isMobileValid">Submit Reservation</button>
  </form>

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
</template>

<script setup>
import { ref, computed } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useRouter } from 'vue-router';

const router = useRouter();

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

      // Clear the form
      reservation.value = {
        name: '',
        reserveDate: '',
        mobile: '',
        email: '',
        tickets: 1,
      };

      // Redirect to the /payment route with the 'tickets' parameter
      router.push({ name: 'payment', query: { tickets: createdReservation.tickets } });
    } catch (error) {
      console.error('Error submitting reservation:', error);
    }
  }
};
</script>



<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>

