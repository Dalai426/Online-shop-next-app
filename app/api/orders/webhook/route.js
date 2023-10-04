
import connectMongoDB from "@/backend/config/dbConnect";
import Order from "@/backend/models/order";
import { IsAuthenticated } from "@/backend/utils/IsAuthenticated";
import errorRet from "@/backend/utils/error";
import ErrorHandler from "@/backend/utils/errorHandler";
import { NextResponse } from "next/server";

export async function POST(request) {

    const body = await request.json();
    await connectMongoDB();
    const token = await IsAuthenticated(request);
    if (!token) {
        let error = new ErrorHandler("Өөө, Эхлээд нэвтрэнэ үү !!!", 401);
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

    let orderItems = [];
    body?.items?.forEach(async (item) => {
        orderItems.push({
            product: item._id,
            name: item.name,
            price: (item.price * item.quantity),
            quantity: item.quantity,
            image: item.image,
        });
    });
    const paymentInfo = {
        status: "Processing",
    };

    const orderData = {
        user: token._id,
        shippingInfo: body?.shippingInfo,
        paymentInfo,
        orderItems,
    };

    try{
        const order = await Order.create(orderData);
        return NextResponse.json({ success: true }, { status: 200 });
    }catch(err){
        return errorRet(err);
    }
}