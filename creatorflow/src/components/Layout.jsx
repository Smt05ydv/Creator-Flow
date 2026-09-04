import React from 'react'
import { useState } from 'react'
import { Bell,User,Menu } from 'lucide-react'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar'
const Layout=()=> {

    const[sidebarOpen,setSidebarOpen] = useState(false)
  return (
    <div className="min-h-screen">

      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 border-b">

        <div className="flex items-center gap-4">
      <button onClick={()=>setSidebarOpen(!sidebarOpen)}
              className="flex items-center justify-center 
              w-10 h-10 rounded-lg hover:bg-gray-100"
              
        >
            <Menu className="w-6 h-6" />

      </button>
           <h1 className="text-xl font-bold">
            CREATORFLOW
          </h1>

        </div>

        <div className="flex items-center gap-3">

          <div className="relative">
            <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100">
              <Bell className="w-6 h-6" />
            </button>

            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
          </div>

          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300">
            <User className="w-6 h-6" />
          </button>

        </div>

      </nav>

      {sidebarOpen && (<Sidebar onClose={()=>setSidebarOpen(false)}/>
    )}

    <Outlet/>
      </div>
  )
}

export default Layout