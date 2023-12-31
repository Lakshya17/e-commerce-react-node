import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:3000/products', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('key'))}`
            }
        });
        result = await result.json();
        setProducts(result)
    }

    const deleteProduct = async (id) => {
        console.log(id)
        let result = await fetch(`http://localhost:3000/product/${id}`, {
          method: 'DELETE',
        headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('key'))}`
            }  
        })
        result = await result.json();
        if(result){
            alert('Record is deleted')
            getProducts();
        }
        console.log(result)
    }

    const searchHandle = async (e) => {
        console.log(e.target.value);
        let key = e.target.value;
        if(key){
        let result = await fetch(`http://localhost:3000/search/${key}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('key'))}`
            }
        });
        result = await result.json();
        if(result){
            setProducts(result)
        }
    }else{
        getProducts();
    }
    }

    return(
        <div className='productList'>
            <h1>Product List</h1>
            <input type="text" placeholder='Search Product' onChange={searchHandle} class="inputBox"/>
            <ul>
                <li>Serial No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) => 
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/"+item._id}>Update</Link>
                        </li>
                    </ul>
                )
                :
                <h1>No product matched!</h1>
            }
        </div>
    )
}

export default ProductList;