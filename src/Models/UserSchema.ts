import mongoose,{Document,Schema} from 'mongoose'

// TODO enums arrays 
export interface UserModel extends Document {
    fname : string ,
    lname : string ,
    email : string ,
    password : string ,
    contact : number ,
    age : number,
    gender : string,
    imageUrl : String ,
    createdAt : Date ,
    updatedAt : Date  
}


const UserSchema : Schema = new mongoose.Schema({
    fname : {
        type : String ,
        required : true ,
    },
    lname : {
        type : String ,
    },
    email : {
        type : String ,
        required : true ,
        unique : true ,
    },
    password : {
        type : String ,
        required  : true
    },
    contact : {
        type : String ,
        required : true 
    },
    age : {
        type : Number ,
        required : true 
    },
    gender : {
        type : String,
        required : true
    }
    ,
    imageUrl : {
        type : String,
    }
},{
    timestamps : true 
})

export default mongoose.model<UserModel>('User',UserSchema) ;