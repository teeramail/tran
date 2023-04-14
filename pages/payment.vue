<template>
    <div>
      <form id="payment-form" action="https://cdn.chillpay.co/Payment/" method="post" role="form" class="form-horizontal">
        <modernpay:widget id="modernpay-widget-container" 
        data-merchantid="M033598" data-amount="3000" data-orderno="00000001" data-customerid="123456" 
        data-mobileno="0889999999" data-clientip="58.11.86.61" data-routeno="1" data-currency="764" 
        data-description="Boxing Payment" data-apikey="Db6Ep74yAAartvCwz1SmlZammV52DAFTytedPjUd1Z6">
        </modernpay:widget>
        <button type="submit" id="btnSubmit" value="Submit" class="btn">Payment</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { useMeta } from 'nuxt3'
  
  useMeta(() => ({
    script: [
      {
        src: 'https://cdn.chillpay.co/js/widgets.js?v=1.00',
        async: true,
        charset: 'utf-8',
      },
    ],
  }))
  </script>
  