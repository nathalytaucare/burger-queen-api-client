import {Link, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProducts } from '../Services/products.js'
import {useHistory} from 'react-router-dom';
import MenuOrderProducts from '../components/menuOrders/MenuOrderProducts';
import ProductItem from '../components/menuOrders/ProductItem';
import ReactPaginate from 'react-paginate';



function TableOrder(props) {

  const history = useHistory(); 
  const [name , setName] = useState('') //

  const [products, setProducts] = useState([]);
  const [typeProduct, setTypeProduct] = useState('burger');
  const [cart , setCart] = useState([])

  const [messageName, setMessageName] = useState('')
  const [offset, setOffset] = useState(0);

  const clientName = (event) => {
    setName(event.target.value)
  }

  const selectedProduct = (product) => {

    const productList = products.map((el)=>{
      const elem = el
     
      if(el._id === product.productId){
        elem.qty = product.qty
        elem.checked = product.checked 

        // if(product.checked === false){
        //   delete elem.qty;
        //   delete elem.checked
        // }
      }
     
      return elem
    })

    setProducts(productList);
    // console.log(productList);
    setCart([
      ...cart, 
      product]);
    //console.log(product)
  };

  const productsPerPage = 7
  //const pageCount = Math.ceil(products.length / productsPerPage);

  useEffect( ()=> {
    // const getData = async() =>{
      // getProducts(localStorage.token)
        getProducts(offset, productsPerPage)
        .then((res)=>setProducts(res.data))
        // const newItems = res.data.filter(productType => productType.type.toUpperCase() === typeProduct.toUpperCase())
        // setProducts(res.data);
    // }
    // getData()
    
  },[offset])

  //const cardChecked = cart.filter(obj => obj.checked === true)
  // console.log(cardChecked);
  // console.log(cart);
  let priceProducts = cart.map(c => c.totalPrice);

  let total = priceProducts.reduce((a, b) => a + b, 0);

    const totalOrder = {
      "client": name ,
      "products": cart,
      "total": total,
    }


    const handlePageClick = (e) => {
      const selectedPage = e.selected;
      setOffset(selectedPage + 1)
  };


    // Math.ceil() delvuelve un número entero 

  return (
       <div className="tableOrder">
          <header className="tableOrderHeader">
            <nav> 
              <input className="selectTable" placeholder="Nombre del cliente ✍" name='client' onChange={clientName} onClick={() => setMessageName('')}>
              </input>
              <p className="errorName">{messageName}</p>
            </nav>
          </header>
          <MenuOrderProducts setTypeProduct={setTypeProduct}/>
          <section className="description">
            <h2>Elige el tipo de producto</h2>
            <p className="errorName">{messageName ? '⚠️ Llenar casillas' : '' }</p>
          </section>
          <ProductItem products={products.filter(productType => productType.type.toUpperCase() === typeProduct.toUpperCase())} selectedProduct={selectedProduct} total ={total} />

          <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              pageCount={4}
            />

            <section className="bottomOrderWrap">
            <button className="nextPage" onClick={()=> history.push('/orders', totalOrder )}> Siguiente</button>
          </section>


        </div>
        
    );
}
  
export default TableOrder;
