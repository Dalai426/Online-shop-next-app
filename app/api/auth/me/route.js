import connectMongoDB from "@/backend/config/dbConnect";
import User from "@/backend/models/user";
import { IsAuthenticated } from "@/backend/utils/IsAuthenticated";
import { deleteImage, uploads } from "@/backend/utils/cloudinary";
import errorRet from "@/backend/utils/error";
import { NextResponse } from "next/server";

export async function PUT(req,params) {

    const body = await req.formData();
    const userData={
        name:body.get("name"),
        email:body.get("email")
    }
    const token = await IsAuthenticated(req);
    if (!token) {
      let error=new ErrorHandler("Өөө, Эхлээд нэвтрэнэ үү !!!",401);
      return NextResponse.json(
        {
          success: false,
          error,
          message: error.message,
          stack: error.stack,
        },
        { status: error.statusCode }
      );
    }



    if(body.get("image")){
        const uploader=async (path)=>await uploads(path,"buyitnow/avatars");
        const file=body.get("image");
        if(token.avatar){
          try{
            await deleteImage(token.avatar,"buyitnow/avatars");
          }catch(err){
            return errorRet(err);
          }
        }

        try{
          const avatarResponse=await uploader(file);
          userData.avatar=avatarResponse.url;
        }catch(error){
          return errorRet(error);
        }
    }
   
    await connectMongoDB();
    try{
      const user=await User.findOneAndUpdate({ _id: token._id},userData,{ new: true })
      return NextResponse.json({user},{status:200});
    }catch(err){
      return errorRet(err);
    }

}