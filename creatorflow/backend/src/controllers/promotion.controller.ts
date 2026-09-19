import { Promotion } from "../models/promotion.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const addPromotion= asyncHandler(async(req,res)=>{
    const {brand,platform,campaign,amount,dueDate,deliverables,payment}= req.body

   

   

   const promotion=  await Promotion.create({
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

export {addPromotion}


