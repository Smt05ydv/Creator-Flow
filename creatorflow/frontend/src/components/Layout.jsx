
import { useEffect, useState } from 'react'
import { Link,useNavigate} from 'react-router'
import { 
  Bell,
  User,
  Menu,
  Sun,
  Moon,
  LogIn,
  UserPlus,
  Info,
    UserCircle,
  Settings,
  KeyRound,
  LogOut,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar'
const Layout=()=> {

    const[sidebarOpen,setSidebarOpen] = useState(false)
    const [user, setUser] = useState(null);
    const [authLoading,setAuthLoading]= useState(true);
    const [profileOpen, setProfileOpen] = useState(false);
    const {theme,setTheme}= useTheme()
    const navigate=useNavigate();

    useEffect(() => {
  const checkAuth = async () => {
    try {
      const response = await fetch(
        "http://localhost:5002/api/v1/auth/current-user",
        {
          method: "POST",
          credentials: "include",
        }
      );

      console.log("CURRENT USER STATUS:", response.status);

      const data = await response.json();

      console.log("CURRENT USER DATA:", data);

      if (response.ok) {
        console.log("SETTING USER:", data.data.user);
        setUser(data.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("CURRENT USER ERROR:", error);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  checkAuth();
}, []);

    const handleLogout= async()=>{
      try {
        const response= await fetch("http://localhost:5002/api/v1/auth/logout",
          {
            method:"POST",
            credentials:"include"
          }
        )
        if (response.ok){
          
          setUser(null)
          setProfileOpen(false)
          navigate("/login")
        }
      } catch (error) {
        console.log("Logout failed:",error);
        
      }
    }
    
  return (
    <div className="min-h-screen" >

      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 border-b">

        <div className="flex items-center gap-4">
      <button onClick={()=>setSidebarOpen(!sidebarOpen)}
              className="flex items-center justify-center 
              w-10 h-10 rounded-lg hover:bg-gray-100  dark:hover:bg-gray-500"
              
        >
            <Menu className="w-6 h-6" />

      </button>
           <h1 className="text-xl font-bold">
            CREATORFLOW
          </h1>

        </div>

        <div className="flex items-center gap-3" >
          <button
  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
  className="flex items-center justify-center w-10 h-10 rounded-full
   hover:bg-gray-100 dark:hover:bg-gray-800"
  aria-label="Toggle theme"
>
  {theme === "dark" ? (
    <Sun className="w-6 h-6" />
  ) : (
    <Moon className="w-6 h-6" />
  )}
</button>

          <div className="relative">
            
            <button className="flex items-center justify-center w-10 h-10 
            rounded-full hover:bg-gray-100  dark:hover:bg-gray-500">
              <Bell className="w-6 h-6" />
            </button>

            <span className="absolute top-1 right-1 w-2.5 h-2.5
             bg-red-500 rounded-full border-2 border-white" />
          </div>

          <button className="flex items-center justify-center 
          w-10 h-10 rounded-full
           bg-gray-200 dark:bg-gray-700
           hover:bg-gray-300   dark:hover:bg-gray-500 "
            onClick={() => setProfileOpen(!profileOpen)}>
            <User className="w-6 h-6" />
          </button>

        </div>

      </nav>

      {sidebarOpen && (<Sidebar onClose={()=>setSidebarOpen(false)}/>
    )}

    <Outlet/>
{profileOpen && (
  <div className="absolute right-0 top-12 w-60 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl p-2 z-50">

    {!user? (
      <>
        {/* Account */}
        <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Account
        </p>
          
        <Link to="/register"
        onClick={() => setProfileOpen(false)}
        
          className="flex items-center gap-3 w-full px-3 py-3 rounded-xl
          text-gray-700 dark:text-gray-200
          hover:bg-gray-100 dark:hover:bg-gray-800

          transition" >
          
           
        
          <UserPlus className="w-5 h-5" />
          <span>Register</span>
          
        </Link>
        

        <Link to = "/login"
        onClick={() => setProfileOpen(false)}
          className="flex items-center gap-3 w-full px-3 py-3 rounded-xl
          text-gray-700 dark:text-gray-200
          hover:bg-gray-100 dark:hover:bg-gray-800
          transition"
        >
          <LogIn className="w-5 h-5" />
          <span>Login</span>
        </Link>

        <div className="my-2 border-t border-gray-200 dark:border-gray-700" />

        {/* General */}
        <Link to="/about-us"
        onClick={() => setProfileOpen(false)}
          className="flex items-center gap-3 w-full px-3 py-3 rounded-xl
          text-gray-700 dark:text-gray-200
          hover:bg-gray-100 dark:hover:bg-gray-800
          transition"
        >
          <Info className="w-5 h-5" />
          <span>About Us</span>
        </Link>
      </>
    ) : (
      <>
        {/* User */}
        <div className="px-3 py-3 mb-1">
          <p className="font-semibold text-gray-900 dark:text-white">
            {user?.fullname || user?.username}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
  {user?.email}
</p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your account
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

        <button
          className="flex items-center gap-3 w-full px-3 py-3 rounded-xl
          text-gray-700 dark:text-gray-200
          hover:bg-gray-100 dark:hover:bg-gray-800
          transition"
        >
          <UserCircle className="w-5 h-5" />
          <span>Profile</span>
        </button>

        <button
          className="flex items-center gap-3 w-full px-3 py-3 rounded-xl
          text-gray-700 dark:text-gray-200
          hover:bg-gray-100 dark:hover:bg-gray-800
          transition"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>

        <button
          className="flex items-center gap-3 w-full px-3 py-3 rounded-xl
          text-gray-700 dark:text-gray-200
          hover:bg-gray-100 dark:hover:bg-gray-800
          transition"
        >
          <KeyRound className="w-5 h-5" />
          <span>Change Password</span>
        </button>

        <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

        <button
          className="flex items-center gap-3 w-full px-3 py-3 rounded-xl
          text-red-500
          hover:bg-red-50 dark:hover:bg-red-950
          transition"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </>
    )}
  </div>
)}
      </div>
  )
}

export default Layout