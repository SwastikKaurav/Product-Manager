import {useEffect, useState} from "react"
import "./ProductManager.css"

export default function ProductManager(){
    let [products, setProducts] = useState([])
    const [form, setForm] = useState({name:"",description:"",price:"",quantity:""})
    const [editId, setEditId] = useState(null)
    let [error, setError] = useState("")

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
        setError("")  

        if (!form.name || !form.description || !form.price || !form.quantity){
            setError("Please fill in all fields.")
            return
        }

        let res
        try {
            if (editId === null){
                res = await fetch("http://localhost:8000/products/create/", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({...form, price:parseFloat(form.price), quantity:parseInt(form.quantity)})
                })
            } else {
                res = await fetch(`http://localhost:8000/products/${editId}/`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({...form, price:parseFloat(form.price), quantity:parseInt(form.quantity)})
                })
            }

            const data = await res.json()
            if (res.ok){
                if (editId){
                    setProducts(products.map(p => p.id === editId ? data : p))
                } else {
                    setProducts([...products, data])
                }
                setEditId(null)
                setForm({name:"", description:"", price:"", quantity:""})
            } else {
                setError("Something went wrong. Please try again.")
            }
        } catch {
            setError("Cannot connect to server. Is it running?")
        }
    }

    async function handleDelete(id){
        const res = await fetch(`http://localhost:8000/products/delete/${id}`,{
            method : "DELETE"
        })
        if (res.ok){
            setProducts(products.filter(product=>(product.id !== id)))
        }
    }

    async function handleEdit(product){
        setEditId(product.id)
        setForm({...form,name:product.name, description:product.description, price:product.price, quantity:product.quantity})
    }

    let totalStock = products.reduce((total, product) => total + product.quantity, 0)
    let avgPrice = products.length > 0 
    ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)
    : 0
    return(
    <>
    <header>
        <h1 className="heading">Product Manager</h1>
        <p>Connected to FastAPI</p>
    </header>

    <div className="product-info">
        <div className="total-info-container">
            <h3 className="total-info">Total Products</h3>
            <p>{products.length}</p>
        </div>
        <div>
            <h3 className="total-info">Total Stock</h3>
            <p>
                {totalStock}
            </p>
        </div>
        <div>
            <h3 className="total-info">Avg. Price</h3>
            <p>
                ${avgPrice}
            </p>
        </div>
    </div>
    <main>
        <div className="input-collector-text">
            <p>+</p>
            <p>Add a product</p>
        </div>
        <form onSubmit={handleSubmit}>

            <div className="input-collector">
    
                <div className="input-label">
                    <label htmlFor="name">Name : </label>
                    <input
                        id="name"
                        name = "name"
                        value = {form.name}
                        onChange={(e) => setForm({...form, [e.target.name]:e.target.value})}
                        placeholder = "Product Name"
                    />
                </div>
                
                <div className="input-label">
                    <label htmlFor="description">Description : </label>
                    <input
                        id="description"
                        name = "description"
                        value = {form.description}
                        onChange={(e) => setForm({...form, [e.target.name]:e.target.value})}
                        placeholder = "Description"
                    />
                </div>

                <div className="input-label">
                    <label htmlFor="price">Price : </label>
                    <input
                        id="price"
                        name = "price"
                        value = {form.price}
                        onChange={(e) => setForm({...form, [e.target.name]:e.target.value})}
                        placeholder = "Price"
                    />
                </div>

                <div className="input-label">
                    <label htmlFor="quantity">Quantity : </label>
                    <input
                        id="quantity"
                        name = "quantity"
                        value = {form.quantity}
                        onChange = {(e) => setForm({...form, [e.target.name]:e.target.value})}
                        placeholder = "Quantity"
                    />
                </div>
            </div>

            {error && <p className="error-message">{error}</p>}
            <button type="Submit" className="form-button">{editId? "Update Product":"Add Product"}</button>

        </form>
    </main>
    
    <div className="product-list">
        <div>
            <p className="product-text">Products</p>
            <p>{products.length} items</p>
        </div>
        <div className="product-container">
            {products.map((product) => (
                <div key={product.id} className="product">
                    <div className="product-icon">{product.name[0]}</div>
                    <div className="product-details">
                        <p className="product-name">{product.name}</p>
                        <p className="product-description">{product.description}</p>
                        <div className="product-badges">
                            <p className="product-price">${product.price}</p>
                            <p className="product-quantity">qty: {product.quantity}</p>
                        </div>
                    </div>
                    <div className="product-actions">
                        <button onClick={() => handleEdit(product)} className="product-edit">Edit</button>
                        <button onClick={() => handleDelete(product.id)} className="product-delete">Delete</button>
                    </div>
                </div>
            ))} 
        </div>
    </div>
    </>
)
}
