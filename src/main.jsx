import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";

import { router } from './Routes/router.jsx';
import AuthProvider from './Context/AuthProvider.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
// import { DataProvider } from './Context/DataContext.jsx';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <AuthProvider>
      {/* <DataProvider> */}
        <QueryClientProvider client={queryClient}>
          <div className='bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800'>
            <RouterProvider router={router} />
          </div>
        </QueryClientProvider>
      {/* </DataProvider> */}
    </AuthProvider>
  </StrictMode>,
)
