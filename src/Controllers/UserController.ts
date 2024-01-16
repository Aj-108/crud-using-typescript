import {RequestHandler} from 'express'
import User from '../Models/UserSchema'

export const fetchUserDetails : RequestHandler = async (req,res,next) => {
    try{
        const userId = req.userId ;
        if(userId !== req.params.id) {
            res.status(400).json({ok:false,message:"Cannot fetch details of other user"}) ;
        }
        const user = await User.findById(req.params.id) ;
        res.status(200).json({ok:true,user}) ;
    }
    catch(err){
        next(err) ;
    }
}


export const deleteUser : RequestHandler = async (req,res,next) => {
    try{
        if(req.userId !== req.params.id) res.status(400).json({ok:false,message:"Cannot delete details of other user"})

        const deletedUser =await User.findByIdAndDelete(req.params.id) ;

        if(!deletedUser){
            res.status(404).json({message : "User not found"}) ;
        }

        res.status(200).json({ok:true,message:"User deleted successfully"})
    }
    catch(err){
        next(err) ;
    }
}


export const updateUserDetails : RequestHandler = async (req,res,next) => {
    try{
        const userId = req.userId ;
        if(userId !== req.params.id) {
            res.status(400).json({ok:false,message:"Cannot fetch details of other user"}) ;
        }

        const {fname,lname,email,password,contact,age,gender,imageUrl} = req.body ;
        const data = {fname,lname,email,password,contact,age,gender,imageUrl} ;

        const updatedUser = User.findByIdAndUpdate(
            req.params.id,
            data,
            {new:true}  
        )

        if(!updatedUser){
            res.status(404).json({message : "User not found"}) ;
        }

        res.status(200).json({ok:true,message:"User updated successfully",data})
    }
    catch(err){
        next(err) ;
    }
}


export const fetchAllUsers : RequestHandler = async (req,res,next) => {
    try{
        const users = await User.find() ;
        const names = users.map((user) => user.email);

        res.status(200).json({ok:true,message:"Users list fetched successfully",names})
    }
    catch(err){
        next(err) ;
    }
}



