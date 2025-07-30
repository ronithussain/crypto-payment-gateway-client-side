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
      <div className='bg-gradient-to-b from-[#02071A] via-[#0c1124] to-[#1a2238]'>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </StrictMode>,
)
