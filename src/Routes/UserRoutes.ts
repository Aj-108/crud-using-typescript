import { Router } from 'express';
import {errorHandler} from '../Middlewares/errorMiddleware'
import {checkAuth} from '../Middlewares/checkAuthTokenMiddleware'
import { deleteUser, fetchAllUsers, fetchUserDetails, updateUserDetails } from '../Controllers/UserController'

const router = Router();

router.get('/fetchuser/:id',checkAuth,fetchUserDetails)
router.delete('/:id',checkAuth,deleteUser) ;
router.put('/:id',checkAuth,updateUserDetails) ;
router.get("/fetchuser",checkAuth,fetchAllUsers) ;


router.use(errorHandler) ;

export default router ;