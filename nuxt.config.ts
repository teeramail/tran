// https://nuxt.com/docs/api/configuration/nuxt-config

import recordVisit from './middleware/recordVisit';

export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
  ],

  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },
  // @ts-ignore
  middleware: {
    recordVisit, // Add the middleware here
  },

})
