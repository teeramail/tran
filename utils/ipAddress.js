// src/utils/uniqueID.js
  export async function getIpAddress() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    console.log("Your IP Address:", data.ip);
    const ipAddress = data.ip;
    return ipAddress;
  }
  