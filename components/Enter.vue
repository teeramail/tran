// components\Enter.vue
<template>
    <div></div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const emit = defineEmits(['prereservation-created']);
const route = useRoute();
const idenger = ref(route.query.idenger); 
const url = ref('');

async function submitForm() {
    try {
        const response = await fetch('https://koh-samui.com:53005/enterp', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idenger: idenger.value }), 
        });

        if (!response.ok) {
            throw new Error('Error adding record: ' + response.statusText);
        }
          
        // Prepare the data to be sent to the server
        const preReservationData = {
            idenger: idenger.value, 
            url: url.value,  
            createdAt: new Date(),
        }
  
        const reservationResponse = await fetch("https://koh-samui.com:53005/prereservation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(preReservationData)
        });
    
        if (!reservationResponse.ok) {
            throw new Error(`HTTP error! status: ${reservationResponse.status}`);
        }

        const data = await reservationResponse.json();
        const prereservationId = data._id; 
        console.log(prereservationId);
        emit('prereservation-created', prereservationId);

    //    router.push({ path: '/a01', query: { idenger: idenger.value } });
    } catch (error) {
        alert('Error adding record: ' + error.message);
    }
}
  
onMounted(() => {
    if (!idenger.value) { 
        idenger.value = 'lh2jxr3smnhittt';
    }
    submitForm();
});


</script>
