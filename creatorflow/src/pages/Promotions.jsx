import React from "react";
import { Plus, ChevronDown, ArrowRight, Copy } from "lucide-react";



const Promotions = () => {
   
  return (
    <div className="min-h-screen bg-white px-8 py-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-medium">
          Promotions
        </h1>

        <button
          className="
            flex items-center gap-2
            px-5 py-3
            rounded-lg
            bg-blue-500
            text-white
            font-medium
            hover:bg-blue-600
            transition
          "
        >
          <Plus className="w-5 h-5" />
          Add Promotion
        </button>

      </div>


      {/* Search + Filter */}
      <div className="flex items-center justify-center gap-6 mt-10">

        {/* Search */}
        <div
          className="
            w-full max-w-3xl
            h-12
            flex items-center
            bg-gray-100
            rounded-full
            px-5
          "
        >
          <input
            type="text"
            placeholder="Search promotions..."
            className="
              w-full
              bg-transparent
              text-lg
              text-gray-700
              placeholder-gray-400
              outline-none
            "
          />
        </div>

        {/* Filter */}
        <button
          className="
            flex items-center gap-2
            whitespace-nowrap
            text-gray-700
            font-medium
          "
        >
          Filter: All
          <ChevronDown className="w-4 h-4" />
        </button>

      </div>


      {/* Promotion Card */}
      <div className="mt-10 max-w-3xl">

        <div
          className="
            rounded-xl
            border border-gray-200
            bg-white
            p-5
            shadow-sm
          "
        >

          {/* Brand */}
          <div className="flex items-center justify-between">

            <h2 className="text-lg font-semibold">
              Nike
            </h2>

            <button className="text-gray-400 hover:text-gray-600">
              <Copy className="w-5 h-5" />
            </button>

          </div>


          {/* Platform */}
          <p className="mt-2 text-gray-600">
            Instagram Reel
          </p>


          {/* Amount + Due date */}
          <div className="flex items-center justify-between mt-2">

            <p className="font-medium">
              ₹30,000
            </p>

            <p className="text-gray-600">
              Due Sep 5
            </p>

          </div>


          {/* Progress */}
          <div className="flex items-center gap-6 mt-7 text-sm">

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
              />
              Product received
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
              />
              Content created
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
              />
              Posted
            </label>

          </div>


          {/* Bottom */}
          <div
            className="
              flex items-center justify-between
              mt-7
              pt-4
              border-t border-gray-200
            "
          >

            <p className="text-gray-700">
              Payment: <span className="font-medium">Pending</span>
            </p>

            <button
              className="
                flex items-center gap-2
                font-medium
                hover:text-blue-500
                transition
              "
            >
              View
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
      {/* Promotion Card 2 */} 
<div
  className="
    mt-6
    rounded-xl
    border border-gray-200
    bg-white
    p-5
    shadow-sm
    max-w-3xl
  "
>
  {/* Brand */}
  <div className="flex items-center justify-between">

    <h2 className="text-lg font-semibold">
      Boat
    </h2>

    <button className="text-gray-400 hover:text-gray-600">
      <Copy className="w-5 h-5" />
    </button>

  </div>

  {/* Platform */}
  <p className="mt-2 text-gray-600">
    YouTube Video
  </p>

  {/* Amount + Due date */}
  <div className="flex items-center justify-between mt-2">

    <p className="font-medium">
      ₹45,000
    </p>

    <p className="text-gray-600">
      Due Sep 10
    </p>

  </div>

  {/* Progress */}
  <div className="flex items-center gap-6 mt-7 text-sm">

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        className="w-4 h-4"
      />
      Product received
    </label>

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        className="w-4 h-4"
      />
      Content created
    </label>

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        className="w-4 h-4"
      />
      Posted
    </label>

  </div>

  {/* Bottom */}
  <div
    className="
      flex items-center justify-between
      mt-7
      pt-4
      border-t border-gray-200
    "
  >

    <p className="text-gray-700">
      Payment: <span className="font-medium">Pending</span>
    </p>

    <button
      className="
        flex items-center gap-2
        font-medium
        hover:text-blue-500
        transition
      "
    >
      View
      <ArrowRight className="w-4 h-4" />
    </button>

  </div>

</div>
 

    </div>
  );
};

export default Promotions;