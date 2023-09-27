import connectMongoDB from "@/backend/config/dbConnect";
import Address from "@/backend/models/address";
import { IsAuthenticated } from "@/backend/utils/IsAuthenticated";
import errorRet from "@/backend/utils/error";
import ErrorHandler from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";





export async function POST(request) {
    const user = await IsAuthenticated(request);
    if (!user) {
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
    const d = await request.json();
    d.user=user._id;
    console.log(d);
    
    await connectMongoDB();
    return Address.create(d)
    .then((address) => {
      return NextResponse.json({ address }, { status: 200 });
    })
    .catch((err) => {
      return errorRet(err);
    });

}

export async function GET(req) {
 
  const user = await IsAuthenticated(req);
    if (!user) {
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

    await connectMongoDB();
    const addresses=await Address.find({ user: user._id });

    return NextResponse.json({addresses});
}