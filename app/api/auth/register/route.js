import connectMongoDB from "@/backend/config/dbConnect";
import User from "@/backend/models/user";
import ErrorHandler from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    console.log("hi");
    const d = await request.json();
    await connectMongoDB();

    const email=d.email;
    const finded_user=await User.findOne({email});
    if(finded_user){
        return NextResponse.json({message:"Өөө, бүртгэлтэй байна !!!"}, { status: 400 });
    }
    
    return await User.create(d)
    .then((user) => {
        return NextResponse.json({user}, { status: 200 });
      })
      .catch((err) => {

        let error={...err};
        error.statusCode=err.statusCode || 500;
        error.message=err.message || "Дотоод алдаа !!!"
        if(err.name=="ValidationError"){
            error=new ErrorHandler("Өөө, Талбар алдаатай !!!",400);
         }

         return NextResponse.json(
            {
              success: false,
              error,
              message: error.message,
              stack: error.stack,
            },
            { status: error.statusCode }
          );
      });
}