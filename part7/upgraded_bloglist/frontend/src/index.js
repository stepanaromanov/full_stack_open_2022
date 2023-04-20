import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { NotificationContextProvider } from './reducers/NotificationContext'
import { UserContextProvider } from './reducers/UserContext'

import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </UserContextProvider>
  </QueryClientProvider>
)