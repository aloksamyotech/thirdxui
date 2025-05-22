import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { store } from 'store';
import 'assets/scss/style.scss';
import config from './config';
import { Toaster } from 'react-hot-toast';

const container = document.getElementById('root');


const root = createRoot(container);
root.render(
  <Provider store={store}>
    <Toaster position="top-center" />
    <BrowserRouter basename={config.basename}>
      <App />
    </BrowserRouter>
  </Provider>
);

serviceWorker.unregister();
