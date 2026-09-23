import { Promotion } from "../models/promotion.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const addPromotion= asyncHandler(async(req,res)=>{
    
    const {brand,platform,campaign,amount,dueDate,deliverables,payment}= req.body

    if (!req.user){
        throw new ApiError(401,"Unauthorized Access");
    }
 const userId= req.user?._id;
   

      

   const promotion=  await Promotion.create({
       
          userId,
      brand,platform,campaign,amount,dueDate,deliverables,payment,
    });

    

    return res
    .status(201)
    .json(
        new ApiResponse(201,{promotion},
            "Promotion added successfully"
        )
    );


});

const getCurrentPromotion= asyncHandler(async(req,res)=>{
    const {id} = req.params
    const promotion = await Promotion.findById({_id: id,
  userId: req.user?._id})
    if(!promotion) {
        throw new ApiError(404,"promotion not found")
    };
    return res
           .status(200)
           .json(
            new ApiResponse (200,{promotion}, "current promotion fetched successfully")
           )
});


const getAllPromotions= asyncHandler(async(req,res)=>{

    if(!req.user){
        throw new ApiError(401,"Unauthorized Access")
    }
    const promotions= await Promotion.find({userId: req.user?._id})
   

        return res
               .status(200)
               .json(
                new ApiResponse(200,{promotions},"All promotions fetched successfully")
               )
});


const editPromotion= asyncHandler(async(req,res)=>{

    const {id} = req.params
    const {brand,platform,campaign,amount,dueDate,deliverables,payment}= req.body
    

    const editedpromotion = await Promotion.findByIdAndUpdate({_id: id,
  userId: req.user?._id},
    {brand,platform,campaign,amount,dueDate,deliverables,payment},
    {
        new:true,
        runValidators:true
    },

    );

     if(!editedpromotion) {
        throw new ApiError(404,"promotion not found")
    };

    return res
           .status(200)
           .json(
            new ApiResponse(200,{editedpromotion},"Promotion edited successfully")
           )

   
});

const deletePromotion= asyncHandler(async(req,res)=>{
    const {id}= req.params
    const promotion = await Promotion.findById({_id: id,
  userId: req.user?._id})

     if(!promotion){
        throw new ApiError(404,"promotion not found")
    }
    await promotion.deleteOne()

    

    return res
           .status(200)
           .json(
            new ApiResponse(200, [],"promotion deleted successfully")
           )
})

export {addPromotion,
    getCurrentPromotion,
    getAllPromotions,
    editPromotion,
    deletePromotion,
}


