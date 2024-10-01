import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

const env = loadEnv('', process.cwd());
function pathResolve(dir: string) {
  return path.resolve(__dirname, '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': pathResolve('src') },
  },
  server: {
    port: parseInt(env.PORT || '3000'),
  },
});
