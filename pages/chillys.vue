<template>
    <div>
      <!-- Your other page or component content -->
      <button @click="makePaymentRequest">Test Payment</button>
    </div>
  </template>
  
<script setup>
import md5 from 'md5';

async function makePaymentRequest() {
  const param1 = 'M033598';
  const param2 = 'Db6Ep74yKoBrsTkEsg8ELcfizFvI9vh9EWsvCwz1SmlZammV52DAFfo6zPjUd1Z6';
  const param3 = '12821859';
  const md5SecretKey = 'sHsAEKgIHqLMaa2HbJeGP449howZt1gXDiTz3B5yFsloAk9QOkEamIVznJgM78GFXiVDMqMUp1U0ZamgODxOa7HqmpcJtNF1EV5AHqNSnzA1ce2Pa5BIytiJFScdBVE2rZw7yJZyT2bguJJHMGCZG2xTpSm1Vof0x8puZ';

  const combinedData = param1 + param2 + param3 + md5SecretKey;
  const CheckSum = md5(combinedData);

  const postData = new URLSearchParams();
  postData.append('MerchantCode', param1);
  postData.append('ApiKey', param2);
  postData.append('TransactionId', param3);
  postData.append('CheckSum', CheckSum);

  try {
    const response = await fetch('https://sandbox-appsrv2.chillpay.co/api/v2/Payment/', {
      method: 'POST',
      body: postData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.text();
    console.log(responseData);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

makePaymentRequest();

</script>
