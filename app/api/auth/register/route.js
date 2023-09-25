import connectMongoDB from "@/backend/config/dbConnect";
import User from "@/backend/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    console.log("hi");
    const d = await request.json();
    await connectMongoDB();

    const email=d.email;
    const finded_user=await User.findOne({email});
    if(finded_user){
        return NextResponse.json({message:"Өөө, email бүртгэлтэй байна !!!"}, { status: 400 });
    }
    
    try{
        const user=await User.create(d);
        return NextResponse.json({user}, { status: 200 });
    }catch(error){
        return NextResponse.json(error, { status: 400 });
    }
}