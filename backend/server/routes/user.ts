import express from 'express';
const router = express.Router();
import UserControllers from '../controllers/users/list';

router.post('/api/users', async (req, res) => {
    const inputs = req.body;
    console.log(inputs)
    const limit = inputs.limit;
    const page = inputs.page;
    const userInfos = await UserControllers.listUser(limit, page);
    return res.send({
        data: userInfos,
        code: 1,
        message: "oke"
    })
})
export { router as UserRouters }