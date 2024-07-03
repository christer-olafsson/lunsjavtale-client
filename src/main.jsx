import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme.js'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ApolloProvider } from '@apollo/client'
import { client } from './client.js'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { Toaster } from 'react-hot-toast'

import { PersistGate } from 'redux-persist/integration/react'
import ScrollToTop from './components/home/ScrollToTop.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientId = '836229956498-03lgjfpttkqjop8ndqrpc9qaa12fjqjo.apps.googleusercontent.com'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PersistGate persistor={persistor}>
            <BrowserRouter>
              <GoogleOAuthProvider clientId={clientId}>
              <CssBaseline />
              <Toaster position="bottom-center" />
              <ScrollToTop />
              <App />
            </GoogleOAuthProvider>
          </BrowserRouter>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  </ApolloProvider>
  </React.StrictMode >,
)
