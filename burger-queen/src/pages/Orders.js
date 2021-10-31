import logo from '../images/burger-queen-logo.png';
import '../style/main.scss'
import {Link} from 'react-router-dom';
import OrderList from '../components/clientOrders/OrderList'
import {useLocation , useHistory} from 'react-router-dom';
import { useState } from 'react';
import {postOrders} from '../Services/orders'


function Order(props) {

    const history = useHistory();
    const location = useLocation(); 
    const order = location.state // traemos la orden con useState desde Table Order
    const [orderProducts, setOrderProducts] = useState(order.products)

    // const orderProducts = order.products
    // console.log(orderProducts);
      // objeto para post cuando tengamos el API
      // const fecha = new Date()
      // console.log(fecha);

         let orderPost = {
           "userId": "M11",
           "client": order.client,
           "products": order.products,
           "note": order.note
         }

    // función para ingresar data a API
        const sendOrder = async (obj) =>{
            await postOrders(obj);
            history.push('/tableOrder')
     }

        //console.log(order);

        const deleteOrder = () => {
                setOrderProducts([]); 
                order.total = '' ;
                order.client='';
                order.note='';
        } ;
    
    //console.log(orderPost)

    return (
    <section className="Orden">
        <header className="ordersHeader">
            <section className="orderFlex">
                <section>
                <Link to="/tableOrder">
                    <button className="goToCard"> ← Carta </button>
                </Link>
                </section>
                <img src={logo} alt="logo"></img>
            </section>
            <section className="orderFlex">
                <h2>La Orden :  </h2>
                <button> {order.client} </button>
            </section>
            <section className="orderList">
                <table>
                    <thead>
                        <tr>
                            <th align="left" >Productos</th>
                            <th align="left" >Cantidad</th>
                            <th align="left" >Total del producto</th>
                        </tr>
                    </thead>
                    {orderProducts.map((product) => 
                    <OrderList selectedProduct={props.selectedProduct} food={product.name} qty={product.qty} price={product.totalPrice} key={product.name}/>
                    )}
                    <tbody>
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td>${order.total}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section className="orderFlex" >
                <h3> 
                “Nuestro mayor activo es el cliente! Trata a cada cliente como si fuera el único! ”
                </h3>
                <p> {order.note}</p>
            </section>
            <section className="orderFlex" >
            <button className="buttonOrder" onClick={() => sendOrder(orderPost)}> Enviar Pedido  </button>
            <button className="buttonOrder" onClick={() => deleteOrder()}> Anular pedido </button>
            </section>
        </header>
    </section>
    )}

export default Order;