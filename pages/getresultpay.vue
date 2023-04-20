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

<script setup>
import { ref } from 'vue';
import util from 'util';
import bodyParser from 'body-parser';

async function asyncData(context) {
  if (context.req.method === 'POST') {
    const parseJsonBody = util.promisify(bodyParser.json());
    await parseJsonBody(context.req, context.res);
    return { transactionResult: context.req.body };
  }
  return { transactionResult: null };
}

const transactionResult = ref(null);
(async () => {
  const data = await asyncData(getContext());
  if (data.transactionResult) {
    transactionResult.value = data.transactionResult;
  }
})();

function getContext() {
  const ctx = {};
  if (process.server) {
    const {req, res} = useContext();
    ctx.req = req;
    ctx.res = res;
  }
  return ctx;
}
</script>
