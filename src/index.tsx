import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 * 100 + 'px';

window.addEventListener('resize', () => {
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 * 100 + 'px';
})

/* 基于UI width=750px DPR=2的网页 */
// html {
// 	font-size: calc(100vw / 7.5);
// }

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


