// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// vite.config.js
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true,                 // lắng nghe 0.0.0.0
//     port: 5173,
//     // CHÚ Ý: thay domain dưới đây = domain ngrok của bạn (không có https)
//     allowedHosts: ['74bbe016a53d.ngrok-free.app'], // nếu Vite không nhận wildcard, dùng chính xác '75178b426022.ngrok-free.app'
//     hmr: {
//       clientPort: 443,          // HMR qua https
//       // host: '75178b426022.ngrok-free.app' // (không bắt buộc) set đúng domain ngrok hiện tại
//     }
//   }
// })



// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // Cho phép mọi domain *.ngrok.app và *.ngrok-free.app
    allowedHosts: ['547693694d4e.ngrok-free.app'],
    hmr: { clientPort: 443 } // HMR qua https
  }
})

