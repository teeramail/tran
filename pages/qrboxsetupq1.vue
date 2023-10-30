<template>
    <div>
        <ClientOnly>
            <qrcode-stream v-if="scanning" @decode="onDecode" @error="onError"></qrcode-stream>
        </ClientOnly>
        <div v-if="decodedContent">Decoded content: {{ decodedContent }}</div>
        <div v-if="responseData">
            Response Data:
            <div>EnterID: {{ responseData.EnterID }}</div>
        </div>
        <button v-if="responseData && !responseData.agent_id" @click="showForm = true">Click to add agent</button>
        <form v-if="showForm" @submit.prevent="submitForm">
           
            <div>
            <AutoComplete
              v-model="form.agent_nickname"
              :suggestions="filteredAgents"
              @complete="filterAgents"
              field="agent_nickname"
              placeholder="Agent Nickname"
            />
            </div>                                
            <div>
              <AutoComplete
                v-model="form.selectedAgentLeader"
                :suggestions="filteredAgentLeaders"
                @complete="filterAgentLeaders"
                field="agentleader_nickname"
              />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { QrcodeStream } from "vue3-qrcode-reader";
import AutoComplete from 'primevue/autocomplete';


const scanning = ref(true);
const decodedContent = ref(null);
const responseData = ref(null);
const showForm = ref(false);
const form = ref({
    agent_nickname: '',
    selectedAgentLeader: null 

});

const agentLeaders = ref([]);
const filteredAgentLeaders = ref([]);

const agents = ref([]);
const filteredAgents = ref([]);

watchEffect(async () => {
  try {
    const response = await fetch('https://koh-samui.com:53005/agent');
    agents.value = await response.json();
  } catch (error) {
    console.error(error);
  }
});

watchEffect(async () => {
  try {
    const response = await fetch('https://koh-samui.com:53005/agentleader');
    agentLeaders.value = await response.json();
  } catch (error) {
    console.error(error);
  }
});

const filterAgents = ({ query }) => {
  filteredAgents.value = agents.value.filter((agent) =>
    agent.agent_nickname.toLowerCase().startsWith(query.toLowerCase())
  );
};


const filterAgentLeaders = ({ query }) => {
  filteredAgentLeaders.value = agentLeaders.value.filter((agentLeader) =>
    agentLeader.agentleader_nickname.toLowerCase().startsWith(query.toLowerCase())
  );
};

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

        decodedContent.value = idenger;
    } catch (error) {
        console.error('Error decoding QR code:', error);
        return;
    }
    scanning.value = false;

    try {
        const response = await fetch(`https://koh-samui.com:53005/agenttool/enter/${decodedContent.value}`, {
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
        responseData.value = data;
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// In your Vue.js component

const submitForm = async () => {
  try {
    // Check nickname uniqueness
    console.log(`Checking nickname: ${form.value.agent_nickname.nickname}`);
    console.log(form.value.agent_nickname); // To check the structure
    console.log(form.value.selectedAgentLeader); // To check the structure

    const agentToolData = {
    EnterID: responseData.value.EnterID,
    agentNickname: form.value.agent_nickname.agent_nickname, 
    agentLeaderNickname: form.value.selectedAgentLeader.agentleader_nickname 
    };

    const response = await fetch(`https://koh-samui.com:53005/agenttool/agenttools/${decodedContent.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(agentToolData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Response error: ${response.status} - ${errorData.error}`);
    }

    const data = await response.json();
    console.log('Updated Data:', data);
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
    }
  }
};


</script>

