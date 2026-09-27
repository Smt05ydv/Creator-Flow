import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ThemeProvider from './components/ThemeProvider.jsx'
import './index.css'

import { createBrowserRouter, createRoutesFromElements, Route,RouterProvider } 
from 'react-router'
import Dashboard from './pages/Dashboard.jsx'
import Promotions from './pages/Promotions.jsx'
import Earnings from './pages/Earnings.jsx'

import Layout from './components/Layout.jsx'
import  Calendar  from './pages/Calender.jsx'
import Register from "./pages/Register.jsx";
import Login from './pages/Login.jsx'
import AboutUs from './pages/AboutUs.jsx'




const router= createBrowserRouter(createRoutesFromElements (
  <Route path = '/' element= {<Layout/>}>
    <Route index element= {<Dashboard/>}/>
    <Route path="register" element={<Register />} />
     <Route path="login" element={<Login />} />
     <Route path="about-us" element={<AboutUs />} />
   <Route   path='promotions' element= {<Promotions/>}/>
    <Route
        path="earnings"
        element={<Earnings />}
      />

      <Route
        path="calender"
        element={<Calendar />}
      />
     


    

  </Route>
  
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
   <RouterProvider router={router}/>
   </ThemeProvider>
  </StrictMode>,
)
