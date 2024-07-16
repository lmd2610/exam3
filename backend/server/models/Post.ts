import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    tag:{
        type:String,
        require:true
    }
})
const Post = mongoose.model('Post', postSchema);
export {Post as PostSchema}