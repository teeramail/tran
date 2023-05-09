<template>
    <div class="container">
      <div class="header">
        <div class="header-item">Product</div>
        <div class="header-item">Quantity</div>
      </div>
      <div v-for="product in products" :key="product.value" class="row">
        <div class="row-item">{{ product.name }}</div>
        <div class="row-item">
          <input
            type="number"
            v-model="quantities[product.value]"
            min="1"
            class="input"
          />
        </div>
      </div>
      <button @click="submit" class="button">Submit</button>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  
  const products = [
    { name: "Product A", value: "productA" },
    { name: "Product B", value: "productB" },
    { name: "Product C", value: "productC" },
  ];
  
  const quantities = reactive(
    products.reduce((acc, product) => {
      acc[product.value] = 1;
      return acc;
    }, {})
  );
  
  const submit = () => {
    const summary = products
      .map(
        (product) =>
          `You want to buy ${quantities[product.value]} units of ${product.name}`
      )
      .join('\n');
    alert(summary);
  };
  </script>
  
  <style scoped>
  .container {
    width: 300px;
  }
  
  .header,
  .row {
    display: flex;
    justify-content: space-between;
  }
  
  .header-item,
  .row-item {
    width: 50%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .input {
    width: 100%;
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .button {
    width: 100%;
    background-color: #4caf50;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin: 16px 0;
    cursor: pointer;
    border-radius: 4px;
  }
  </style>
  