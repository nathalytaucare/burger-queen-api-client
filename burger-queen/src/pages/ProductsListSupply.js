// import logo from '../images/burger-queen-logo.png';
import '../style/main.scss'
import ProductSupply from '../components/store/ProductSupply'
import { useEffect, useState } from 'react'
import { getProducts, postProducts} from '../Services/products';
import Modal from 'react-modal';

import ReactPaginate from 'react-paginate';

function ProductsListSupply() {
    const [products, setProducts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [ newProduct, setNewProduct] = useState({
      "name": "",
      "price": "",
      "image": "",
      "type": "burger"
    })
    Modal.setAppElement('#root')

    useEffect(()=> {
      let componentMounted = true;
      const getData = async () =>{
        let response = await getProducts(offset,5)
        let notPage = await getProducts(offset, 100)
        setPageCount(notPage.data.length);
        if(componentMounted) {
        setProducts(response.data)
      }
      }
      getData()
      return () => componentMounted = false;
    },[products, offset])

    const inputOnChange = (e) => {
      setNewProduct({
        ...newProduct,
        [e.target.name] : e.target.value
    })
    }

    const formProduct = async () => {
      await postProducts(newProduct)
      setModalIsOpen(false)
    }

    const handlePageClick = (e) => {
      const selectedPage = e.selected;
      setOffset(selectedPage + 1)
  };
    
    return (
        <>
            <header className="productSupplyHeader"> 
                <p>Lista de Productos</p>
                <p>Información </p>
            </header>
            <section className="productsListSupply">
                <button onClick={() => setModalIsOpen(true)}> + Agregar producto </button>

                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    className="Modal">
                  <i className="far fa-window-close" onClick={() => setModalIsOpen(false)}></i>
                  <section>
                  <form className="form-modal"  >
                    <p>Nombre:<input name="name" onChange={inputOnChange}/></p>
                    <p>Precio:<input name="price" onChange={inputOnChange}/></p>
                    <p>Imagen:<input name="image" onChange={inputOnChange} onClick={inputOnChange}/></p>
                    <p>Tipo:
                      <select name="type" onChange={inputOnChange}
                        defaultValue="burger"
                      >
                      <option value="drink">Bebidas</option>
                      <option value="burger">Hamburguesas</option>
                      <option value="sandwich">Sandwiches</option>
                      <option value="side dishes">Acompañantes</option>
                    </select></p>
                  </form>
                  <button onClick={formProduct}> Crear Producto</button>
                  </section>
                </Modal>

                <ProductSupply products={products} />
            </section>
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              pageCount={ Math.round(pageCount/5) + 1}
            />
            
        </>
    )}

export default ProductsListSupply;