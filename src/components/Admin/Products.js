import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner'

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://pacific-journey-60016.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products)
            })
    }, []);

    function handleDelete(id) {
        const confirmation = window.confirm('Are you sure to Delete!!!')
        if (confirmation) {
            fetch(`https://pacific-journey-60016.herokuapp.com/product/${id}`, {
                method: 'delete',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Deleted Successfully')
                        const remainingProduct = products.filter(product => product._id !== id)
                        setProducts(remainingProduct);
                    } else {
                        alert('Something went wrong!!!')
                    }
                });
        }
    }

    return (
        <div>
            <h1>All Products</h1>
            {products.length === 0 ? <h6 className="text-center"><Spinner animation="border" /></h6> :
                <div className='container'>
                    <div className='row'>
                        {
                            products.map(product => {
                                const { _id, img, title, description } = product;
                                return (
                                    <div className='col-sm-12 col-md-6 col-lg-4 my-3'>
                                        <div class="card" key={_id}>
                                            <img class="card-img-top" src={img} alt=' ' />
                                            <div class="card-body">
                                                <h5 class="card-title">{title}</h5>
                                                <p class="card-text">{description?.slice(0, 150)}</p>
                                                <h6>Price:{product.price}$</h6>
                                            </div>
                                            <button type="button" onClick={() => handleDelete(_id)} class="btn btn-danger">Delete</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default Products;