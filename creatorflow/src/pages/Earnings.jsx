import React from 'react'
import {siYoutube,siInstagram} from "simple-icons"

const Earnings = () => {
  return (
   <div className="mt-10 max-w-5xl space-y-4 "> 
  <div className='flex justify-center text-center'>
   <h1 className='text-3xl font-semibold '> Earnings</h1>
   </div>

  {/* Instagram */}
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm ">
    <div className="flex items-center justify-between gap-y-2">
      
      <div className="flex items-center gap-2">
        
        <p className="font-semibold text-lg ">
          Total
        </p>
      </div>

      <p className="font-semibold text-lg">
        40000
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
        150000
      </p>

    </div>
  
    
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-0">

       

        <p className="font-semibold text-lg">
          Recieved
        </p>

      </div>

      <p className="font-semibold text-lg">
        230000
      </p>

    </div>
  </div>
  
            


   <div className='flex justify-center text-center'>
   <h1 className='text-3xl font-semibold '> Earnings by platform</h1>
   </div>

  {/* Instagram */}
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm h-26">
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
        $300k
      </p>

    </div>
  </div>


  {/* YouTube */}
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm h-26">
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
        $400k
      </p>

    </div>
  </div>
   <div className='flex justify-center text-center'>
   <h1 className='text-3xl font-semibold '> Recent Payments</h1>
   </div>

  {/* Instagram */}
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm ">
    <div className="flex items-center justify-between">
      
      <div className="flex items-center gap-0">
        
        <p className="font-semibold text-lg ">
         Nike
        </p>
      </div>

      <p className="font-semibold text-lg">
        30000
      </p>
      <p className="font-semibold text-lg">
        Recieved
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
      <p className="font-semibold text-lg">
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
      <p className="font-semibold text-lg">
        Recieved
      </p>
      

    </div>
  </div>


</div>
  )
}

export default Earnings