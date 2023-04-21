<!-- /pages/reser.vue -->
<template>
  <div class="page-background">
  <div class="header-container">
    <h2 class="header">Samui Super Fight</h2>
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
      <div class="bottom-text">
        Join us at  Phetchbuncha boxing stadium for an unforgettable night! Start at 21:00, with live music and spectacular performances to entertain you - all for FREE before the main event begins! Arrive early and savor complimentary food and drinks at our stadium. Don't miss out on this incredible experience!
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

.header {
  text-align: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  margin-bottom: 1rem;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 1rem 0;
  text-align: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  margin-bottom: 1rem;
  z-index: 10;
}


.form-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.page-background {
  min-height: 100vh;
  background-image: url("path/to/your/background-image.jpg");
  background-size: cover;
  background-position: center;
}
.form-container {
    padding-top: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

form {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

div {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button[type="submit"] {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
}

button[type="submit"]:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.ticket-control {
  display: flex;
  align-items: center;
}

.ticket-control button {
  background-color: #007bff;
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
}

.ticket-control input[type="number"] {
  flex-grow: 1;
  margin-right: 0.5rem;
}

.ticket-input {
  width: 50px;
  text-align: center;
}

.tickets-container {
  width: 30%;
  margin: 0 auto; /* Center the container horizontally */
}

.bottom-text {
  margin-top: 1rem;
  text-align: center;
  font-size: 1rem;
  line-height: 1.4;
  padding: 1rem;
  width: 100%;
  max-width: 500px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
