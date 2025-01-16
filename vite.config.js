import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['swiper']
  }
})

// import { defineConfig } from "vite";

// export default defineConfig({
//   ...
//   optimizeDeps: {
//     exclude: ['js-big-decimal']
//   }
// });



