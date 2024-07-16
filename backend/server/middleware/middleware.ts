import { verifyJwt } from "../helpers/jwt"

function authenticateToken(req:any, res:any, next:any) {
 
    const authHeader = req.headers['authorization']
 
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    let result = verifyJwt(token);
    req.user = result
    
    next();
  }
  export {authenticateToken as Middleware}