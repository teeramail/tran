<template>
    <div>
      <h1>Transaction Details</h1>
      <div v-if="receivedData && isCheckSumValid(receivedData)">
        <p>Transaction ID: {{ receivedData.TransactionId }}</p>
        <p>Amount: {{ receivedData.Amount }}</p>
        <p>Order No: {{ receivedData.OrderNo }}</p>
        <p>Customer ID: {{ receivedData.CustomerId }}</p>
        <p>Bank Code: {{ receivedData.BankCode }}</p>
        <p>Payment Date: {{ receivedData.PaymentDate }}</p>
        <p>Payment Status: {{ receivedData.PaymentStatus }}</p>
        <p>Bank Reference Code: {{ receivedData.BankRefCode }}</p>
        <p>Current Date: {{ receivedData.CurrentDate }}</p>
        <p>Current Time: {{ receivedData.CurrentTime }}</p>
        <p>Payment Description: {{ receivedData.PaymentDescription }}</p>
        <p>Credit Card Token: {{ receivedData.CreditCardToken }}</p>
        <p>Currency: {{ receivedData.Currency }}</p>
        <p>Customer Name: {{ receivedData.CustomerName }}</p>
        <p>Check Sum: {{ receivedData.CheckSum }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import md5 from 'md5';
  import crypto from 'crypto';
  
  const md5SecretKey = 'sHsAEKgIHqLMaa2HbJeGP449howZt1gXDiTz3B5yFsloAk9QOkEamIVznJgM78GFXiVDMqMUp1U0ZamgODxOa7HqmpcJtNF1EV5AHqNSnzA1ce2Pa5BIytiJFScdBVE2rZw7yJZyT2bguJJHMGCZG2xTpSm1Vof0x8puZ';
  
  function isCheckSumValid({
    TransactionId,
    Amount,
    OrderNo,
    CustomerId,
    BankCode,
    PaymentDate,
    PaymentStatus,
    BankRefCode,
    CurrentDate,
    CurrentTime,
    PaymentDescription,
    CreditCardToken,
    Currency,
    CustomerName,
    CheckSum,
  }) {
    const rawData = `${TransactionId}${Amount}${OrderNo}${CustomerId}${BankCode}${PaymentDate}${PaymentStatus}${BankRefCode}${CurrentDate}${CurrentTime}${PaymentDescription}${CreditCardToken}${Currency}${CustomerName}${md5SecretKey}`;
  
    const calculatedCheckSum = crypto
      .createHash('md5')
      .update(rawData)
      .digest('hex');
  
    return CheckSum === calculatedCheckSum;
  }
  
  export default {
  setup() {
    const receivedData = ref({
      TransactionId: '181838',
      Amount: '10000',
      OrderNo: '00000001',
      CustomerId: '123456',
      BankCode: 'creditcard',
      PaymentDate: '20230417214739',
      PaymentStatus: '0',
      BankRefCode: '638173',
      CurrentDate: '20230417',
      CurrentTime: '214739',
      PaymentDescription: 'Test Payment',
      CreditCardToken:
        'b51af1bf96c777f1b40da821747cffcfd2aa193aae141f0d1f8a10da6c586384',
      Currency: '764',
      CustomerName: '',
      CheckSum: '7c3815fd52530e067317b04187fa202e',
    });

    return {
      receivedData,
      isCheckSumValid,
    };
  },
};

  </script>
  