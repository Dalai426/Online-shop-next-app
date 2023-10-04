import React from 'react'
import OrderItem from './OrderItem';

const ListOrders = () => {
    return (
        <>
            <h3 className="text-xl font-semibold mb-5">Your Orders</h3>
            <OrderItem />
        </>
    );
}

export default ListOrders