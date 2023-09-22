import Product from "../models/product";
import connectMongoDB from "../config/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {

  await connectMongoDB();
 
}

