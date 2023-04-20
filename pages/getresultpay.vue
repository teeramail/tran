<template>
  <div>
    <h1>ChillPay Callback</h1>
    <div v-if="transactionResult">
      <h2>Transaction Details</h2>
      <ul>
        <li><strong>Transaction No:</strong> {{ transactionResult.transNo }}</li>
        <li><strong>Response Code:</strong> {{ transactionResult.respCode }}</li>
        <li><strong>Status:</strong> {{ transactionResult.status }}</li>
        <li><strong>Order No:</strong> {{ transactionResult.orderNo }}</li>
      </ul>
    </div>
    <div v-else>
      <p>No transaction data received.</p>
    </div>
  </div>
</template>

<script>
import bodyParser from 'body-parser';

export default {
  async asyncData(context) {
    if (context.req.method === 'POST') {
      const parseJsonBody = bodyParser.json();
      let body = null;

      await new Promise((resolve, reject) => {
        parseJsonBody(context.req, context.res, (error) => {
          if (error) {
            console.error('Error parsing JSON body:', error);
            reject(error);
          } else {
            body = context.req.body;
            resolve();
          }
        });
      });

      return { transactionResult: body };
    }
    return { transactionResult: null };
  },
};
</script>
