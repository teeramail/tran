<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Transactions</h1>
    <div class="overflow-x-auto">
      <div class="responsive-table">
        <div class="table-header hidden md:grid">
          <span>TransactionId</span>
          <span>Amount</span>
          <span>Date</span>
          <span>Time</span>
          <span>User Name</span>
          <span>User Email</span>
          <span>Agent Nickname</span>
          <span>Agent Phone</span>
        </div>
        <div v-for="item in data" :key="item.TransactionId" class="table-row grid md:grid-cols-8 gap-2 border-b border-gray-200 py-2">
          <div class="text-blue-500">
  <strong class="md:hidden">TransactionId: </strong>{{ item.TransactionId }}
</div>
          <div>
            <strong class="md:hidden">Amount: </strong>{{ item.Amount }}
          </div>
          <div>
            <strong class="md:hidden">Date: </strong>{{ item.CurrentDate }}
          </div>
          <div>
            <strong class="md:hidden">Time: </strong>{{ item.CurrentTime }}
          </div>
          <div>
            <strong class="md:hidden">User Name: </strong>{{ item.reservations[0].user.name }}
          </div>
          <div>
            <strong class="md:hidden">User Email: </strong>{{ item.reservations[0].user.email }}
          </div>
          <div>
            <strong class="md:hidden">Agent Nickname: </strong>{{ item.agent.agent_nickname }}
          </div>
          <div>
            <strong class="md:hidden">Agent Phone: </strong>{{ item.agent.agent_contact.phone }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.responsive-table {
  display: flex;
  flex-direction: column;
}

.table-header {
  display: none;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
  font-weight: bold;
  padding: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.table-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media screen and (min-width: 768px) {
  .table-row {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
  }
}
</style>


<script setup>
import { ref, onMounted } from 'vue'

const data = ref([])
const error = ref('')

onMounted(async () => {
  try {
    const response = await fetch('https://koh-samui.com:53005/adayq')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    data.value = await response.json()
  } catch (err) {
    error.value = 'Failed to fetch data: ' + err.message
  }
})
</script>

