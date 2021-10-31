import logo from '../images/burger-queen-logo.png';
import '../style/main.scss'
import StatusListTable from '../components/clientOrders/StatusListTable'
import { useEffect, useState } from 'react';
import { getOrders } from '../Services/orders';
import ReactPaginate from 'react-paginate';

function OrderStatus() {

    const [orderStatus, setOrderStatus] = useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(()=> {   
        let componentMounted = true;
      const getData = async () =>{
        let response = await getOrders(offset, 5)
        if(componentMounted) {setOrderStatus(response.data)}
      }
      getData(offset)
      return () => componentMounted = false
      
    },[orderStatus,offset])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    return (
    <section className="OrderStatus">
        <section className="orderStatusHeader">
            <img src={logo} alt="logo"></img>
            <h1>PEDIDOS</h1>
            <section className="table">
            <h2>Mesas</h2>
            <h2>Estado del pedido</h2>
            </section>
            <section>
                {  orderStatus.map((order) => 

                    <StatusListTable dateEntry={order.dateEntry} dateProcessed={order.dateProcessed} products={order.products} status={order.status} client={order.client} orderId={order._id} key={order._id + order.client}/>

                )}
            </section>
        </section>
        <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              pageCount={3}
            />
    </section>
    )}

export default OrderStatus;