const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    date:{
        type:Date,
        default:Date.now
    },
    content: String,
    postImage: {   // change it to array
        type:String,
        default:null
    },
    postImage_id:{  // change it to array
        type:String,
        default:null
    },
    likes:{
        type: Map,
        of: Boolean,  // or Object if you want metadata
        default: {}
    }
});


module.exports = mongoose.model("post",postSchema);