import {createRoot} from 'react-dom/client';
import {registerSW} from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  registerSW({
    immediate: true,
    onRegisterError(error) {
      // Non-fatal in sandboxed iframe or restricted browsing modes
      console.warn('Service worker registration skipped:', error);
    },
  });
}

createRoot(document.getElementById('root')!).render(<App />);
