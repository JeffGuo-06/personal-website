import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import App from './App';

// Import Roboto Mono font weights
import '@fontsource/roboto-mono/400.css';
import '@fontsource/roboto-mono/500.css';
import '@fontsource/roboto-mono/600.css';
import '@fontsource/roboto-mono/700.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <Analytics />
  </>
);
