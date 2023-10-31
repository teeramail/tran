import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "dellmeendpoint" | "record-visit"
declare module "C:/Users/cteer/vueproject/nuxt3/muaythaicm/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}