<template>
<div id="app">
    <h1>Thai Food Price Input</h1>
    <div v-for="(item, index) in thaiFoods" :key="index">
        <label>{{ item }}</label>
        <input type="number" v-model="prices[index]" placeholder="Enter price" />
    </div>
    <button @click="calculateAverage">Calculate Average Price</button>
    <p v-if="average">Average Price: {{ average }}</p>
</div>
</template>
    
<script setup>
import { ref } from 'vue';

const thaiFoods = [
    "Pad Thai",
    "Tom Yum Goong",
    "Tom Kha Gai",
    "Gaeng Daeng",
    "Gaeng Keow Wan Gai",
    "Panang Curry",
    "Massaman Curry",
    "Khao Pad",
    "Khao Pad Sapparod",
    "Khao Soi"
];

const prices = ref(Array(thaiFoods.length).fill(0));
const average = ref(null);

const calculateAverage = () => {
    let total = 0;
    let count = 0;

    for (let price of prices.value) {
        if (price > 0) {
            total += price;
            count++;
        }
    }

    average.value = (count > 0) ? (total / count).toFixed(2) : 0;
};
</script>

  