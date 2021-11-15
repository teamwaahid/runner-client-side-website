import React, { useEffect, useState } from 'react';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [update, setUpdate] = useState(true);
    useEffect(() => {
        fetch('https://pacific-journey-60016.herokuapp.com/orders')
            .then(res => res.json())
            .then(data => setOrders(data));
    }, [update])

    function cancel(id) {
        const confirmation = window.confirm('Are you sure to Delete!!!')
        if (confirmation) {
            fetch(`https://pacific-journey-60016.herokuapp.com/delete/${id}`, {
                method: 'delete',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount === 1) {
                        const remainingOrder = orders.filter(order => order._id !== id)
                        setOrders(remainingOrder);
                    } else {
                        alert('Something went wrong!!!')
                    }
                });
        }
    }

    function handleConfirm(id) {
        const confirmation = window.confirm('Are you sure to Confirm!!!')
        if (confirmation) {
            fetch(`https://pacific-journey-60016.herokuapp.com/confirmation/${id}`, {
                method: 'put'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount === 1) {
                        setUpdate(!update)
                    } else {
                        alert('Already Confirmed!!!')
                    }
                });
        }
    }

    return (
        <div>
            <h1 className='text-center'>Orders</h1>
            <table className="table table-hover w-100">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Cancellation</th>
                        <th scope="col">Confirmation</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order) => {
                            const { _id, img, title, price, email, status } = order;
                            return (
                                <tr key={_id}>
                                    <td><img width='50px' src={img} alt='' /></td>
                                    <td><h6>{title?.slice(0, 10)}</h6></td>
                                    <td>{price}</td>
                                    <td>{email}</td>
                                    <td>{status}</td>
                                    <td><button
                                        onClick={() => cancel(_id)}
                                        className='btn btn-danger'>Cancel</button></td>
                                    <td><button
                                        onClick={() => handleConfirm(_id)}
                                        className='btn btn-success'>Confirm</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Order;