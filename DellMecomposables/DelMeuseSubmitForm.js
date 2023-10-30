// useSubmitForm.js
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default function useSubmitForm(idenger) {
  const router = useRouter();

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

      router.push({ path: '/a01', query: { idenger: idenger.value} });
    } catch (error) {
      console.error(error);
      alert('Error adding record: ' + error.message);
    }
  }

  onMounted(() => {
    if (idenger.value) {
      submitForm();
    }
  });

  return { submitForm };
}
