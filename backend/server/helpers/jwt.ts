import jwt from "jsonwebtoken";
const privateKey = "domaybiet dc day"
function sign(data: any) {
    let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: data
    }, privateKey);
    return token;
}
function verify(token: any) {
    try{
        jwt.verify(token, privateKey, function (err: any, decoded: any) {
            return decoded
        })
    }catch(err){
        return err;
    }
    
}
export {sign as signJwt, verify as verifyJwt}