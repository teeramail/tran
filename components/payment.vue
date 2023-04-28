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
        :data-mobileno="dataMobileno"
        data-clientip="58.11.86.61"
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

const route = useRoute();
const tickets = ref(route.query.tickets || 0);
const dataCustomerId = ref(route.query.dataCustomerId || '');
const dataOrderNo = ref(route.query.dataOrderNo || 'x');
const dataEmail = ref(route.query.dataEmail || '333@a.com');
const dataAmount = computed(() => tickets.value * 3000);

onMounted(() => {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://sandbox-cdnv3.chillpay.co/js/widgets.js?v=1.00';
  script.charset = 'utf-8';
  document.body.appendChild(script);
});
</script>