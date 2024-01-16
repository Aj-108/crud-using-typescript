import express,{Application,Request,Response,NextFunction} from "express" ;
import bodyParser from 'body-parser' ;
import cors from 'cors' ;
import cookieParser from 'cookie-parser' ;
import dotenv from "dotenv" ;
import {errorHandler} from './Middlewares/errorMiddleware'
import AuthRoutes from './Routes/AuthRoutes'
import UserRoutes from './Routes/UserRoutes'
import ImageRoutes from './Routes/ImageRoutes'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


require('./db')

dotenv.config({ path: __dirname+'/.env' }) ;

  
  declare global {
    namespace Express {
      interface Request {
        userId?: string ;
      }
    }
  }


const app = express() ;
const port = process.env.PORT ;

app.use(cors({
    credentials : true , 
}))
app.use(bodyParser.json()) ;
app.use(cookieParser()) ;

const swaggerOptions = {
    definition: {
      info: {
        title: 'REST API using Typescript',
        version: '1.0.0',
        description: 'Done CRUD operations using typescript',
      },
      servers: [
        {
          url: `http://localhost:${port}`,
        },
      ],
    },
    apis: ['./src/Routes/*.ts'], 
  };


  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Routes 
app.use('/auth',AuthRoutes) ;
app.use('/user',UserRoutes) ;
app.use('',ImageRoutes) ;





// Error Handling use middleware
app.use(errorHandler) ;

app.listen(port,()=> {
    console.log(`Server is Running on ${port}`)
}) 