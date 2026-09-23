
import mongoose,{ Schema, type HydratedDocument, type Model } from "mongoose";


export interface IPromotion {
    

  userId: mongoose.Types.ObjectId,
  brand: string;
  platform: string;
  amount: number;
  dueDate: Date;
  deliverables: string[];
  payment: string;
  campaign: string;
productReceived: boolean;
  posted: boolean;
  contentCreated:boolean;
}

export type PromotionModel = Model<IPromotion, {}>;
export type PromotionDocument = HydratedDocument<IPromotion>;
const promotionSchema= new Schema<IPromotion,PromotionModel>(
    {
        userId:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"User",
           required:true,
           index:true,
        },
        brand:{
            type: String,
            required:true,
            trim:true,
            lowercase:true,
            index:true,


        },
        
        platform: {
            type: String,
            required:true,
            trim:true,
            lowercase:true,
            index:true,
        },
        amount:{
            type:Number,
            required:true,
            
            index:true,


        },

        dueDate:{
            type:Date,
            required:true,
            
        },
        deliverables:{
            type:[String],
            required:true,
           

        },

        payment:{
            type:String,
            required:true,
            enum:["Pending","Paid","Partially Paid"],
            default:"Pending",
        },

        campaign:{
            type:String,
            required:true,
            trim:true,

        },

        productReceived:{
            type:Boolean,
            default:false,
    },

      contentCreated:{
            type:Boolean,
            default:false,
    },

      posted:{
            type:Boolean,
            default:false,
    },

},


    {
        timestamps:true,
    },
)

export const Promotion= mongoose.model<IPromotion>("Promotion",promotionSchema);
