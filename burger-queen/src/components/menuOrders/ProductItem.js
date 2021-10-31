 import React, { useState, useEffect } from 'react';
 import '../../style/main.scss'
import UnitaryProduct from './unitaryProduct';

function ProductItem(props) {

  const products = props.products;

  // map de los unitaryproduct
  return (
    <>{products.map((product) => 
      <UnitaryProduct 
        selectedProduct={props.selectedProduct} 
        name={product.name}
        price={product.price} 
        id={product._id} 
        image={product.image} 
        key={product._id}
        qtty={product.qty}
        checked={product.checked}
      />
    )}
    </>
  );
}
  
export default ProductItem;

