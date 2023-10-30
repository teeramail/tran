<template>
  <div>
    <h1>Create Event Template</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="eventType">Event Type:</label>
        <input id="eventType" v-model="form.eventType" type="text" required />
      </div>
      <div>
        <label for="organizer">Organizer:</label>
        <input id="organizer" v-model="form.organizer.name" type="text" required />
        <input id="contact" v-model="form.organizer.contact" type="text" required />
        <input id="website" v-model="form.organizer.website" type="text" required />
      </div>
      <div>
        <label for="tickets">Tickets:</label>
        <div v-for="(ticket, index) in form.tickets" :key="index">
          <input v-model="ticket.type" type="text" placeholder="Type" required />
          <input v-model="ticket.price" type="number" placeholder="Price" required />
          <input v-model="ticket.available" type="number" placeholder="Available" required />
          <input v-model="ticket.sold" type="number" placeholder="Sold" required />
        </div>
        <button @click.prevent="addTicket">Add Ticket</button>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  eventType: '',
  organizer: {
    name: '',
    contact: '',
    website: ''
  },
  tickets: [
    {
      type: '',
      price: '',
      available: '',
      sold: ''
    }
  ]
});

const addTicket = () => {
  form.value.tickets.push({
    type: '',
    price: '',
    available: '',
    sold: ''
  });
};

const submitForm = async () => {
  try {
    const response = await fetch('https://koh-samui.com:53005/eventtemplate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    });
    const data = await response.json();
    console.log(data);
    // Clear the form
    form.value = {
      eventType: '',
      organizer: {
        name: '',
        contact: '',
        website: ''
      },
      tickets: [
        {
          type: '',
          price: '',
          available: '',
          sold: ''
        }
      ]
    };
  } catch (error) {
    console.error(error);
  }
};
</script>
