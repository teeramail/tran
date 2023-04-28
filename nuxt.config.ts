// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
  ],

  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },
  // @ts-ignore
  serverMiddleware: [
    { path: '/endpoint', handler: '~/server-middleware/postRequestHandler.js' },
],
})
