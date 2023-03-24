// https://nuxt.com/docs/api/configuration/nuxt-config
const ONE_DAY = 60 * 60 * 24 * 1000

export default defineNuxtConfig({
  runtimeConfig: {
    cookieName: '__session',
    cookieSecret: process.env.COOKIE_SECRET || 'secret',
    cookieExpires: parseInt(
      process.env.COOKIE_REMEMBER_ME_EXPIRES || ONE_DAY.toString(),
      10
    ),
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image-edge', '@pinia/nuxt'],
  css: ['@/assets/styles/index.css'],
})
