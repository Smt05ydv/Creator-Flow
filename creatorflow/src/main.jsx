import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route,RouterProvider } 
from 'react-router'
import Dashboard from './pages/Dashboard.jsx'
import Promotions from './pages/Promotions.jsx'
import Earnings from './pages/Earnings.jsx'
import  Sidebar from './components/Sidebar.jsx'
import Layout from './components/Layout.jsx'
import  Calendar  from './pages/Calender.jsx'

const router= createBrowserRouter(createRoutesFromElements (
  <Route path = '/' element= {<Layout/>}>
    <Route index element= {<Dashboard/>}/>
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
   <RouterProvider router={router}/>
  </StrictMode>,
)
