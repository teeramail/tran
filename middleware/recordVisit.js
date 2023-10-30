// recordVisit.js
import axios from 'axios';

export default async function recordVisit({ route }) {
  try {
    // Replace this URL with the URL of your backend API that handles storing visits
    const backendUrl = 'https://koh-samui.com:53005/storeVisit';

    // Send a POST request to the backend with the current route path
    const response = await axios.post(backendUrl, { path: route.fullPath });

    if (response.status === 200) {
      console.log('Visit recorded successfully:', response.data.message);
    } else {
      console.error('Error recording visit:', response.status);
    }
  } catch (error) {
    console.error('Error recording visit:', error);
  }
}