import {Router} from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config();
const PORT = process.env.PORT || 8080; // Define un valor predeterminado si PORT no está definido
const authRouter = Router();
const SECRET_KEY = process.env.SECRET_KEY;

authRouter
    .use('/priv',verifyToken)
    .get('/',(req,res)=>{
        res.json({message: "Ruta No Protegida"})
    })
    .post('/login',(req,res)=>{
        try{
            const {user, pass} = req.body;
            console.log('El usuario: ' + user + ' está intentando loggearse.')
            if(user == 'admin' && pass == 'admin'){
                
                return res.status(201).json({
                    token: jwt.sign({user:'admin'},SECRET_KEY)
                })
            }else{
                return res.status(400).json({message: "User o contraseña erronea"})
            }
        }catch(err){
            return res.json({error: err})
        }
        
    })
    .get('/priv/rutaprivada',(req,res)=>{
        res.status(200).json({message: 'ruta Protegida'})
    })

async function verifyToken(req,res,next){
    
    if(!req.headers.authorization ){
        return res.status(401).json('Acceso no autorizado')
    }else{
        console.log("Clave secreta: " + SECRET_KEY)
        console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        try{
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(400).json({ error: 'Token inválido' });
                } else {
                    next();
                }
            });            
        }catch(err){
            console.log(err)
        }
    }
}

export default authRouter;