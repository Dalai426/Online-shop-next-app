import connectMongoDB from "@/backend/config/dbConnect";
import Product from "@/backend/models/product";
import { NextResponse } from "next/server";


export async function GET(request, params) {
  const productId = params;  
  try {
    await connectMongoDB();
    const product = await Product.findById(productId.params.id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


