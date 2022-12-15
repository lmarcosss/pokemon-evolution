import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    experimentalStudio: true,
    baseUrl: 'https://pokemon-evolution.vercel.app',
    // baseUrl: 'http://localhost:3000',
  },
})
