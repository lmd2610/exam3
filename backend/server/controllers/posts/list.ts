import { PostSchema } from "../../models/Post";
async function listPost( limit :number, page: number) {
    let postInfos: any = await PostSchema.find().skip((page-1)*limit).limit(limit);
    return postInfos;
}
export default {listPost };