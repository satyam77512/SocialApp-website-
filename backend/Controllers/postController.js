const postModel = require('../Models/post');
const userModel = require('../Models/user');
const cloudinary = require("../Utils/cloudinary");

const createPostHandler = async (req, res) => {
  try {
    var postImage = null; // array
    var postImage_id = null;  // array

    if (req.files.postImage) {
      try {
        // for loop on each image of  req.file.postImages
        const result = await cloudinary.uploader.upload(req.files.postImage[0].path, {
          width: 300,
          height: 300,
          crop: "thumb",
          quality: "auto:eco",
          format: "webp",
          transformation: [
            { fetch_format: "auto" },
            { dpr: "auto" },
            { effect: "sharpen:30" }
          ]
        });
        postImage = result.url;
        postImage_id = result.public_id;
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Image upload failed." });
      }
    }

    const user = await userModel.findOne({ UserName: req.body.UserName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPost = await postModel.create({
      user: user._id,
      content: req.body.content,
      postImage,
      postImage_id
    });

    user.Posts.push(newPost._id);
    await user.save();

    return res.status(200).send("post created");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create post." });
  }
};

const getAllPost = async (req, res) => {
  try {
    const { index} = req.body;  // Default to page 1 if not provided
    const limit = 5;
    // console.log(index*limit);
    const posts = await postModel
      .find({})
      .sort({ date: -1 })
      .skip(index * limit)
      .limit(limit)
      .populate("user")
      .populate("likes", "UserName");

    const total = await postModel.countDocuments();
    const hasMore = index * limit < total;
    // console.log(hasMore);

    return res.status(200).json({
      posts,
      hasMore
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch posts." });
  }
};

const likePost = async (req, res) => {

  try {
    const { User, postId } = req.body;
    // console.log(User,postId);
    const post = await postModel.findById(postId);
    const getUser = await userModel.findById(User);

    if(!getUser)
    {
      return res.status(409).json({ message: "cannot find usser", error: error.message });
    }
    if(!post)
    {
      return res.status(409).json({ message: "cannot find post", error: error.message });
    }

    const isLiked = getUser.LikedPost.has(postId);

    if(isLiked)
    {
      getUser.LikedPost.delete(postId);
      post.likes.delete(User);
    }
    else
    {
      getUser.LikedPost.set(postId,true);
      post.likes.set(User,true);
    }

    await getUser.save();
    await post.save();

    return res.status(200).json({
      message: "Post updated successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId, User } = req.body;
    const user = await userModel.findById(User);
    const post = await postModel.findById(postId);

    if (!user || !post) {
      return res.status(404).json({ message: "User or Post not found" });
    }
    user.Posts.pull(postId);
    await user.save();

    if (post.postImage_id) {
      await cloudinary.uploader.destroy(post.postImage_id);
    }
    await postModel.findByIdAndDelete(postId);

    return res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.error(error);
    return res.status(409).json({ message: "Error, cannot delete." });
  }
};

module.exports = {createPostHandler,getAllPost,likePost,deletePost};
