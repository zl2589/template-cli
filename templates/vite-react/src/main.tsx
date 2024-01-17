import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import{ default as ConfigRoutes} from '@/router';
import store from '@/store'
import 'antd/dist/antd.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ConfigRoutes />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
