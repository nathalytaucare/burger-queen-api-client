
import '../../style/main.scss'
import SupplyUnitaryItem from './SupplyUnitaryItem';

function ProductSupply(props) {

  const products = props.products;

  const listProductSupply = products.map((product) => 
  
    <SupplyUnitaryItem 
      productName={product.name} 
      productItemImg={product.image} 
      key={product._id} 
      type={product.type}
      price={product.price}
      dateEntry={product.dateEntry}
      id={product._id}
    />

  );
    return (
      <>{listProductSupply}</>
    );
}
  
export default ProductSupply;
