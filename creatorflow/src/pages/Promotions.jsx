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
    deliverables:[],
    payment:""

   });

   const [addCard,setAddCard] = useState({
    brand:"",
    platform:"",
    campaign:"",
    amount:"",
    dueDate:"",
    deliverables:[],
    payment:"",
    productReceived:false,
    contentCreated:false,
    posted:false,

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

   

   function saveCard(){


      if (
    !addCard.brand ||
    !addCard.platform ||
    !addCard.campaign ||
    !addCard.amount ||
    !addCard.dueDate ||
    !addCard.payment ||
    addDeliverables.length === 0
  ) {
    alert("Please fill all required fields");
    return;
  }

  // Amount validation
  if (Number(addCard.amount) <= 0) {
    alert("Amount must be greater than 0");
    return;
  }

    const newPromotion = {
  id: Date.now(),
  brand: addCard.brand,
  platform: addCard.platform,
  campaign:addCard.campaign,
  amount: addCard.amount,
  dueDate: addCard.dueDate,
  payment: addCard.payment,
  deliverables: addDeliverables,
  productReceived:addCard.productReceived,
  contentCreated: addCard.contentCreated,
  posted:addCard.posted,

};

    setPromotionList([
      ...promotionList,
      newPromotion ]

    )
    setAddPromotion(false);

    setAddCard({
  brand: "",
  platform: "",
  campaign: "",
  amount: "",
  dueDate: "",
  deliverables: [],
  payment: "",
  productReceived: false,
  contentCreated: false,
  posted: false,
});

setAddDeliverables([]);
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

   function updateProgress(id,field) {
    setPromotionList(
      promotionList.map((promotion)=>
      promotion.id===id?
       {
        ...promotion,
        [field]: ! promotion[field]
       }
       :promotion
    )
    );
   }


   function deletePromotion(id){
    setPromotionList(
      promotionList.filter((promotion)=>
      promotion.id!==id
    )
    );
   }

   const [search,setSearch] = useState("");
    const [filter,setFilter]=useState("");
  
   const filterPromotions=promotionList.filter((promotion)=>{

    const matchesSearch=
      promotion.brand.toLowerCase().includes(search.toLowerCase()) ||
      promotion.platform.toLowerCase().includes(search.toLowerCase()) ||
      promotion.campaign.toLowerCase().includes(search.toLowerCase()) 
    
      const matchesFilter= promotion.payment.toLowerCase().includes(filter.toLowerCase());
   
      return matchesSearch && matchesFilter;
   } );

   
  

   

   

   
  return (
    <div className="min-h-screen bg-white px-8 py-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-medium">
          Promotions
        </h1>

        <button
        onClick={()=> {
           setAddDeliverables([]);
          setAddPromotion(true)
        } }
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
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
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
         <select 
         value={filter}
         onChange={(e)=>setFilter(e.target.value)}
         className="flex items-center gap-2 whitespace-nowrap text-gray-700 font-medium">
       
        
          

         <option value="">Filter:All</option>
          <option value="paid">Paid</option>
          <option value="partially paid">partially paid</option>
          <option value="pending">pending</option>
         
        
       </select>
        
        
                  


      </div>


      {/* Promotion Card */}
      <div className="mt-10 max-w-3xl">
      {filterPromotions.map((promotion)=>(

     

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
                checked={promotion.productReceived}
                onChange={()=>updateProgress(promotion.id,"productReceived")}
              />
              Product received
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={promotion.contentCreated}
                onChange={()=>updateProgress(promotion.id,"contentCreated")}
              />
              Content created
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={promotion.posted}
                onChange={()=>updateProgress(promotion.id,"posted")}
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
      deliverables:promotion.deliverables || [],
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
  <button
    onClick={() => { 
      if (window.confirm("Are you sure you want to delte this promotion?")) {
      deletePromotion(promotion.id)} } }
    className="font-medium text-red-500 hover:text-red-600 transition"
  >
    Delete
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
            value={addCard.brand}
            onChange={(e)=>setAddCard(
              {
                ...addCard,
                brand:e.target.value
              }
            )}
            
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
            value={addCard.platform}
            onChange={(e)=>setAddCard(
              {
                ...addCard,
                platform:e.target.value
              }
            )}
            
          />
        </div>

         {/* Campaign */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Campaign
          </label>

          <input
            type="text"
            placeholder="e.g. promotion campaign"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            value={addCard.campaign}
            onChange={(e)=>setAddCard(
              {
                ...addCard,
                campaign:e.target.value
              }
            )}
            
          />
        </div>

        


        {/* Amount */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Amount
          </label>

          <input
            type="text"
            placeholder="e.g. ₹30000"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            value={addCard.amount}
            onChange={(e)=>setAddCard(
              {
                ...addCard,
                amount:e.target.value
              }
            )}
            
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
            value={addCard.dueDate}
            onChange={(e)=>setAddCard(
              {
                ...addCard,
                dueDate:e.target.value
              }
            )}
            
          />


      </div> 
     <div className="mb-6">

  <label className="block mb-1 text-sm font-medium">
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
          w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
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

 <div className="mb-6">

        <label className="block mb-2 font-medium">
          Payment
        </label>

        <select
          value= {addCard.payment}
          onChange={(e)=>setAddCard({
            ...addCard,
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



      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setAddPromotion(false)}
          className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
        onClick={saveCard}

      
          className="px-5 py-2.5 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600"
        >
          Add Promotion
        </button>

      </div>

    </div> 
    </div> 
 )}
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
          value={editForm.platform }
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
          value={editForm.campaign}
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
          value={editForm.amount}
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
          value={editForm.dueDate}
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
          value= {editForm.payment}
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
  )
};

export default Promotions;