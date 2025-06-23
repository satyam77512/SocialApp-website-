const postModel = require('../Models/post');
const userModel = require('../Models/user');
const cloudinary = require("../Utils/cloudinary");

const UserDetail = async(req,res)=>{
    const User = await userModel.findOne({_id:req.body.UserId}).populate("LikedPost");
    if(!User)
    {
        return res.status(409).json({message : "cannot find user"});
    }
    const data = User;
    return res.status(200).json(data);
}

const Update = async(req,res)=>{
    // console.log(req.body);
    let imageUrl = null;
    let imageId = null;
    try {
        
    if(req.files.postImage)
    {
        const result = await cloudinary.uploader.upload(req.files.postImage[0].path,{
            width: 176,
            height: 176,
            crop: "fill",
            gravity: "face",           // smart crop
            quality: "auto:best",             // <-- Adjust this to stay within 100–200KB
            format: "webp",            // <-- WebP gives smallest high-quality result
            flags: "lossy",
            transformation: [
                { effect: "sharpen:100" }
            ]
        });
        imageUrl = result.url;
        imageId = result.public_id;
    }
    
        // fetching user
    const {Name, UserName,Email,DateOfBirth,Address,PhoneNumber,Profession,
        Gender} = req.body;
        
        const user = await userModel.findOne({UserName});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        if(imageUrl)
        {
            const oldId = user.ProfileImage_id;
            
            user.ProfileImage = imageUrl;
            user.ProfileImage_id = imageId;
            
            await user.save();
            
            if(oldId)
                await cloudinary.uploader.destroy(oldId);
        }
            
        user.Name = Name;
        user.Email = Email;
        user.DateOfBirth = DateOfBirth ? new Date(DateOfBirth) : null;
        user.Address = Address;
        user.PhoneNumber = PhoneNumber;
        user.Profession = Profession;
        user.Gender = Gender;
        
        await user.save();

        const data = {};
        data.Name = Name;
        data.ProfileImage = user.ProfileImage;

        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error..." });
    }
}
const userPost = async(req,res)=>{
    try {
        
        const {UserId} = req.body;
        const User = await userModel.findOne({_id:UserId}).populate("Posts");
        const data = User.Posts;
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(409).json({message:"error occured"});
    }
}

const Search = async(req,res)=>{
    const {username} = req.body;
    try {
        const user = await userModel.findOne({UserName : username}).populate("Posts");
        if(!user)
        {
            return res.status(409).json({message: "cannot find user"});
        }
        const data = user;
        const posts = user.Posts;

        return res.json({data,posts});
    } catch (error) {
        console.log(error);
        res.status(400).json({message : "server error"});
    }
}

module.exports = {UserDetail,Update,userPost,Search};