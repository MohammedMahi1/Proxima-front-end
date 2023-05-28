import './resources/style/style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './resources/view/user/Login';
import ErrPage from './resources/view/err/ErrPage';
import Dashboard from './resources/view/user/Dashboard';
import { Provider } from 'react-redux';
import store from './store/index';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, createTheme } from '@mui/material';
import Layout from './Layout/Layout';
import Profile from './resources/view/user/Profile';
import Discussion from './resources/view/user/Discussion';
const router = createBrowserRouter([
  {
    errorElement: <ErrPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", index: true, element: <Dashboard /> },
      { path: "/profile", element: <Profile /> },
      { path: "/chat", element: <Discussion /> },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },


]);
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}><CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
