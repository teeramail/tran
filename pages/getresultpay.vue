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
export default {
  async asyncData(context) {
    if (context.req.method === 'POST') {
      const { body } = context.req;
      return { transactionResult: body };
    }
    return { transactionResult: null };
  },
}
</script>
