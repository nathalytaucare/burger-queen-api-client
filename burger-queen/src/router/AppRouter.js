import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LogIn from '../pages/LogIn';
import Home from '../pages/Home';
import Error from '../components/Error';
import TableOrder from '../pages/TableOrder';
import Orders from '../pages/Orders';
import OrderStatus from '../pages/OrderStatus';
import AdminEmployees from '../pages/AdminEmployees'
import Kitchen from '../pages/Kitchen'
import ProductsListSupply from '../pages/ProductsListSupply'
import Navbar from '../components/Navbar';

function AppRouter() {

    return (
      <Router>
       < Navbar />
        <Switch>
          <Route  path='/home' component={Home} />
          <Route path="/tableOrder" component={TableOrder}></Route>
          <Route path="/tableSummary">
            <h1>TableSummary</h1>
          </Route>
          <Route path="/users" component={AdminEmployees}  />
          <Route path="/orders" component={Orders} />
          <Route path="/OrdersStatus" component={OrderStatus} />
          <Route path="/kitchen" component={Kitchen} />
          <Route  path="/products" component={ProductsListSupply} />
          <Route exact path="/">
            <LogIn/> 
          </Route>
          <Route path="*">
            <Error message1 ="Email o contraseña no es inválidos." message2 = "Inténtelo otra vez." />
          </Route>
        </Switch>
      </Router>
    );
}
 
export default AppRouter;