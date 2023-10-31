import recordVisit from './middleware/recordVisit';

export default {
  // Set target to 'server' for server-side rendering
  target: 'server',

  modules: [
    '@unocss/nuxt',
  ],

  css: [
    "primevue/resources/themes/lara-light-blue/theme.css",
    "primevue/resources/primevue.css"
  ],

  build: {
    transpile: ['@vuepic/vue-datepicker', "primevue"],
  },

  plugins: ['~/plugins/primevue.js']
}
