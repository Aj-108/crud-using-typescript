import {RequestHandler} from 'express'
import sharp from 'sharp'
import cloudinary from 'cloudinary'




export const imageUpload : RequestHandler = async (req,res,next) => {
   try{
    const file = req.file ;

    cloudinary.v2.config({
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET 
    })

    if(!file){
        return res.status(400).json({ok:false,message : " No image file provided"})
    }


    sharp(file.buffer)
        .resize({width : 800})
        .toBuffer(async (err,data,info)=> {
            if(err){
                console.log("Image processing error",err);
                return res.status(500).json({ok:false,error : "Error in image processing"}) ;
            }

            const uploadResult = await new Promise ((resolve) => {
                cloudinary.v2.uploader.upload_stream({resource_type : 'auto'},(error,result:any) => {
                    if(error){
                        console.error('Cloudianry Upload Error : ',error) ;
                        return res.status(500).json({ok:false,message : "Error in image uploading to Cloudinary"}) ;
                    }
    
                    res.status(200).json({ok:true,imageUrl : result.url,message:"Image uploaded successfully"}) ;
    
                }).end(data) ;
    
            })
            
            
        })

   }
   catch(err) {
    next(err) ;
   }
    
}