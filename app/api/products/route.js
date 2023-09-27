import connectMongoDB from "@/backend/config/dbConnect";
import Product from "@/backend/models/product";
import APIFilters from "@/backend/utils/APIFilter";
import errorRet from "@/backend/utils/error";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request) {
  const d = await request.json();
  await connectMongoDB();
  return await Product.create(d)
  .then((product) => {
    return NextResponse.json(product, { status: 200 });
  })
  .catch((err)=>errorRet(err));
}
export async function GET(req,res) {
  await connectMongoDB();
  const resPerpage=3;
  const allproductCount=await Product.countDocuments();
  const apifilters= new APIFilters(Product.find(),req.nextUrl.searchParams).search().filter();

  let products = await apifilters.query;
  const filtered_product_count=products.length;
  apifilters.pagination(resPerpage);
  products=await apifilters.query.clone();

  return NextResponse.json({allproductCount, resPerpage, filtered_product_count, products});
}


