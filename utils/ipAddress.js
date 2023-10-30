// utils/ipAddress.js
export async function getIpAddress() {
  const TIMEOUT = 15000; // Timeout in milliseconds

  // This promise will reject after the specified timeout
  const timeoutPromise = new Promise((resolve) => {
    setTimeout(() => resolve('58.11.96.86'), TIMEOUT); // Resolve with fallback IP after timeout
  });

  // This promise will resolve with the IP address
  const fetchPromise = fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => data.ip);

  // Promise.race will resolve as soon as one of the promises resolves
  const result = await Promise.race([timeoutPromise, fetchPromise]);

  return result;
}
