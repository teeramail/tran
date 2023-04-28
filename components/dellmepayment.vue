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
          data-orderno="00000001"
          :data-customerid="'3333a2'"
          data-mobileno="0889999999"
          data-clientip="58.11.86.61"
          data-routeno="1"
          data-currency="764"
          data-description="Boxing Payment"
          data-apikey="7yaX"
        >
        </modernpay:widget>
        <button type="submit" id="btnSubmit" value="Submit" class="btn">
          Payment
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref, computed, watchEffect, defineProps } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const tickets = ref(route.query.tickets || 0);
  const dataAmount = computed(() => tickets.value * 1000);
  
  const props = defineProps({
    dataCustomerId: String,
  });
  
  // This reactive property will store the dataCustomerId value
  const internalDataCustomerId = ref('');
  
  // This watcher will update the 'internalDataCustomerId' whenever the 'dataCustomerId' prop changes
  watchEffect(() => {
    if (props.dataCustomerId) {
      internalDataCustomerId.value = props.dataCustomerId;
    }
  });
  
  onMounted(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://sandbox-cdnv3.chillpay.co/js/widgets.js?v=1.00';
    script.charset = 'utf-8';
    document.body.appendChild(script);
  });
  </script>
  