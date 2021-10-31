
import '../../style/main.scss'
import OrderToKitchenUnitary from './OrderToKitchenUnitary';

function OrdersListKitchen(props) {

  const orders = props.orders;
   // getProductId()
  // const getProductName = (id) =>{
  //   getProductId(id, localStorage.token)
  //   .then((res)=> console.log(res))
  // }

  ;

     return (
      <>
      { orders.map((order) => 
        // console.log(order.dateEntry)
        < OrderToKitchenUnitary 
          client={order.client}
          _id={order._id}
          dateEntry={new Date(order.dateEntry).getHours()+":"+new Date(order.dateEntry).getMinutes()+":"+new Date(order.dateEntry).getSeconds()} 
          status={order.status} 
          key={order._id}
          products={order.products.map((item) => 
            //console.log(item)
            <p key={order._id + item._id}> {item.qty}  {item.product.name}</p>
          )}
        
        />
    
      )} </>
    );
}
  
export default OrdersListKitchen;
