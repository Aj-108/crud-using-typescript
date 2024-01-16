import { Router } from 'express';
import {errorHandler} from '../Middlewares/errorMiddleware'
import {checkAuth} from '../Middlewares/checkAuthTokenMiddleware'
import {loginUser, logoutUser, registerUser} from '../Controllers/AuthController'

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for registering , logging and making user log out 
 */

/**
 * @swagger
 * definitions:
 *   RegisterRequest:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *       fname:
 *         type: string
 *       lname:
 *         type: string
 *       password:
 *         type: string
 *       age:
 *         type: number
 *       contact:
 *         type: string
 *   RegisterResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       200:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */
 

const router = Router();

router.post('/register',registerUser)
router.post('/login',loginUser) ;
router.get('/logout',logoutUser)
// router.post('/sendotp',sendOtp);


router.use(errorHandler)

export default router ;