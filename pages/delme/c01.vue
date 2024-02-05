<template>
  <div>
    <label for="text-input">AgentNickname</label>
    <input type="text" id="text-input" v-model="agentNickname" @input="checkNickname">
    <div v-if="nicknameExists">Nickname already in use!</div>

    <div>
      <AutoComplete
        v-model="selectedAgentLeader"
        :suggestions="filteredAgentLeaders"
        @complete="filterAgentLeaders"
        field="agentleader_nickname"
      />
    </div>

    <label for="id-count-input">Number of IDs (Max: 16)</label>
    <input type="number" id="id-count-input" v-model.number="idCount" min="1" max="16">

    <label for="phone-input">Agent Phone Number</label>
    <input type="text" id="phone-input" v-model="agentPhone">

    <label for="email-input">Agent Email</label>
    <input type="email" id="email-input" v-model="agentEmail" @input="validateEmail(agentEmail)">
    <div v-if="agentEmail && !isEmailValid">Please enter a valid email.</div>

    <label for="address-input">Agent Address</label>
    <input type="text" id="address-input" v-model="agentAddress">

    <button 
      @click="insertAgentData" 
      :disabled="isInserting || nicknameExists || !agentNickname || !agentPhone || (agentEmail && !isEmailValid)">
        Create Agent Documents
    </button>
  </div>

  <div>
    <ul>
      <li v-for="id in EnterIDs" :key="id">{{ id }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AutoComplete from 'primevue/autocomplete';

const agentNickname = ref('');
const nicknameExists = ref(false);
const EnterIDs = ref([]);
const agentLeaders = ref([]);
const filteredAgentLeaders = ref([]);
const selectedAgentLeader = ref(null); 
const isInserting = ref(false);
const idCount = ref(1);
const agentPhone = ref(''); 
const agentEmail = ref('');
const agentAddress = ref('');
const isEmailValid = ref(true);

async function fetchAgentLeaders() {
  try {
    const response = await fetch('https://koh-samui.com:53005/agentleader');
    agentLeaders.value = await response.json();
  } catch (error) {
    console.error(error);
  }
}

fetchAgentLeaders();

function generateEnterIDs() {
  const count = Math.min(idCount.value, 16);
  EnterIDs.value = [];
  for (let i = 0; i < count; i++) {
    EnterIDs.value.push(Math.random().toString(36).substr(2, 10));
  }
}

const checkNickname = async () => {
  const trimmedNickname = agentNickname.value.trim();
  if (!trimmedNickname) {
    nicknameExists.value = false;
    return;
  }
  try {
    const nicknameCheckResponse = await fetch(`https://koh-samui.com:53005/agent/check-nickname/${trimmedNickname}`);
    nicknameExists.value = nicknameCheckResponse.status === 400;
  } catch (error) {
    console.error('Error checking nickname:', error);
  }
};

const insertAgentData = async () => {
  isInserting.value = true; 
  generateEnterIDs();
  try {
    const payload = {
      nickname: agentNickname.value,
      enterIDs: EnterIDs.value,
      agent_contact: { phone: agentPhone.value },
      agent_email: agentEmail.value,
      agent_address: agentAddress.value,
      agentLeaderNickname: selectedAgentLeader.value ? selectedAgentLeader.value.agentleader_nickname : ""
    };


    const agentInsertResponse = await fetch("https://koh-samui.com:53005/agent/insert-multiple", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const dataFromAgentInsert = await agentInsertResponse.json();
    if (!dataFromAgentInsert.success) throw new Error(dataFromAgentInsert.error);

    const agentToolsPayload = {
      EnterID: EnterIDs.value[0],  // Assuming you want to use the first ID
      agentLeaderNickname: selectedAgentLeader.value ? selectedAgentLeader.value.agentleader_nickname : "",
      agent_id: dataFromAgentInsert.agent_id
    };

    const agentToolsInsertResponse = await fetch("https://koh-samui.com:53005/agenttool/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agentToolsPayload)
    });

    const dataFromAgentToolsInsert = await agentToolsInsertResponse.json();
    if (!dataFromAgentToolsInsert.success) throw new Error(dataFromAgentToolsInsert.error);

  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    isInserting.value = false;
  }
};

const filterAgentLeaders = ({ query }) => {
  filteredAgentLeaders.value = agentLeaders.value.filter(agentLeader => 
    agentLeader.agentleader_nickname.toLowerCase().startsWith(query.toLowerCase())
  );
};

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  isEmailValid.value = re.test(email);
}

</script>

