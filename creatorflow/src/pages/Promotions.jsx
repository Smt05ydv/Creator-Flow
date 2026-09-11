import React from "react";
import { useState } from "react";
import { Plus, ChevronDown, ArrowRight, Copy,Pencil } from "lucide-react";

import { promotions } from "../data/data";






const Promotions = () => {
   const [addPromotion, setAddPromotion]= useState(false);
   const [editOpen,setEditOpen]= useState(false);
   const [addDeliverables,setAddDeliverables]= useState([]);
   const [selectedPromotion,setSelectedPromotion] = useState(null);
   const [editForm,setEditForm] = useState({
    platform: "",
    campaign: "",
    amount:"",
    dueDate:"",
    deliverable:[],
    payment:""

   });

   const [addCard,setAddCard] = useState({
    brand:"",
    brand:"",
    amount:"",
    dueDate:"",

   });


   

   
  



   
   const [promotionList,setPromotionList] = useState(promotions)
   function addNewDeliverable() {
    setAddDeliverables([...addDeliverables,""]);
   }

   function removeNewDeliverable(index){
    setAddDeliverables(addDeliverables.filter((deliverable,i)=>i!==index)
   )}

   function handleDeliverableChange(index,value) {

    const updatedDeliverables=[...addDeliverables];
    updatedDeliverables[index]=value;

    setAddDeliverables(updatedDeliverables)
   }
   

   function saveChanges() {
      setPromotionList(
        promotionList.map((promotion)=>
          promotion.id === selectedPromotion.id
          ? {
             ...promotion,
            platform: editForm.platform,
            campaign: editForm.campaign,
            amount: editForm.amount,
            dueDate: editForm.dueDate,
            deliverables: editForm.deliverables,
            payment: editForm.payment
          } : promotion
        )
      );
      setEditOpen(false);
   }

   

   

   
  return (
    <div className="min-h-screen bg-white px-8 py-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-medium">
          Promotions
        </h1>

        <button
        onClick={()=>
          setAddPromotion(true)
        }
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
      {promotionList.map((promotion)=>(

     

        <div
        key={promotion.id}
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
              {promotion.brand}
            </h2>

            <button className="text-gray-400 hover:text-gray-600">
              <Copy className="w-5 h-5" />
            </button>

          </div>


          {/* Platform */}
          <p className="mt-2 text-gray-600">
              {promotion.platform}
          </p>


          {/* Amount + Due date */}
          <div className="flex items-center justify-between mt-2">

            <p className="font-medium">
              ₹{promotion.amount}
            </p>

            <p className="text-gray-600">
              Due {promotion.dueDate}
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
              Payment: <span className="font-medium">{promotion.payment}</span>
            </p>

             <button
  onClick={() =>  {setSelectedPromotion(promotion);
    setEditForm({
      platform:promotion.platform,
      campaign:promotion.campaign,
      amount:promotion.amount,
      dueDate:promotion.dueDate,
      deliverable:promotion.deliverables || [],
      payment: promotion.payment
    });
    setEditOpen(true);
  }
  }
  className="
    flex items-center gap-2
    font-medium
    hover:text-blue-500
    transition
  "
>
  Edit
  <Pencil className="w-4 h-4" />
</button>

          </div>

        </div>
        ))}

      </div>

 
 {addPromotion && (  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          Add Promotion
        </h2>

        <button
          onClick={() => setAddPromotion(false)}
          className="text-gray-400 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
      </div>

      {/* Form */}
      <div className="space-y-4">

        {/* Brand */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Brand
          </label>

          <input
            type="text"
            placeholder="e.g. Nike"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Platform */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Platform
          </label>

          <input
            type="text"
            placeholder="e.g. Instagram"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Amount
          </label>

          <input
            type="number"
            placeholder="e.g. 30000"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Due Date
          </label>

          <input
            type="date"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setAddPromotion(true)}
          className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button

      
          className="px-5 py-2.5 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600"
        >
          Add Promotion
        </button>

      </div>

    </div>
  </div>)}

  {editOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

    <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-semibold">
          Edit Promotion
        </h2>

        <button
          onClick={() => setEditOpen(false)}
          className="text-2xl text-gray-400 hover:text-gray-700"
        >
          ×
        </button>

      </div>


      {/* Brand - Fixed */}
      <div className="mb-5">

        <label className="block mb-2 font-medium">
          Brand
        </label>

        <div className="
          w-full
          px-4 py-3
          rounded-lg
          bg-gray-100
          border border-gray-200
          text-gray-500
          flex items-center justify-between
        ">
          <span>Nike</span>

          <span className="text-sm">
            🔒 Fixed
          </span>
        </div>

      </div>


      {/* Platform */}
      <div className="mb-5">

        <label className="block mb-2 font-medium">
          Platform
        </label>

        <select
          Value={editForm.platform }
          onChange={(e)=>setEditForm({
            ...editForm,
            platform: e.target.value
          })}
          className="
            w-full
            px-4 py-3
            rounded-lg
            border border-gray-300
            outline-none
            focus:border-blue-500
          "
        >
          <option>Instagram Reel</option>
          <option>Instagram Post</option>
          <option>YouTube Video</option>
          <option>YouTube Short</option>
        </select>

      </div>


      {/* Campaign */}
      <div className="mb-5">

        <label className="block mb-2 font-medium">
          Campaign
        </label>

        <input

          type="text"
          Value={editForm.campaign}
          onChange={(e)=>setEditForm({
            ...editForm,
            campaign:e.target.value
          })}
          className="
            w-full
            px-4 py-3
            rounded-lg
            border border-gray-300
            outline-none
            focus:border-blue-500
          "
        />

      </div>


      {/* Amount */}
      <div className="mb-5">

        <label className="block mb-2 font-medium">
          Amount
        </label>

        <input
          type="number"
          Value={editForm.amount}
          onChange={(e)=>setEditForm({
            ...editForm,
            amount:e.target.value
          })}
          className="
            w-full
            px-4 py-3
            rounded-lg
            border border-gray-300
            outline-none
            focus:border-blue-500
          "
        />

      </div>


      {/* Due Date */}
      <div className="mb-5">

        <label className="block mb-2 font-medium">
          Due Date
        </label>

        <input
          type="date"
          Value={editForm.dueDate}
          onChange={(e)=>setEditForm({
            ...editForm,
            dueDate:e.target.value
          })}
          className="
            w-full
            px-4 py-3
            rounded-lg
            border border-gray-300
            outline-none
            focus:border-blue-500
          "
        />

      </div>


      {/* Deliverables */}
     {/* Deliverables */}
<div className="mb-6">

  <label className="block mb-2 font-medium">
    Deliverables
  </label>

  <div className="flex flex-col gap-3">

   { addDeliverables.map((deliverable,index) => (
     
     <div className="flex items-center gap-2" 
     key={index}>
      <input
        type="text"
        placeholder="type deliverables e.g. 1 insta story"
        value={deliverable}
        onChange={(e)=>handleDeliverableChange(index,e.target.value)}
        className="
          flex-1
          px-4 py-3
          rounded-lg
          border border-gray-300
          outline-none
          focus:border-blue-500
        "
      />

      <button 
      onClick={()=>removeNewDeliverable(index)}
        className="
          px-3 py-3
          rounded-lg
          text-red-500
          hover:bg-red-50
        "
      >
        🗑
      </button>
    </div>
    ) )}
  

   


  </div>


  <button
  onClick={addNewDeliverable}
    className="
      mt-3
      text-blue-500
      font-medium
      hover:text-blue-600
    "
  >
    + Add Deliverable
  </button>
  

</div>


      {/* Payment */}
      <div className="mb-6">

        <label className="block mb-2 font-medium">
          Payment
        </label>

        <select
          Value= {editForm.payment}
          onChange={(e)=>setEditForm({
            ...editForm,
            payment:e.target.value

          }

          )}
          className="
            w-full
            px-4 py-3
            rounded-lg
            border border-gray-300
            outline-none
            focus:border-blue-500
          "
        >
          <option>Pending</option>
          <option>Paid</option>
          <option>Partially Paid</option>
        </select>

      </div>


      {/* Buttons */}
      <div className="flex justify-end gap-3">

        <button
          onClick={() => setEditOpen(false)}
          className="
            px-5 py-2.5
            rounded-lg
            border border-gray-300
            font-medium
            hover:bg-gray-100
          "
        >
          Cancel
        </button>

        <button
          onClick={saveChanges}
          className="
            px-5 py-2.5
            rounded-lg
            bg-blue-500
            text-white
            font-medium
            hover:bg-blue-600
          "
        >
          Save Changes
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
};

export default Promotions;