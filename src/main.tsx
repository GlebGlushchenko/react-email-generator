import { createRoot } from 'react-dom/client';
import App from './App.js';
import './style.css';
import 'quill/dist/quill.bubble.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);