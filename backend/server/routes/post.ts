import express from 'express';
const router = express.Router();
import PostControllers from '../controllers/posts/list';

router.post('/api/posts', async (req, res) => {
    const inputs = req.body;
    console.log(inputs)
    const limit = inputs.limit;
    const page = inputs.page;
    const rs = await PostControllers.listPost(limit, page);
    return res.send({
        data: rs.postInfos,
        count:rs.count,
        code: 1,
        message: "oke"
    })
})
export { router as PostRouters }