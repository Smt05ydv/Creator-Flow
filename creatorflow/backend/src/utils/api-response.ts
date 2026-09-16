class ApiResponse{
    statusCode:number
    data:unknown
    message:string
    success:boolean
    constructor(
        statusCode:number,
        data:unknown,
        message:string="Success"
    ) {
        this.statusCode= statusCode;
        this.message= message;
        this.data=data;
        this.success=statusCode<400;
    }
}
 
export{ApiResponse};