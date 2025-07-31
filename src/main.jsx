import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  RouterProvider,
} from "react-router-dom";

import { router } from './Routes/router.jsx';
import AuthProvider from './Context/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <div className='bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800'>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </StrictMode>,
)
