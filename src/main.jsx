import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  RouterProvider,
} from "react-router-dom";

import { router } from './Routes/router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-gradient-to-r from-[#131F3D] via-[#1A306F] to-[#21429e]'>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
