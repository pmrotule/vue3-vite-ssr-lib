import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

enum VUE_ENVS {
  server = 'server',
  client = 'client',
}

const ABSOLUTE_SRC = path.resolve(__dirname, './src')

const isSsr = process.argv.includes('--ssr')
const outputSubDir = isSsr ? VUE_ENVS.server : VUE_ENVS.client
const outputDir = path.join('dist', outputSubDir)

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': ABSOLUTE_SRC,
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: { whitespace: 'condense' },
      },
    }),
    libInjectCss(),
  ],
  build: {
    outDir: outputDir,
    lib: {
      entry: {
        HelloWorld: path.join(ABSOLUTE_SRC, 'components/HelloWorld.vue'),
        MyButton: path.join(ABSOLUTE_SRC, 'components/MyButton.vue'),
      },
      formats: ['es'],
    },
    cssCodeSplit: true,
    ssrEmitAssets: true,
  },
})
