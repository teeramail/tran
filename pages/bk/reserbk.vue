<!-- components/ReservationForm.vue -->
<template>
  <form @submit.prevent="showConfirmDialog">
    <div>
      <label>Name:</label>
      <input type="text" v-model="reservation.name" />
    </div>
    <div>
      <label>Reserve Date:</label>
      <VueDatePicker v-model="reservation.reserveDate"></VueDatePicker>
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

  <!-- ... (the rest of the form code) -->

  <form id="payment-form" action="https://cdn.chillpay.co/Payment/" method="post" role="form" class="form-horizontal" style="display: none;">
    <modernpay:widget id="modernpay-widget-container"
      data-merchantid="M033598"
      data-amount="3500"
      data-orderno="00000001"
      data-customerid="123456"
      data-mobileno="0889999999"
      data-clientip="110.168.249.115"
      data-routeno="1"
      data-currency="764"
      data-description="Boxing Payment"
      data-apikey="Db6Ep74yKoBrsTkEsg8ELcfizFvI9vh9EWsvCwz1SmlZammV52DAFfo6zPjUd1Z6">
    </modernpay:widget>
    <button type="submit" id="btnSubmit" value="Submit" class="btn" style="display: none;">Payment</button>
  </form>

</template>

<script setup>
import { ref, computed } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const reservation = ref({
  name: '',
  reserveDate: '',
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

      // Prepare payment information
      const paymentForm = document.getElementById('payment-form');
      paymentForm.setAttribute('data-amount', reservation.value.tickets * 100);
      paymentForm.setAttribute('data-orderno', createdReservation._id);
      paymentForm.setAttribute('data-customerid', createdReservation.customerId);
      paymentForm.setAttribute('data-mobileno', reservation.value.mobile);
      paymentForm.setAttribute('data-description', `Reservation for ${reservation.value.name}`);

      // Submit the payment form
      paymentForm.submit();

      // Clear the form
      reservation.value = {
        name: '',
        reserveDate: '',
        mobile: '',
        email: '',
        tickets: 1,
      };
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

