import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import { store } from './redux-data/store';
import { Provider } from 'react-redux';
import AppRoute, {loader as appLoader} from './routes/AppRoute';
import IndexRoute, { loader as indexLoader } from './routes/IndexRoute';
import ErrorRoute from './routes/ErrorRoute';
import ProductDetailsRoute, { loader as productLoader } from './routes/ProductDetailsRoute';
import BasketRoute, { loader as basketLoader} from './routes/BasketRoute';
import CategoryRoute, {loader as categoryLoader } from './routes/CategoryRoute';
import SearchRoute, { loader as searchLoader} from './routes/SearchRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppRoute />,
    loader: appLoader,
    errorElement: <ErrorRoute />,
    children: [
      {
        index: true,
        element: <IndexRoute />,
        loader: indexLoader
      },
      {
        path: '/products/:productId/:productTitle',
        element: <ProductDetailsRoute />,
        loader: productLoader
      },
      {
        path: '/products/category/:category',
        element: <CategoryRoute />,
        loader: categoryLoader
      },
      {
        path: '/basket',
        element: <BasketRoute />,
        loader: basketLoader
      },
      {
        path: '/search',
        element: <SearchRoute />,
        loader: searchLoader
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

