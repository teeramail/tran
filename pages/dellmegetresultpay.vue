<template>
  <div>
    <h1>Payment Results</h1>
    <div v-if="transactions.length > 0">
      <h2>Transactions</h2>
      <ul>
        <li v-for="transaction in transactions" :key="transaction.transNo">
          <strong>Transaction No:</strong> {{ transaction.transNo }}<br>
          <strong>Response Code:</strong> {{ transaction.respCode }}<br>
          <strong>Status:</strong> {{ transaction.status }}<br>
          <strong>Order No:</strong> {{ transaction.orderNo }}<br>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No transaction data received.</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      transactions: [],
    };
  },
  serverPrefetch() {
    // This method will be called when the server receives data
    this.$nuxt.context.app.use(async (req, res, next) => {
      if (req.path === '/getresultpay' && req.method === 'POST') {
        console.log('Received data:', req.body);

        // Add the received data to the transactions array
        this.transactions.push(req.body);

        res.status(200).send('Data received');
      } else {
        next();
      }
    });
  },
};
</script>
