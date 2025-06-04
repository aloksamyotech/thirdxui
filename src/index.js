import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { store } from 'store';
import 'assets/scss/style.scss';
import config from './config';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';

const container = document.getElementById('root');

const root = createRoot(container);
root.render(
  <GoogleOAuthProvider clientId="51545308348-7ng9nvm5r0p6bqs0uoubla4d359c65c7.apps.googleusercontent.com">

    <Provider store={store}>
      <Toaster position="top-center" />
      <BrowserRouter basename={config.basename}>
        <App />
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>

);

serviceWorker.unregister();
