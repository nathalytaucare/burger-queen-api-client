import {deleteOrders} from '../../Services/orders'
import Modal from 'react-modal';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {putOrders} from '../../Services/orders';

function StatusListTable(props) {
    
    const history = useHistory()
    
    Modal.setAppElement('#root')
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [boxModalOpen, setBoxModalIsOpen] = useState(false);
    const [statusModal, setStatusModal] = useState(false)
    const [order, setOrder] = useState();
    

    const deleteOrderFx = async(id) => {
        await deleteOrders(id)
        setBoxModalIsOpen(false)
    }


    const handleInputChange = (event) => {
        setOrder({
            ...order,
            [event.target.name] : event.target.value,
        }) 
      }
    
    // const arrProducts = [];
    // const handleProductChange = (event) =>{
        
    //     setProducts(
    //         arrProducts.concat(...products, 
    //             {
    //             [event.target.name] : event.target.value,
    //         })
    //    )
        
    //     return products;
    // }

      const updateOrder = (obj, idProduct) =>{
        putOrders(obj, idProduct)
        .then(()=> {
          setStatusModal(false)
          setModalIsOpen(false)
         })
         .catch(() => console.log('no se pudieron guardar los cambios'))
        };

    
    return (
        <section className="tableCard" >
            <section className="tableStatus">
                <section className="number">
                    <label ></label>
                </section>
                <p> {props.client} </p>
            </section>
            <section className="statusWrapper">
                <section className={props.status} 
                    onClick={()=> setStatusModal(true)}>
                    <h1> {props.status} </h1>
                </section>
                <Modal
                        isOpen={statusModal}
                        onRequestClose={() => setStatusModal(false)}
                        className="Modal"
                    >
                        <i className="far fa-window-close" 
                            onClick={() => setStatusModal(false)}></i>
                        <h3>¿Ya entregó su pedido?</h3>
                        <button onClick={()=>updateOrder({status:"delivered",dateProcessed: new Date()}, props.orderId)}>Sí</button>
                        <button onClick={() => setStatusModal(false)}>No</button>
                    </Modal>
                
                <button><i className={props.status==="pending" ? "fas fa-edit": "hide"} onClick={()=> setModalIsOpen(true)}></i></button>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                  className="Modal"
                >
                  <i className="far fa-window-close" name={props.id} onClick={
                    () => setModalIsOpen(false)}></i>
                            <table className="ordersTable">
                                <tbody>
                                    <tr>
                                        <th>Productos </th>
                                        <th>Cantidad </th>
                                    </tr>
                                    {props.products.map((product)=>
                                            <tr key={product.product._id}>
                                                <td> {product.product.name} </td>
                                                <td>{product.qty}</td>
                                            </tr>                           
                                        )}

                                </tbody>
                            </table>
                  <section className="ordersInfo">
                    <p>Nombre:  <input name="client" defaultValue={props.client} onChange={handleInputChange } ></input></p>
                    <p>Hora de Entrada de Orden: {`${new Date(props.dateEntry).getHours()} : ${new Date(props.dateEntry).getMinutes()}`}</p>
                    <p>Hora de Salida de Orden: {`${new Date(props.dateProcessed).getHours()} : ${new Date(props.dateProcessed).getMinutes()}`}</p>
                    <button onClick={()=> updateOrder(order, props.orderId)}>Guardar</button>
                  </section>
                </Modal>


                <button><i className={props.status==="pending" ? "fas fa-trash-alt": "hide"} name={props.orderId} onClick={() => setBoxModalIsOpen(true)} alt="btn"></i></button>
                
                <Modal isOpen={boxModalOpen}
                onRequestClose={() => setBoxModalIsOpen(false)}
                className="Modal">
                  <i className="far fa-window-close" onClick={() => setBoxModalIsOpen(false)}></i>
                  <h3> ¿Segur@ que desea eliminar la orden? </h3>
                  <p> Esta acción será irreversible</p>
                  <button className="btnDelete" onClick={()=> deleteOrderFx(props.orderId)}> Eliminar </button>
                  <button className="cancel" onClick={() => setBoxModalIsOpen(false)} > Cancelar </button>
                </Modal>
            </section>
        </section>
    );
}
  
export default StatusListTable;
