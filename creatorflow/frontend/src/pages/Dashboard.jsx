

import React from 'react'
import { useEffect,useState } from "react";
import { User, Bell, Menu,  } from "lucide-react";
import {Outlet} from 'react-router'
import Promotions from './Promotions';
import Sidebar from '../components/Sidebar.jsx';
import { Link } from 'react-router';
import { promotions } from '../data/data.js';
const Dashboard = () => {
    const[sidebarOpen,setSidebarOpen] = useState(false)
    const[dashboardData,setDashboardData]=useState(null);
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState("");
    const [UpcomingPromotions,setUpcomingPromotions]= useState([]);
{loading && (
  <p className="text-gray-500 dark:text-gray-400">
    Loading dashboard...
  </p>
)}
   const fetchDashboard=async()=>{
    try {
      setError("")
      setLoading(true);
       const response= await fetch("http://localhost:5002/api/v1/dashboard",
           {
            method:"GET",
           
            credentials:"include",
             
        },)
       const data= await response.json()
           if (!response.ok) {
            throw new error (data.message || "failed to fetch dahboard")

           }

           setDashboardData(data.data);
    } catch (error) {
      setError(error.message)
    }
    finally{
      setLoading(false);
    }
   };

   const fetchUpcomingPromotions=async()=>{
    try {
      const response= await fetch("http://localhost:5002/api/v1/dashboard/upcoming",
        {
          method:"GET",
          credentials:"include",
        },

      );
      const data = await response.json()
      if (!response.ok){
        throw new error(data.message || "upcoming promotions fetching failed")
      }
      setUpcomingPromotions(data.data.UpcomingPromotions);
    } catch (error) {
        console.log(error.message);
        
    }
   };

   useEffect(() => {
  fetchDashboard();
  fetchUpcomingPromotions();
}, []);


    
  return (
    
   <div className="min-h-screen bg-white
    dark:bg-gray-950 text-gray-900 dark:text-white">
    


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
       <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border
        border-gray-200 dark:border-gray-700">
         <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Earned
          </p>

          <div className="flex items-center justify-between mt-3">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              ₹{dashboardData?.Earned??0}
            </h2>

            <span className="text-sm text-green-600 font-medium">
              +12.5%
            </span>
          </div>
        </div>


        {/* Promotions */}
        <Link
        to = "promotions">
       <div className="p-5 rounded-2xl bg-gray-50
        dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            
            Promotions
          </p>

          <div className="flex items-center justify-between mt-3">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {dashboardData?.activePromotions??0}
            </h2>

            <span className="text-sm text-green-600 font-medium">
              +5.5%
            </span>
          </div>
        </div>
        </Link>



        {/* Pending */}
       <div className="p-5 rounded-2xl bg-gray-50
        dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
         <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Pending
          </p>

          <div className="flex items-center justify-between mt-3">
           <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              ₹{dashboardData?.Pending??0}
            </h2>
          </div>
        </div>

      </div>


      {/* Upcoming Promotions */}
     

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
    Upcoming Promotions
  </h2>

  <div className="mt-4 space-y-3">
    {UpcomingPromotions.length > 0 ? (
      UpcomingPromotions.map((promotion) => (
        // promotion card here
          <div className="flex items-center justify-between py-4 
          border-b border-gray-200 dark:border-gray-700">
            <span className="w-1/3 font-medium">
              {promotions.brand}
            </span>

           <span className="w-1/3 text-gray-500 dark:text-gray-400">
              {promotions.platform}
            </span>

            <span className="w-1/3 text-right font-semibold">
              ₹{promotions.amount}
            </span>

             <span className="w-1/3 text-right font-semibold">
              {promotions.dueDate}
            </span>
          </div>
      ))
    ) : (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No upcoming promotions.
      </p>
    )}
  </div>
</div>
      
    </div>
  )
}

export default Dashboard