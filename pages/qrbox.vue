<template>
    <div>
      <ClientOnly>
        <qrcode-stream @decode="onDecode" @error="onError"></qrcode-stream>
      </ClientOnly>
    </div>
  </template>
  
  <script setup>
  import { QrcodeStream } from "vue3-qrcode-reader";
  
  const onDecode = (content) => {
    console.log("Decoded QR code:", content);
  };
  
  const onError = (error) => {
    console.error("QR code scanning error:", error);
  };
  </script>
  
  