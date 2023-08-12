import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () =>{
        console.log(params);
        let result = await fetch(`http://localhost:3000/product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('key'))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async () => {
        console.log(name, price, category, company)
        let result = await fetch(`http://localhost:3000/product/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({name, price, category, company}),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('key'))}`
                 
            }
        })
        result = await result.json();
        console.log(result)
        navigate('/')
    }

    return(
        <div className="product">
            <h1>Update Product</h1>
            <input type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} className="inputBox" />
            <input type='text' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)} className="inputBox" />
            <input type='text' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)} className="inputBox" />
            <input type='text' placeholder='Enter company' value={company} onChange={(e) => setCompany(e.target.value)} className="inputBox" />
            <button onClick={updateProduct} type='button'>Update Product</button> 
            
        </div>
    )
}

export default UpdateProduct;