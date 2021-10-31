
import React, { useState } from 'react';
import '../../style/main.scss'

function UnitaryProduct(props){
    const { name , price, selectedProduct, qtty, checked } = props;
    const [isChecked, setIsChecked] = useState(checked || false);
    const [qty, setNumber] = useState(qtty || 1);
    

    const obj = {
       name : name,
       totalPrice: price*qty,
       qty: qty,
       checked: !isChecked,
       productId:props.id
    }

    //console.log(isChecked)
    const handleOnChange = () => {
      setIsChecked(!isChecked);
      if(!isChecked){
        selectedProduct(obj)
      } else {
        selectedProduct(obj)
      }
    };
     


    return (
        <article className="productItem">
            <div>
            <input 
                type="checkbox" 
                id={props.id}
                className="checkbox-round"
                defaultValue={isChecked}
                checked={isChecked}
                onChange={handleOnChange}>
            </input>
            <span className="prueba"> </span>
            <label htmlFor={props.id}> {props.name}</label>
            </div>
            <article className="counterWrap">
            <img alt="imgPhoto" src= {props.image}></img>
            <div className="counter">
                <button onClick={()=>setNumber(qty - 1 >= 0 ? qty - 1 : 0 )}> - </button> {qty} <button onClick={()=>setNumber(qty + 1 )}> + </button> 
            </div>
            </article>
            <p> $ {props.price*qty} </p>
        </article>
    )

}

export default UnitaryProduct;