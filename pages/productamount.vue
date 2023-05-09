<template>
  <div class="container">
    <label for="product" class="label">Product:</label>
    <select v-model="selectedProduct" id="product" class="select">
      <option v-for="product in products" :key="product.value" :value="product.value">
        {{ product.name }}
      </option>
    </select>

    <label for="quantity" class="label">Quantity:</label>
    <input type="number" v-model="quantity" id="quantity" class="input" min="1" />

    <button @click="submit" class="button">Submit</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const products = [
  { name: "Product A", value: "productA" },
  { name: "Product B", value: "productB" },
  { name: "Product C", value: "productC" },
];

const selectedProduct = ref('');
const quantity = ref(1);

const submit = () => {
  alert(
    `You selected ${selectedProduct.value} and want to buy ${quantity.value} units.`
  );
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.label {
  font-size: 1rem;
  font-weight: bold;
}

.select,
.input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
}

.button {
  background-color: #4caf50;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}
</style>
