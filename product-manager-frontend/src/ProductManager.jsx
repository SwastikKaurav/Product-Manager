import {useEffect, useState} from "react"

export default function ProductManager(){
    let [products, setProducts] = useState([])
    const [form, setForm] = useState({name:"",description:"",price:"",quantity:""})

    useEffect(() => {
        async function loadProducts() {
            try {
                const res = await fetch("http://localhost:8000/products/")
                const data = await res.json()
                setProducts(data)
            } catch (error) {
                console.log(error)
            }
        }

        loadProducts();
    }, []);

    async function handleSubmit(e){
        e.preventDefault()
        const res = await fetch("http://localhost:8000/products/create/",{
            method : "POST",
            headers : {"Content-Type": "application/json"},
            body : JSON.stringify({...form, price:parseFloat(form.price), quantity:parseInt(form.quantity)})
        })
        const data = await res.json()
        setProducts([...products, data])
        setForm({name:"",description:"",price:"",quantity:""})
    }

    return(
    <>
    <h1 className="heading">Product Manager</h1>
    <p>Connected to FastAPI at http://localhost:8000</p>
    <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name : </label>
        <input
            id="name"
            name = "name"
            value = {form.name}
            onChange={(e) => setForm({...form, [e.target.name]:e.target.value})}
            placeholder = "Product Name"
        />
        <label htmlFor="description">Description : </label>
        <input
            id="description"
            name = "description"
            value = {form.description}
            onChange={(e) => setForm({...form, [e.target.name]:e.target.value})}
            placeholder = "Description"
        />
        <label htmlFor="price">Price : </label>
        <input
            id="price"
            name = "price"
            value = {form.price}
            onChange={(e) => setForm({...form, [e.target.name]:e.target.value})}
            placeholder = "Price"
        />
        <label htmlFor="quantity">Quantity : </label>
        <input
            id="quantity"
            name = "quantity"
            value = {form.quantity}
            onChange = {(e) => setForm({...form, [e.target.name]:e.target.value})}
            placeholder = "Quantity"
        />
        <button type="Submit">Add Product</button>

    </form>
    
    {products.map((product) => (
        <div key={product.id}>
            <p>{product.name} - {product.description}</p>
            <p>${product.price} | qty: {product.quantity}</p>
        </div>
    ))} 
    </>
)
}
