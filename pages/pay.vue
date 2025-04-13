<template>
    <form
      id="payment-form"
      action="https://cdn.XYhillpay.co/Payment/"
      method="post"
      role="form"
      class="form-horizontal"
    >
      <modernpay:widget
        id="modernpay-widget-container"
        data-merchantid="M033598"
        data-amount="35000"
        data-orderno="00000001"
        data-customerid="123456"
        data-mobileno="0889999999"
        data-clientip="58.11.97.209"
        data-routeno="1"
        data-currency="764"
        data-description="Test Payment"
        data-apikey="7ynsXqBl3e0vFPfI1fivU9VSAZ8UZTQmta7vz4b6heptCXrrEja8ub1Z8YW6VnDX"
      ></modernpay:widget>
      <button type="submit" id="btnSubmit" value="Submit" class="btn">Payment</button>
    </form>
  </template>
  
  <script>
  export default {
    mounted() {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://cdn.chillpay.co/js/widgets.js?v=1.00";
      script.charset = "utf-8";
      document.body.appendChild(script);
    },
  };
  </script>
  
