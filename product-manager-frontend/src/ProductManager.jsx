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
    
    </>
)
}
