import { Promotion } from "../models/promotion.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";




const earnings= asyncHandler(async(req,res)=>{
   
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
               totalEarning:{$sum : "$amount"},
               pendingAmount:{
                $sum:{
                    $cond:[{$eq:["$payment","Pending"]},
                "$amount",0],
                },
               },
               paidAmount:{
                $sum:{
                    $cond:[{$eq:["$payment","Paid"]},
                "$amount",0],
                },
               },
            },
        },

       ])
   const result= earnings[0] ||
        {
            totalEarning:0,
            pendingAmount:0,
            paidAmount:0,
        }
        
      

       return res
              .status(200)
              .json(
                new ApiResponse(
                    200,result,"Earning fetched successfully"
                )
              )

          
    }
)

const earningsByPlatform= asyncHandler(async(req,res)=>{
    if (!req.user){
        throw new ApiError(
            401,"User not found unauthorized access")
        }

        const platformEarnings= await Promotion.aggregate([
            {
                $match:{
                    userId:req.user._id
                },
            },
            {
                $group:{
                    _id:null,
                    instagram:{
                $sum:{
                    $cond:[{$eq:["$platform","instagram"]},
                "$amount",0],
                },
               },
               youtube:{
                $sum:{
                    $cond:[{$eq:["$platform","youtube"]},
                "$amount",0],
                },
               },

                }
            }
        ])

        const result = platformEarnings[0] || {
    instagram: 0,
    youtube: 0,
};

        return res
              .status(200)
              .json(
                new ApiResponse(
                    200,result,"platform Earning fetched successfully"
                )
              )


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
    earnings,
    earningsByPlatform,
    recentPayments,
}