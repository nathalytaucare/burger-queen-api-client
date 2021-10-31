import { createContext, useState } from 'react';

const CartContext = createContext();

const dataClient = {client: '',}

const CartProvider  = ({children}) =>{

  const [client, setClient] = useState(dataClient);

  const handleClientChange = (e) => {
    setClient({
          ...client,
          [e.target.name] : e.target.value
      })
      
    }
    console.log(client);

  const dataCart = {client, handleClientChange};
   return <CartContext.Provider value={dataCart}>{children}</CartContext.Provider>
}

export {CartProvider};
export default CartContext;