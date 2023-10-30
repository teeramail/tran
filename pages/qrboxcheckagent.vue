<template>
    <div>
        <ClientOnly>
            <qrcode-stream v-if="scanning" @decode="onDecode" @error="onError"></qrcode-stream>
        </ClientOnly>
        <div v-if="responseData">
            Response Data:
            <div>EnterID: {{ responseData.EnterID }}</div>
            <div>Agent Team Nickname: {{ responseData.agentLeaderNickname }}</div>
            <div>Agent Name: {{ responseData.agent.agent_name }}</div>
            <div>Agent Nickname: {{ responseData.agent.agent_nickname }}</div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { QrcodeStream } from "vue3-qrcode-reader";
  
  const scanning = ref(true);
  const responseData = ref(null);
  
  const onError = (error) => {
    console.error("QR code scanning error:", error);
  };
  
  const onDecode = async (content) => {
    console.log("Decoded QR code:", content);
    
    try {
        const url = new URL(content);
        const idenger = url.searchParams.get("idenger");
  
        if (!idenger) {
            throw new Error('Invalid QR code format');
        }
  
        scanning.value = false;
  
        const response = await fetch(`https://koh-samui.com:53005/agenttool/enterx/${idenger}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Response error: ${response.status} - ${errorData.error}`);
        }
  
        const data = await response.json();
        console.log('Response Data:', data);
        responseData.value = data[0];  // Set the responseData as the first item of the response array
  
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };
  </script>
  