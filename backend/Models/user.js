const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    UserName:String,
    Name:String,
    ProfileImage:{
        type:String,
        default:"default.png"
    },
    ProfileImage_id:{
        type:String,
        default:null
    },
    Posts:[ //array of objectID of type mongoose referenced to post.js
        {
            type: mongoose.Schema.Types.ObjectId,
            ref :"post"
        }
    ],
    LikedPost:{
        type: Map,
        of: Boolean,  // or Object if you want metadata
        default: {}
    },
    Email:String,
    Password:String,
    DateOfBirth:{
        type:Date,
        default:Date.now()
    },
    Address:{
        type:String,
        default:null
    },
    PhoneNumber:{
        type:String,
        default:null
    },
    Profession:{
        type:String,
        default:null
    },
    Gender:{
        type:String,
        default:null
    }
})

module.exports = mongoose.model('user',userSchema);

