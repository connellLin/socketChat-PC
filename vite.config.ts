import { defineConfig } from 'vite'
import path from "path"
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  root: process.cwd(),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'), // 路径别名
    },
    extensions: ['.js', '.json', '.ts'] // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  assetsInclude: ["./src/assets"],
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/css/common.less";`,
      },
      less: {
        javascriptEnabled: true,
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve('src/assets/style/variables.less')}";`
        }
      }
    }
  },
})
