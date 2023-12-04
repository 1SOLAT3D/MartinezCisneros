import express from 'express'
import authRouter from './auth.js'
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json())
    .use('/',authRouter)
    .get('/notlogin',(req,res)=>{
        res.status(200).json({message:"Debes iniciar sesión"})
    })
    .listen(PORT,()=>{
        console.log('Servidor corriendo en puerto ' +PORT);
    }
)