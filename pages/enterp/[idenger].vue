<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const idenger = route.params.idenger;

async function submitForm() {
  try {
    const response = await fetch('https://koh-samui.com:53005/enterp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idenger }),
    });

    if (!response.ok) {
      throw new Error('Error adding record: ' + response.statusText);
    }

    router.push({ path: '/a01', query: { idenger: idenger} });
  } catch (error) {
    alert('Error adding record: ' + error.message);
  }
}

onMounted(() => {
  submitForm();
});
</script>
