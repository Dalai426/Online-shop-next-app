import connectMongoDB from "@/backend/config/dbConnect";
import Product from "@/backend/models/product";
import { NextResponse } from "next/server";

export async function POST(request) {
  const d = await request.json();
  await connectMongoDB();
  await Product.create(d);
  return NextResponse.json(d, { status: 200 });
}

export async function GET() {
  await connectMongoDB();
  const products = await Product.find();
  return NextResponse.json(products);
}


