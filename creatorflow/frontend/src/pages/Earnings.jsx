import React,{useState,useEffect} from 'react'
import {siYoutube,siInstagram} from "simple-icons"



const Earnings = () => {

  const[error,setError]=useState("")
const [loading,setLoading]=useState(false);
const[earnings,setEarnings]=useState(null);
const[platformEarnings,setPlatformEarnings]=useState(null)

{loading && (
  <p className="text-gray-500 dark:text-gray-400">
    Loading earnings...
  </p>
)}

const fetchEarnings=async()=>{
  
  try {
     setError("")
      setLoading(true);
    const response= await fetch("http://localhost:5002/api/v1/earnings",
      {
        method:"GET",
        credentials:"include"
      },

    )

    const data = await response.json()
    if (!response.ok){
      throw new error(error.message || "failed to fetch earnings")
    }
    setEarnings(data.data)
  } catch (error) {
    console.log(error.message);
    
  }
 
};

const fetchPlatformEarnings= async()=>{
  try {
    const response = await fetch("http://localhost:5002/api/v1/earnings/platform",
      {
        method:"GET",
        credentials:"include"
      },
    )
    const data=await response.json()
    if (!response.ok){
      throw new error(error.message || "failed to fetch platform earnings")
    }
    setPlatformEarnings(data.data) 
  
  }
   catch (error) {
    console.log(error.message);
    
  }
};



useEffect(()=>{
  fetchEarnings();
  fetchPlatformEarnings();
},[])


  return (
  <div className="min-h-screen mt-10 max-w-5xl space-y-4
   text-gray-900 dark:text-white">
  <div className='flex justify-center text-center'>
   <h1 className='text-3xl font-semibold '> Earnings</h1>
   </div>

  {/* Instagram */}
  <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm ">
    <div className="flex items-center justify-between gap-y-2">
      
      <div className="flex items-center gap-2">
        
        <p className="font-semibold text-lg ">
          Total
        </p>
      </div>

      <p className="font-semibold text-lg">
        ₹{earnings?.totalEarning??0}
      </p>

    </div>
  


  {/* YouTube */}
  
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-0">

       

        <p className="font-semibold text-lg">
          Pending
        </p>

      </div>

      <p className="font-semibold text-lg">
         ₹{earnings?.pendingAmount??0}
      </p>

    </div>
  
    
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-0">

       

        <p className="font-semibold text-lg">
          Recieved
        </p>

      </div>

      <p className="font-semibold text-lg">
         ₹{earnings?.paidAmount??0}
      </p>

    </div>
  </div>
  
            


   <div className='flex justify-center text-center'>
   <h1 className='text-3xl font-semibold '> Earnings by platform</h1>
   </div>

  {/* Instagram */}
  <div className="rounded-xl border border-gray-200
   dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm h-26">
    <div className="flex items-center justify-between">
      
      <div className="flex items-center gap-2">
        <svg
          role="img"
          viewBox="0 0 24 24"
          className="w-6 h-6 text-red-500"
          fill="currentColor"
        >
          <path d={siInstagram.path} />
        </svg>
        <p className="font-semibold text-lg ">
          Instagram
        </p>
      </div>

      <p className="font-semibold text-lg">
        ₹{platformEarnings?.instagram??0}
      </p>

    </div>
  </div>


  {/* YouTube */}
  <div className="rounded-xl border border-gray-200 dark:border-gray-700
   bg-white dark:bg-gray-900 p-5 shadow-sm h-26">
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-2">

        <svg
          role="img"
          viewBox="0 0 24 24"
          className="w-6 h-6 text-red-500"
          fill="currentColor"
        >
          <path d={siYoutube.path} />
        </svg>

        <p className="font-semibold text-lg">
          YouTube
        </p>

      </div>

      <p className="font-semibold text-lg">
       ₹{platformEarnings?.youtube??0}
      </p>

    </div>
  </div>
   <div className='flex justify-center text-center'>
   <h1 className='text-3xl font-semibold '> Recent Payments</h1>
   </div>

  {/* Instagram */}
  <div className="rounded-xl border border-gray-200 dark:border-gray-700
   bg-white dark:bg-gray-900 p-5 shadow-sm ">
    <div className="flex items-center justify-between">
      
      <div className="flex items-center gap-0">
        
        <p className="font-semibold text-lg ">
         Nike
        </p>
      </div>

      <p className="font-semibold text-lg">
        30000
      </p>
     <p className="font-semibold text-lg
      text-green-600 dark:text-green-400">
  Received
</p>

    </div>
    <div className="flex items-center justify-between">
      
      <div className="flex items-center gap-0">
        
        <p className="font-semibold text-lg ">
         Boat
        </p>
      </div>

      <p className="font-semibold text-lg">
        1000
      </p>
     <p className="font-semibold text-lg
      text-yellow-600 dark:text-yellow-400">
  Pending
</p>

    </div>
    <div className="flex items-center justify-between">
      
      <div className="flex items-center gap-0">
        
        <p className="font-semibold text-lg ">
         XYZ
        </p>
      </div>

      <p className="font-semibold text-lg">
        30000
      </p>
      <p className="font-semibold text-lg
       text-green-600 dark:text-green-400">
  Received
</p>
      

    </div>
  </div>


</div>
  )
}

export default Earnings