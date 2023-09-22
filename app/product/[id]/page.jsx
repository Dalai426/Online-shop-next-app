import { ProductDetails } from '@/components/products/ProductDetails'
import axios from 'axios'
import React from 'react'

const getProductDetails=async(id)=>{
    const {data} =await axios.get(`${process.env.API_URL}/api/products/${id}`)
    return data;
}
const page = async ({params}) => {
    const product=await getProductDetails(params.id);
  return (
    <ProductDetails product={product}/>
  )
}

export default page