
import mongoose,{Schema} from "mongoose";


const promotionSchema= new Schema(
    {
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

export const Promotion= mongoose.model("Promotion",promotionSchema);
