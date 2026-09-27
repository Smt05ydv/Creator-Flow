import {
  LayoutDashboard,
  Megaphone,
  Wallet,
  Settings,
  Calendar,
} from "lucide-react";

import { Link } from "react-router";

const Sidebar = ({onClose}) => {
  return (
   <aside
  className="fixed top-16 left-0 z-50 w-64 h-[calc(100vh-4rem)]
  bg-gray-50 dark:bg-gray-900
  text-gray-900 dark:text-white
  border-r border-gray-200 dark:border-gray-700
  p-5"
>
      <h1 className="text-xl font-bold mb-8">
        CREATORFLOW
      </h1>

      {/* Menu */}
      <div className="flex flex-col gap-2">

        {/* Dashboard */}
       <Link
       to="/"
       onClick={onClose}
       ><button 
       
        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
           hover:bg-gray-200 dark:hover:bg-gray-800 transition">
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </button> </Link> 

        {/* Promotions */}
        <Link 
        to="promotions"
       
        >
        <button 
         onClick={onClose}
         className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
           hover:bg-gray-200 dark:hover:bg-gray-800 transition">
          <Megaphone className="w-5 h-5" />
          <span>Promotions</span>
        </button> </Link>

        {/* Earnings */}
        <Link
        to="earnings">
        <button 
        onClick={onClose}
        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
           hover:bg-gray-200 dark:hover:bg-gray-800 transition">
          <Wallet className="w-5 h-5" />
          <span>Earnings</span>
        </button></Link>

         <Link
        to="calender">
        <button 
        onClick={onClose}
       className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
           hover:bg-gray-200 dark:hover:bg-gray-800 transition">
          <Calendar className="w-5 h-5" />
          <span>Calender</span>
        </button></Link>

        {/* Settings */}
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
           hover:bg-gray-200 dark:hover:bg-gray-800 transition">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>

      </div>
       
    </aside>
  );
};

export default Sidebar;