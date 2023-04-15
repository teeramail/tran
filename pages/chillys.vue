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
  const md5SecretKey = 'DYvAZefVOObYHRiiJXKAD6bLotca4SfiwCSQwhRgylpjNW2nmdZWTt8qrbd06n9W9JlnrorsNIBqH81FDp54sQ6Dfzp7ySTs0vHx7LAc1CP95sVPca6f3Izt3DW5hbdzIfVNjgAtLnzrssut1zBi7XHEVCmCnYktvH9HW';

  const combinedData = param1 + param2 + param3 + md5SecretKey;
  const CheckSum = md5(combinedData);

  const postData = new URLSearchParams();
  postData.append('MerchantCode', param1);
  postData.append('ApiKey', param2);
  postData.append('TransactionId', param3);
  postData.append('CheckSum', CheckSum);

  try {
    const response = await fetch('https://appsrv.chillpay.co/api/v2/PaymentStatus/', {
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
