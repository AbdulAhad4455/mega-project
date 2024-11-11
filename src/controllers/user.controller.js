import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError}  from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/cloudinary.js"


const registerUser = asyncHandler(async (req,res)=>{
   // All steps to registerUser
   //get user details from frontend
   //validation -- not empty
   //check if user already exists : username - email se bhi check kr sakhtey hain
   //check for images, check for avater
   // upload them to cloudinary,avatar
   //create user object -crate entry in db
   //remove password and refresh token field from respons
   //check for user creation
   //agr hogia hai to ye kr de ge return  response

   const {fullName,email,username,password} = req.body
   console.log("email",email,);
   if(
      [fullName,email,username,password].some((field)=>
         field?.trim() === "")
   ){
      throw new ApiError(400,"All field not required")
   }

   const existedUser = User.findOne({
      $or : [{username},{email}]
   })
   if(existedUser){
      throw new ApiError(409,"User with email or userName allready exists")
      
   }
   //multer hame file ka exist de de ta hai
   const avatarLocalPath= req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.coverImage[0]?.path;

   if (!avatarLocalPath) {
      throw new ApiError(400,"Avatar file are required")
   }
   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if (!avatar) {
      throw new ApiError(400,"Avatar file are required");
      
   }
   const user = await User.create({
      fullName,
      avatar : avatar.url,
      coverImage : coverImage?.url || "",
      email,
      username : username.toLowerCase()
   })

   const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
   )
   if (!createdUser) {
      throw new ApiError(500,"Something went wrong while register the user");
      
   }
   return res.status(201).json(
      new ApiResponse(200,createdUser,"User rigistered Succesfull")
   )
})

export {registerUser,}