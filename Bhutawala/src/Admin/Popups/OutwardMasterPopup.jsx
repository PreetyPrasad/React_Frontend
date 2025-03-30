import React, { useState } from 'react';

export default function OutwardMasterPopup({ setOutwardProducts, showPopup, setShowPopup }) {
  const [product, setProduct] = useState({ ProductName: "", Quantity: "", Rate: "" });

  const addProduct = () => {
    if (!product.ProductName || !product.Quantity || !product.Rate) {
      alert("All fields are required!");
      return;
    }

    setOutwardProducts(prev => [...prev, { ...product, Total: product.Quantity * product.Rate }]);
    setShowPopup(false);
  };

  return showPopup ? (
    <div className="popup">
      <h4>Add Product</h4>
      <input type="text" placeholder="Product Name" onChange={(e) => setProduct({ ...product, ProductName: e.target.value })} />
      <input type="number" placeholder="Quantity" onChange={(e) => setProduct({ ...product, Quantity: e.target.value })} />
      <input type="number" placeholder="Rate" onChange={(e) => setProduct({ ...product, Rate: e.target.value })} />
      <button onClick={addProduct}>Add</button>
      <button onClick={() => setShowPopup(false)}>Cancel</button>
    </div>
  ) : null;
}
