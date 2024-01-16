import { RequestHandler } from 'express';
import User from '../Models/UserSchema';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken' ;
import nodemailer from 'nodemailer'; 
import {sendOtp} from '../Utils/optHelper'

// Api for registering User 
export const registerUser : RequestHandler = async (req,res,next) => {
    try{
        const {fname,lname,email,password,contact,age,gender,imageUrl} = req.body ;
        const existingUser = await User.findOne({email}) ;

        // Checking if user already exists or not 
        if(existingUser){
            return res.status(409).json({ok:false,message:"User already exists"}) ;
        }

        if (!email || !email.includes('@')) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
        return res.status(400).json({
            ok:false,message:'Invalid password format. It should contain at least 8 characters, one uppercase letter, one digit, and one special character.',
        });
        }

        if (!age || age < 20 || age > 100) {
            return res.status(400).json({ error: 'Invalid age. It should be between 20 and 100' });
        }


        // Using otp for verifying email
        // const otp =  Math.floor(1000+Math.random()*900000) ;
        // if(sendOtp(email,otp)) {
            
        // }
        // else{
        //     res.status(409).json({ok:false,message:"Error in sending the otp"})
        // }



        // Hasing password 
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        //Storing password in database
        const newUser = new User({
            fname,lname,email,password:hashedPassword,contact,age,gender,imageUrl
        })

        await newUser.save() ; 


        return res.status(201).json({ok:true,message:"User is created Successfully"}) ;

    }   
    catch(err){
        next(err) ;
    }
}


export const loginUser : RequestHandler = async (req,res,next) => {
    try{
        const {email,password} = req.body ;

        const user = await User.findOne({email}) ;

        // Checking if the email exists in database 
        if(!user){
            return res.status(400).json({ok:false,message:"Invalid Credentials"}) ;
        }

        // comapring password entered with database hashed Password
        const isPasswordMatch = await bcrypt.compare(password,user.password) ;
        if(!isPasswordMatch){
            return res.status(400).json({ok:false,message:"Invalid Credentials"}); 
        }

        // Generating tokens
        const authToken = jwt.sign({userId : user._id},process.env.JWT_SECRET_KEY||" ",{expiresIn : '30m'}) ;
        const refreshToken = jwt.sign({userId : user._id},process.env.JWT_REFRESH_SECRET_KEY||" ",{expiresIn : '2h'}) ;

        // Saving tokens in cookies 
        res.cookie('authToken',authToken,({httpOnly : true})) ;
        res.cookie('refreshToken',refreshToken,({httpOnly:true})) ;

        return res.status(200).json({ok:true,message : "Login Successful",userid:user.id}) ;

    }
    catch(err){
        next(err) ;
    }
}

//For logging out user
export const logoutUser : RequestHandler = async (req,res,next) => {
    try{
        res.clearCookie('authToken') ;
        res.clearCookie('refreshToken') ;
        return res.status(200).json({ok:true,message:"User has been logged out"}) ;
    }
    catch(err) {
        next(err) ;
    }
}


// For sending otp 
// export const sendOtp : RequestHandler = async (req,res,next) => {
//     try{
//         const {email} = req.body ; 


//         const mailData = {
//             from : process.env.EMAIL_ACC,
//             to : email,
//             subject : "OTP fro verification of account ",
//             text : `Your OTP for verification is ${otp}`
//         }

//         const transporter = nodemailer.createTransport({
//             service : 'gmail',
//             auth : {
//                 user : process.env.EMAIL_ACC,
//                 pass : process.env.EMAIL_PASS||""
//             }
//         })


//         transporter.sendMail(mailData,async(err,info)=>{
//             if(err){
//                 console.log(err) ;
//                 res.status(409).json({
//                     ok:false,
//                     message : err.message
//                 })
//             }

//             else{
//                 return res.status(200).json({
//                     ok:true,
//                     message : "OTP send successfully",
//                     otp:otp
//                 })
//             }
//         })
//     }
//     catch(err){
//         next(err) ;
//     }
// }
