// https://nuxt.com/docs/api/configuration/nuxt-config

import recordVisit from './middleware/recordVisit';

export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
  ],
  css: [
    "primevue/resources/themes/lara-light-blue/theme.css",
    "primevue/resources/primevue.css"
],
  build: {
    transpile: ['@vuepic/vue-datepicker',"primevue"],            
  },
  plugins: ['~/plugins/primevue.js']



})



  

