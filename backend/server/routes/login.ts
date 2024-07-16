import express from 'express';
const router = express.Router();
import { Middleware } from '../middleware/middleware';
import { UserSchema } from '../models/User';
import { signJwt } from '../helpers/jwt';
import mongoose from 'mongoose';
router.post('/api/login', async (req, res) => {
    let inputs = req.body;
    console.log(inputs)
    if (!inputs) {
        return res.send({
            code: 0,
            message: "password or username wrong!"
        })
    }
    let username = inputs.username as string;
    let password = inputs.password as string;
    let userInfo: any = await UserSchema.findOne({ username: username });
  
    if (userInfo == null || userInfo.password != password) {
        return res.send({
            code: 0,
            message: "password or username wrong!"
        })
    }
    let token = signJwt({ id: userInfo.id });
    return res.send({
        token: token,
        code: 1,
        message: "oke"
    })
})
router.post('/api/register', async (req, res) => {
    let inputs = req.body;
    let username = inputs.username as string;
    let password = inputs.password as string;
    let userInfo: any = await UserSchema.find({ username: username });
    if (userInfo != null) {
        return res.send({
            code: 0,
            message: "user existed"
        })
    }
    let newUser = new UserSchema({
        username: username,
        password: password
    });
    await newUser.save();

    return res.send({
        code: 1,
        message: "ok"
    })
});
router.get('/api/hello',Middleware, (req, res) => {
   
    return res.send({
        code: 1,
        message: 'hello'
    })
})
export { router as loginRouter }