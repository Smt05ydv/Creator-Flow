import { Promotion } from "../models/promotion.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";




const dashboard= asyncHandler(async(req,res)=>{
   
    if (!req.user){
        throw new ApiError(
            401,"User not found unauthorized access")
        }

      
       const  earnings=  await Promotion.aggregate([
        {
            $match : {
                userId: req.user._id,
            },

        },
        {
            $group:{
               _id:null,
               activePromotions:{$sum:1},
               Earned:{$sum : "$amount"},
               Pending:{
                $sum:{
                    $cond:[{$eq:["$payment","Pending"]},
                "$amount",0],
                },
               },
              
            },
        },

       ])
   const result= earnings[0] ||
        {    
            Earned:0,
            activePromotions:0,
            Pending:0,
            
        }
        
      

       return res
              .status(200)
              .json(
                new ApiResponse(
                    200,result,"Dashborad fetched successfully"
                )
              )

          
    }
)





const upcoming=asyncHandler(async(req,res)=>{
    if(!req.user){
        throw new ApiError(401,"Unauthorized access");
    }
    const now = new Date();

const fiveDaysFromNow = new Date();
fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);

    const upcomingPromotions = await Promotion.aggregate([
    {
        $match: {
            userId: req.user._id,
            dueDate: {
                $gte: now,
                $lte: fiveDaysFromNow,
            },
        },
    },
    {
        $sort: {
            dueDate: 1,
        },
    },
    {
        $limit: 5,
    },
     {
            $project: {
                _id: 1,
                brand: 1,
                platform: 1,
                amount: 1,
                payment: 1,
                dueDate: 1,
            },
        },
]);

  return res.status(200).json(
        new ApiResponse(
            200,
            { upcomingPromotions },
            "Recent payments fetched successfully"
        )
    );
})

const recentPayments = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized access");
    }

    const payments = await Promotion.aggregate([
        {
            $match: {
                userId: req.user._id,
                payment: "Paid",
            },
        },
        {
            $sort: {
                updatedAt: -1,
            },
        },
        {
            $limit: 5,
        },
        {
            $project: {
                _id: 1,
                brand: 1,
                platform: 1,
                amount: 1,
                payment: 1,
                updatedAt: 1,
            },
        },
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            { payments },
            "Recent payments fetched successfully"
        )
    );
});

export {
    dashboard,upcoming,recentPayments,
}