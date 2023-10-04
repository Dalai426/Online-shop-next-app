import User from "@/backend/models/user";
import { IsAuthenticated } from "@/backend/utils/IsAuthenticated";
import errorRet from "@/backend/utils/error";
import ErrorHandler from "@/backend/utils/errorHandler";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function PUT(req){


    const body=await req.json();


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

    
    const user = await User.findById(token._id).select("+password");


    console.log(user);

    const isPasswordMatched = await bcrypt.compare(
      body.currentPassword,
      user.password
    );
  
    if (!isPasswordMatched) {
      return errorRet(new ErrorHandler("Өөө, Хуучин нууц үг алдааатай байна !!!", 400));
    }
  
    user.password = body.newPassword;
    await user.save();
  
    return NextResponse.json({
        success: true,
      },{status:200});

    
}