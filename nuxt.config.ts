// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/device",
  ],
  $development: {
    sourcemap: true,
  },
  runtimeConfig: {
    public: {
      apiBase: "/api",
    },
  },
  colorMode: {
    classSuffix: "",
  },
  css: ["~/assets/index.css"],
});
