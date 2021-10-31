import React, { useState} from 'react';
import '../../style/main.scss';
import { deleteProduct , putProducts} from '../../Services/products';
import Modal from 'react-modal';


function SupplyUnitaryItem(props){
  
  const deleteProductFx = async (name) => {
    await deleteProduct(name);
    setBoxModalIsOpen(false)
  }

    Modal.setAppElement('#root')
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [boxIsOpen, setBoxModalIsOpen] = useState(false)
    const [ products, setProducts] = useState({
      "name": props.productName,
      "price": props.price,
      "type":  props.type,
      "image": props.productItemImg,
    })

    const handleInputChange = (event) => {
      setProducts({
          ...products,
          [event.target.name] : event.target.value
      })
    }

    const objProduct = {
      "name": products.name,
      "price": Number(products.price),
      "type":  products.type,
      "image": products.image,
  }

    const id = props.id

    const updateProducts = async(obj, idProduct) =>{
      await putProducts(obj, idProduct)
      setModalIsOpen(false)
      };
    
    
    // console.log(isChecked)
    return (
        <article className="productSupply">
        <div>
          <p> {props.productName}</p>
        </div>
        <article className="supplyWrap">
          <img alt="imgPhoto" src= {props.productItemImg}></img>
          <div className="counterSupply">
                <div className="buttonWrap">
                <i className="fas fa-edit" onClick={() => setModalIsOpen(true)}></i>
                <i className="fas fa-trash-alt" onClick={() => setBoxModalIsOpen(true) }></i>
                
                <Modal isOpen={boxIsOpen}
                onRequestClose={() => setBoxModalIsOpen(false)}
                className="Modal">
                  <i className="far fa-window-close" onClick={() => setBoxModalIsOpen(false)}></i>
                  <h3> ¿Segur@ que desea eliminar este producto? </h3>
                  <p> Esta acción será irreversible</p>
                  <button className="btnDelete" onClick={() => deleteProductFx(props.id)}  > Eliminar </button>
                  <button  className="cancel" onClick={() => setBoxModalIsOpen(false)} > Cancelar </button>
                </Modal>

                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                  className="Modal"
                  // overlayClassName="Overlay"
                >
                  <i className="far fa-window-close" name={props.id} onClick={
                    () => setModalIsOpen(false)}></i>
                  <section className="productsInfo">
                    <p>Nombre:  <input name="name" defaultValue={props.productName} onChange={handleInputChange} ></input></p>
                    <p>Precio:   <input name="price" defaultValue={props.price} onChange={handleInputChange}></input></p>
                    <p>Imagen:    <input name="image" defaultValue={props.productItemImg} onChange={handleInputChange}></input></p>
                    <p>Tipo:
                      <select name="type" onChange={handleInputChange }
                        defaultValue={props.type}
                      >
                      <option value="drink">Bebidas</option>
                      <option value="burger">Hamburguesas</option>
                      <option value="sandwich">Sandwiches</option>
                      <option value="side dishes">Acompañantes</option>
                    </select></p>
                    <button onClick={()=> {
                      updateProducts(objProduct,id)}
                    }>Guardar</button>
                  </section>
                </Modal>
                
            </div>
          </div>
        </article>
      </article>

    )

}

export default SupplyUnitaryItem;