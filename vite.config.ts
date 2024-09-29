import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

const env = loadEnv('', process.cwd());

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(env.PORT || '3000'),
  },
});
