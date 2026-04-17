import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${resolve(__dirname, 'scss/_variaveis.scss').replace(/\\/g, '/')}";`,
      },
    },
  },
});
