import React, { useState } from 'react';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const auth = localStorage.getItem('user');
    const userId = JSON.parse(auth)._id;

    const addProduct = async () =>{


        if(!name || !price || !category || !company){
            setError(true)
            return false;
        }
        console.log(name, price, category, company)
        let result = await fetch('http://localhost:3000/add-product', {
            method: 'POST',
            body: JSON.stringify({name, price, category, userId, company}),
            headers: {
                'Content-Type': 'application/json',
                        authorization: `bearer ${JSON.parse(localStorage.getItem('key'))}`
            }    
        })
        result = await result.json();
        console.log(result)
    }
    return(
        <div className='product'>
            <h1>Add Product</h1>
            <input type='text' className='inputBox' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter product name'/>
            {error && !name && <span className='errorMsg'>Enter valid name</span>}
            <input type='text' className='inputBox' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter product price'/>
            {error && !price && <span className='errorMsg'>Enter valid price</span>}
            <input type='text' className='inputBox' value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Enter product Category' />
            {error && !category && <span className='errorMsg'>Enter valid category</span>}
            <input type='text' className='inputBox' value={company} onChange={(e) => setCompany(e.target.value)} placeholder='Enter product company' />
            {error && !company && <span className='errorMsg'>Enter valid company</span>}
            <button onClick={addProduct} type='button'>Add Product</button>
         </div>
    )
}

export default AddProduct;