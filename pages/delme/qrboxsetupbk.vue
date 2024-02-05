<template>
    <div>
        <ClientOnly>
            <qrcode-stream v-if="scanning" @decode="onDecode" @error="onError"></qrcode-stream>
        </ClientOnly>
        <div v-if="decodedContent">Decoded content: {{ decodedContent }}</div>


        <div v-if="responseData">
              Response Data:
              <div>EnterID: {{ responseData.EnterID }}</div>
              <div>Staff Nickname: {{ responseData.agentLeaderNickname }}</div>
              <div v-if="form.agent_nickname">Agent Nickname: {{ form.agent_nickname }}</div>
          </div>

        <button v-if="responseData && !responseData.agent_id" @click="showForm = true">Click to add agent</button>
        <form v-if="showForm" @submit.prevent="submitForm">
            <input v-model="form.agent_contact.email" type="email" placeholder="Agent Email">
            <input v-model="form.agent_contact.phone" type="text" placeholder="Agent Phone Number">
            <input v-model="form.agent_contact.address" type="text" placeholder="Agent Address">
            <input v-model="form.social_media.facebook" type="text" placeholder="Facebook Profile URL">
            <input v-model="form.social_media.twitter" type="text" placeholder="Twitter Profile URL">
            <input v-model="form.social_media.linkedin" type="text" placeholder="LinkedIn Profile URL">
            <input v-model="form.social_media.instagram" type="text" placeholder="Instagram Profile URL">

            <!-- Contacts -->
            <div v-for="(contact, index) in form.contacts" :key="index">
                <input v-model="contact.name" type="text" placeholder="Contact Name">
                <input v-model="contact.role" type="text" placeholder="Role">
                <input v-model="contact.phone" type="text" placeholder="Phone">
            </div>

            <input v-model="form.agent_description" type="text" placeholder="Agent Description">
            <input v-model="form.agent_name" type="text" placeholder="Agent Name">
            <input v-model="form.agent_nickname" type="text" placeholder="Agent Nickname" required>
            <div v-if="isNicknameDuplicated" style="color: red;">Nickname already exists. Please choose a different one.</div>
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
import { ref, onBeforeMount, watchEffect } from 'vue';
import { QrcodeStream } from "vue3-qrcode-reader";
import AutoComplete from 'primevue/autocomplete';

const scanning = ref(false);
onBeforeMount(() => {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    scanning.value = true;
  }
});


const isNicknameDuplicated = ref(false);
const decodedContent = ref(null);
const responseData = ref(null);
const showForm = ref(false);
const form = ref({
    agent_contact: {},
    social_media: {},
    contacts: [],
    agent_description: '',
    agent_name: '',
    agent_nickname: '',
    selectedAgentLeader: null 

});

const agentLeaders = ref([]);
const filteredAgentLeaders = ref([]);

watchEffect(async () => {
  try {
    const response = await fetch('https://koh-samui.com:53005/agentleader');
    agentLeaders.value = await response.json();
  } catch (error) {
    console.error(error);
  }
});

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
    console.log(`Checking nickname: ${form.value.agent_nickname}`);
    const nicknameCheckResponse = await fetch(`https://koh-samui.com:53005/agent/check-nickname/${form.value.agent_nickname}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // If nickname is not unique, throw an error
  
        if (!nicknameCheckResponse.ok) {
        isNicknameDuplicated.value = true;
        console.log("Nickname already exists. Please choose a different one.");
        return;
    } else {
      isNicknameDuplicated.value = false;
    }
    
    const agentToolData = {
    EnterID: responseData.value.EnterID
  };


  if (form.value.selectedAgentLeader) {
    // Assuming that selectedAgentLeader is an object with a agentleader_nickname property
    agentToolData.agentLeaderNickname = form.value.selectedAgentLeader.agentleader_nickname;
  } else {
    agentToolData.agentLeaderNickname = ""; // Or any other default value
  }


    // If nickname is unique, continue to create agent
    if (!isNicknameDuplicated.value) {
      const response = await fetch('https://koh-samui.com:53005/agent/agent-and-agenttool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent: form.value,
          agentTool: { EnterID: responseData.value.EnterID ,
          agentLeaderNickname: form.value.selectedAgentLeader.agentleader_nickname, 
        },
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Response error: ${response.status} - ${errorData.error}`);
      }

      const data = await response.json();
      console.log('Agent and agent tool created:', data);

      // Clear form and prepare for next submission
      form.value = {
        agent_contact: {},
        social_media: {},
        contacts: [],
        agent_description: '',
        agent_name: '',
        agent_nickname: ''
      };

      // ... any other code that runs after a successful submission ...
    } else {
      throw new Error('Nickname already exists. Please choose a different one.');
    }
  } 
  catch (error) {
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