import connectMongoDB from "@/backend/config/dbConnect";
import Address from "@/backend/models/address";
import errorRet from "@/backend/utils/error";
import ErrorHandler from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req,params) {

    const add = params; 
    await connectMongoDB();
    const address = await Address.findById(add.params.id).
    catch((err)=>{});

    
    if (!address) {
        const error=new ErrorHandler("Өөө, Хаяг олдсонгүй !!!");
        return  NextResponse.json({
            success: false,
            error,
            message: error.message,
            stack: error.stack,
        },{status: error.statusCode });
    }
    return NextResponse.json({
        address,
     },{status:200});
}

export async function PUT(req,params) {

    const add = params; 
    await connectMongoDB();
    const body= await req.json();

    let address = await Address.findById(add.params.id).
    catch((err)=>{});

    if (!address) {
        const error=new ErrorHandler("Өөө, Хаяг олдсонгүй !!!");
        return  NextResponse.json({
            success: false,
            error,
            message: error.message,
            stack: error.stack,
        },{status: error.statusCode });
    }

    address=await Address.findOneAndUpdate({ _id: add.params.id}, body,{ new: true })
    .catch((err)=>errorRet(err));
    
    return NextResponse.json({address},{status:200});
}

export async function DELETE(req,params) {

    const add = params; 
    await connectMongoDB();

    let address = await Address.findById(add.params.id).
    catch((err)=>{});

    if (!address) {
        const error=new ErrorHandler("Өөө, Хаяг олдсонгүй !!!");
        return  NextResponse.json({
            success: false,
            error,
            message: error.message,
            stack: error.stack,
        },{status: error.statusCode });
    }

    return await Address.deleteOne({ _id: add.params.id})
    .then((rs)=>{
        return NextResponse.json({
            success: true,},{status:200});
    })
    .catch((err)=>errorRet(err));

}