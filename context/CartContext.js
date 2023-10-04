"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const CartContext=createContext();

export const CartProvider = ({children}) => {

 const[cart,setCart]=useState([]);
 const router=useRouter();

 useEffect(()=>{
    setCartToState();
 },[]);

 const setCartToState=()=>{
    setCart(
        localStorage.getItem('cart')?
        JSON.parse(localStorage.getItem('cart'))
        :[]
    )
 }
    const addItemToCart = async ({
        product,
        name,
        price,
        image,
        stock,
        seller,
        quantity = 1
    }) => {
        const item = {
            product,
            name,
            price,
            image,
            stock,
            seller,
            quantity
        };

        const isItemExist = cart?.cartItems?.find((i) => i.product === item.product);
        let newCartItems;
        if (isItemExist) {
            newCartItems = cart?.cartItems?.map((i) => i.product === isItemExist.product ? item : i);
        } else {
            newCartItems = [...(cart?.cartItems || []), item];
        }

        localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
        setCartToState();
    }


 const deleteItem=(id)=>{
    const newCartItems=cart?.cartItems?.filter((i)=>i.product!==id);
    localStorage.setItem("cart",JSON.stringify({cartItems:newCartItems}));
    setCartToState();
}

const saveOnCheckOut=({amount,tax, total})=>{
    const checkoutInfo={
        amount,
        tax,
        total
    }
    const newCart={...cart, checkoutInfo}
    localStorage.setItem("cart",JSON.stringify(newCart));
    setCartToState();
    router.push("/shipping")
}
 
 return <CartContext.Provider
    value={{
        cart,
        addItemToCart,
        deleteItem,
        saveOnCheckOut
    }}
 >
 {children}
 </CartContext.Provider>
}

export default CartContext;