import {useEffect, useState} from "react"

export default function ProductManager(){
    let [products, setProducts] = useState([])
    const [form, setForm] = useState({name:"",description:"",price:"",quantity:""})

    useEffect(() => {
    async function loadProducts() {
        try {
            const res = await fetch("http://localhost:8000/products/");
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    }

    loadProducts();
}, []);

    return(
    <>
    <h1 className="heading">Product Manager</h1>
    <p>Connected to FastAPI at http://localhost:8000</p>
    {products.map((product) => (
        <div key={product.id}>
            <p>{product.name} - {product.description}</p>
            <p>${product.price} | qty: {product.quantity}</p>
        </div>
    ))}
    <form>
        <label for="name">Name : </label>
        <input
            id="name"
            name = "name"
            value = {form.name}
            onChange={(e) => setForm({...form, [e.target.name]:e.target.value})}
            placeholder = "Product Name"
        />
        <label for="description">Description : </label>
        <input
            id="description"
            name = "description"
            value = {form.description}
            onChange={(e) => setForm({...form, [e.target.name]:e.target.value})}
            placeholder = "Description"
        />
        <label for="price">Price : </label>
        <input
            id="price"
            name = "price"
            value = {form.price}
            onChange={(e) => setForm({...form, [e.target.name]:e.target.value})}
            placeholder = "Price"
        />
        <label for="quantity">Quantity : </label>
        <input
            id="quantity"
            name = "quantity"
            value = {form.quantity}
            onChange = {(e) => setForm({...form, [e.target.name]:e.target.value})}
            placeholder = "Quantity"
        />

    </form>
    </>
)
}
