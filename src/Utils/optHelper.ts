import nodemailer from 'nodemailer'

export const sendOtp = (email:String,otp:Number) => {

        const mailData:any = {
            from : process.env.EMAIL_ACC,
            to : email,
            subject : "OTP fro verification of account ",
            text : `Your OTP for verification is ${otp}`
        }

        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : process.env.EMAIL_ACC,
                pass : process.env.EMAIL_PASS||""
            }
        })


        transporter.sendMail(mailData,async(err,info)=>{
            if(err){
                console.log(err) ;
                return false ;
            }
            else{
                return true ;   
            }
        })

        return true ;
}
