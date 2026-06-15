import {useEffect, useState} from "react"

export default function ProductManager(){
    let [products, setProducts] = useState([])

    useEffect(()=>{
        async function loadProducts(){
        const res = await fetch("http://localhost:8000/products/")
        const data = await res.json()
        setProducts(data)
        }
        loadProducts();
    },[])

    return(
        <>
        {products.map((product)=>(
            <p key={product.id}>{product.name} - {product.description}</p>
        ))}
        </>
    )
}
