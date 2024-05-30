'use client'
import { useState } from 'react';

async function getData() {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("cannot fetch products");
  } else {
    const data = await response.json();
    return data;
  }
}

async function getProductById(id) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) {
    throw new Error("cannot fetch product");
  } else {
    const data = await response.json();
    return data;
  }
}


export default function Home() {

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useState(() => {
    const fetchData = async () => {
      const data = await getData();
      setProducts(data);
    };
    fetchData();
  }, []);

  const handleClick = async (id) => {
    console.log('id :>> ', id);
    try {
      const product = await getProductById(id);
      setSelectedProduct(product);
    } catch (error) {
      console.error(error);
    }
  };


  
  return (
    <div>
    <div className="product-list">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-card"
          onClick={() => handleClick(product.id)}
        >
          <img src={product.image} alt={product.title} className="product-image" />
          <div className="product-details">
            <h2 className="product-title">{product.title}</h2>
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description}</p>
            <p className="product-category">Category: {product.category}</p>
            <p className="product-rating">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
          </div>
        </div>
      ))}
    </div>
    {selectedProduct && (
      <div className="product-modal">
        <h2>{selectedProduct.title}</h2>
        <img src={selectedProduct.image} alt={selectedProduct.title} />
        <p>{selectedProduct.description}</p>
        <p>Price: ${selectedProduct.price}</p>
        <p>Category: {selectedProduct.category}</p>
        <p>Rating: {selectedProduct.rating.rate} ({selectedProduct.rating.count} reviews)</p>
        <button onClick={() => setSelectedProduct(null)}>Close</button>
      </div>
    )}
  </div>
  );
}
