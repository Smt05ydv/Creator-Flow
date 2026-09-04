import React from 'react'
import { useState } from "react";
import { User, Bell, Menu,  } from "lucide-react";
import {Outlet} from 'react-router'
import Promotions from './Promotions';
import Sidebar from '../components/Sidebar.jsx';

const Dashboard = () => {
    const[sidebarOpen,setSidebarOpen] = useState(false)
    
  return (
    <div className="min-h-screen">

    


      {/* Greeting */}
      <div className="text-center mt-8">
        <h1 className="font-bold text-4xl">
          GOOD MORNING,
        </h1>

        <h1 className="text-blue-400 font-bold text-4xl">
          SUMIT
        </h1>
      </div>


      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 px-6">

        {/* Earned */}
        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
          <p className="text-sm font-medium text-gray-500">
            Earned
          </p>

          <div className="flex items-center justify-between mt-3">
            <h2 className="text-3xl font-bold text-gray-900">
              ₹25,000
            </h2>

            <span className="text-sm text-green-600 font-medium">
              +12.5%
            </span>
          </div>
        </div>


        {/* Promotions */}
        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
          <p className="text-sm font-medium text-gray-500">
            Promotions
          </p>

          <div className="flex items-center justify-between mt-3">
            <h2 className="text-3xl font-bold text-gray-900">
              12
            </h2>

            <span className="text-sm text-green-600 font-medium">
              +5.5%
            </span>
          </div>
        </div>


        {/* Pending */}
        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
          <p className="text-sm font-medium text-gray-500">
            Pending
          </p>

          <div className="flex items-center justify-between mt-3">
            <h2 className="text-3xl font-bold text-gray-900">
              ₹8,000
            </h2>
          </div>
        </div>

      </div>


      {/* Upcoming Promotions */}
      <div className="mt-8 mx-6 p-6 rounded-xl border border-gray-200 bg-white shadow-sm">

        <h2 className="text-2xl font-bold">
          Upcoming Promotions
        </h2>

        <div className="mt-4">

          {/* Promotion 1 */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <span className="w-1/3 font-medium">
              Nike
            </span>

            <span className="w-1/3 text-gray-500">
              Instagram
            </span>

            <span className="w-1/3 text-right font-semibold">
              ₹30K
            </span>
          </div>


          {/* Promotion 2 */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <span className="w-1/3 font-medium">
              Boat
            </span>

            <span className="w-1/3 text-gray-500">
              YouTube
            </span>

            <span className="w-1/3 text-right font-semibold">
              ₹45K
            </span>
          </div>


          {/* Promotion 3 */}
          <div className="flex items-center justify-between py-4">
            <span className="w-1/3 font-medium">
              XYZ
            </span>

            <span className="w-1/3 text-gray-500">
              Instagram
            </span>

            <span className="w-1/3 text-right font-semibold">
              ₹20K
            </span>
          </div>

        </div>
      </div>
      
    </div>
  )
}

export default Dashboard