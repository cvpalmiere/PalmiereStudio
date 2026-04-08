import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/PalmiereStudio/',   // ← nome do repositório (com letras originais)
});