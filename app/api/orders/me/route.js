import connectMongoDB from "@/backend/config/dbConnect";
import Order from "@/backend/models/order";
import APIFilters from "@/backend/utils/APIFilter";
import { IsAuthenticated } from "@/backend/utils/IsAuthenticated";
import ErrorHandler from "@/backend/utils/errorHandler";
import { NextResponse } from "next/server";

export async function GET(request) {
    const resPerPage = 2;
    connectMongoDB();

    const ordersCount = await Order.countDocuments();
    const apiFilters = new APIFilters(Order.find(),request.nextUrl.searchParams).pagination(
      resPerPage
    );
   
  
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

    const orders = await apiFilters.query
      .find({ user: token._id })
      .populate("shippingInfo user");

    return NextResponse.json({
        ordersCount,
        resPerPage,
        orders,
      },{status:200});
}