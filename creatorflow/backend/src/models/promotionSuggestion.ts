import mongoose,{Schema,type HydratedDocument,type Model} from "mongoose";


export type PromotionStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED";

export type ProcessingStatus =
  | "RECEIVED"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED";

export interface IParsedEmail {
  brand: string | null;
  platform: string | null;
  amount: number | null;
  dueDate: Date | null;
  deliverables: string[];
  payment: "Pending" | "Paid" | "Partially Paid" | null;
  campaign: string | null;
}
export interface IInboundEmail {
  providerMessageId: string;
  from: string;
  subject: string;
  textBody: string;
  receivedAt: Date;
}
export interface IPromotionSuggestion {
    userId:mongoose.Types.ObjectId;
    promotionStatus:PromotionStatus;
    processingStatus:ProcessingStatus;
    processingStartedAt: Date | null;
     retryCount:number;
     lastError:string | null;
     promotionId:mongoose.Types.ObjectId | null;
     inboundEmail:IInboundEmail;
     parsedEmail:IParsedEmail;

}

export type PromotionSuggestionModel = Model<IPromotionSuggestion, {}>;
export type PromotionSuggestionDocument = HydratedDocument<IPromotionSuggestion>;


const promotionSuggestionSchema= new Schema<IPromotionSuggestion,PromotionSuggestionModel>({
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    index:true,
   },
   processingStartedAt: {
    type: Date,
    default: null,
},

   promotionStatus:{
    type:String,
    required:true,
    enum:["PENDING","ACCEPTED","REJECTED"],
    default:"PENDING",
   },

    processingStatus:{
    type:String,
    required:true,
    enum:["COMPLETED","FAILED","PROCESSING","RECEIVED"],
    default:"RECEIVED",
   },
   

   retryCount:{
    type:Number,
    default:0,
   },

   lastError:{
     type:String,
     default:null,
   },

   promotionId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Promotion",
    default:null,
    index:true,
   },

   inboundEmail:{
    providerMessageId:{
       type:String,
        required:true,
       
    },
    from:{
        type:String,
       required:true,
       trim:true,
    },
    
    subject:{
        type:String,
        trim:true,
        default:"",

    },
    textBody:{
        type:String,
        default:"",
    },
    receivedAt:{
        type:Date,
        default:Date.now
    },

   },

   parsedEmail:{
    type:new Schema({
     brand:{
            type: String,
            default:null,
            trim:true,
            


        },
        
        platform: {
            type: String,
            default:null,
            trim:true,
            
        },
        amount:{
            type:Number,
            default:null,
            min:0,


        },

        dueDate:{
            type:Date,
           default:null,
            
        },
        deliverables:{
            type:[String],
            default:[],
           

        },

        payment:{
            type:String,
            enum:["Pending","Paid","Partially Paid"],
            default:null,
        },

        campaign:{
            type:String,
            default:null,
            trim:true,

        }, },
    
 { _id: false }
), 
   default: () => ({}),
   },





},
{
    timestamps:true,
},
)

promotionSuggestionSchema.index(
  {
    userId: 1,
    "inboundEmail.providerMessageId": 1,
  },
  { unique: true }
);

export const PromotionSuggestion= mongoose.model
         <IPromotionSuggestion,PromotionSuggestionModel>("PromotionSuggestion",promotionSuggestionSchema);
