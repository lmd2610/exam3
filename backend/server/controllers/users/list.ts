import { UserSchema } from "../../models/User";

async function listUser( limit :number, page: number){
    let userInfos: any = await UserSchema.find().skip((page-1)*limit).limit(limit);
    return userInfos;
}

export default {listUser};