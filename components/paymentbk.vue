<!-- /components/payment.vue -->
<template>
  <div>
    <form
      id="payment-form"
      action="https://sandbox-cdnv3.chillpay.co/Payment/"
      method="post"
      role="form"
      class="form-horizontal"
    >
      <modernpay:widget
        id="modernpay-widget-container"
        data-merchantid="M033598"
        :data-amount="dataAmount"
        :data-orderno="dataOrderNo"
        :data-customerid="dataCustomerId"
        :data-clientip="dataClientip"
        data-routeno="1"
        data-currency="764"
        :data-description="dataEmail"
        data-apikey="7ynsXqBl3e0vFPfI1fivU9VSAZ8UZTQmta7vz4b6heptCXrrEja8ub1Z8YW6VnDX"
      >
      </modernpay:widget>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { generateUniqueID } from '~/utils/uniqueID.js';

const route = useRoute();
const reservation = ref(null);

onMounted(async () => {
  const response = await fetch(`https://koh-samui.com:53005/prereservation/${route.query.preReservationId}`);
  if (response.ok) {
    reservation.value = await response.json();
    reservation.value.orderno = await generateUniqueID();
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://sandbox-cdnv3.chillpay.co/js/widgets.js?v=1.00';
  script.charset = 'utf-8';
  document.body.appendChild(script);
});

const dataCustomerId = computed(() => reservation.value?.eventId || '');
const dataOrderNo = computed(() => reservation.value?.orderno || '');
const dataEmail = computed(() => reservation.value?.user?.email || '');
const dataAmount = computed(() => {
  if (reservation.value && reservation.value.tickets) {
    return reservation.value.tickets.reduce((sum, ticket) => sum + (ticket.price * ticket.qty), 0);
  } else {
    return 0;
  }
});
const dataClientip = computed(() => reservation.value?.ipadress || '');
</script>
