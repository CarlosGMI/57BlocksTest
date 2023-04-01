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
    movieDbApiKey: process.env.MOVIEDB_API_KEY,
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image-edge'],
  css: ['@/assets/styles/index.css'],
  image: {
    inject: true,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
