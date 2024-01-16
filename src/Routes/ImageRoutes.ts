import { Router } from 'express';
import multer from 'multer'
import {imageUpload} from '../Controllers/ImageController'
import {errorHandler} from '../Middlewares/errorMiddleware'


const router = Router();

const storage = multer.memoryStorage() ;
const upload = multer({storage:storage}) ;

router.post('/uploadimage',upload.single('myimage'),imageUpload) ;


router.use(errorHandler)


export default router ;