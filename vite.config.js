// vite.config.js

export default {
    plugins: [
      {
        name: 'vite-plugin-ignore-custom-elements',
        enforce: 'post',
        transform(_, id) {
          if (/\.vue\.js$/.test(id)) {
            return {
              code: `
                export { default } from 'vue'
                export const __VLS_options = {}
                export * from 'vue'
                `,
              map: null,
            }
          }
        },
      },
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('modernpay:')) {
              return 'vendor'
            }
          },
        },
      },
    },
  }
  