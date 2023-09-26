import connectMongoDB from "@/backend/config/dbConnect";
import Address from "@/backend/models/address";
import ErrorHandler from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";




export async function POST(request) {
    const d = await request.json();
    await connectMongoDB();

    return Address.create(d)
    .then((address) => {
      return NextResponse.json({ address }, { status: 200 });
    })
    .catch((err) => {

        let error={...err};
        error.statusCode=err.statusCode || 500;
        error.message=err.message || "Дотоод алдаа !!!"

     if(err.name=="ValidationError"){
        const message=Object.values(err.errors).map((value)=>value.message);
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

export async function GET(req) {
    await connectMongoDB();
    const addresses=await Address.find();

    return NextResponse.json({addresses});
  }