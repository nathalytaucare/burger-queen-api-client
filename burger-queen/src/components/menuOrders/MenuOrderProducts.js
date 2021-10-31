
import '../../style/main.scss'
import sandwich from '../../images/sandwichMenu.svg';
import hamburger from '../../images/ordersButtonHome.svg';
import aside from '../../images/AcompañantesMenu.svg';
import drinks from '../../images/bebidas.svg'

// Imagenes a Color
import sandwichColor from '../../images/sandwichMenuColor.svg';
import hamburgerColor from '../../images/hamburguesaColor.svg';
import asideColor from '../../images/AcompañantesMenuColor.svg';
import drinksColor from '../../images/bebidasColor.svg';



function MenuOrderProducts(props) {
  // const [btns, setBtns] = useState([]);
  // const [colorImage, setColorImage] = useState('');


  // fx para pasar de hover a click
  //const clickColor = (e, imageColor, imageNotColor) =>{
  // e.getAttribute('src') ===  imageNotColor ?  e.setAttribute( 'src', imageColor) : e.setAttribute( 'src', imageNotColor)
  //   if (colorImage !== e.getAttribute('alt')) {
  //     e.getAttribute('src') !== imageColor ? e.setAttribute( 'src', imageColor) : e.setAttribute( 'src', imageNotColor) 
  //  } else {
  //     console.log('no se harán cambios');
  //  }
  // }

  return (
    <nav className="menu">

      <button><img className="menuImg" alt="sandwich" src={sandwich}
      onMouseEnter={(e) => {e.target.setAttribute( 'src', sandwichColor)}}
      onMouseLeave={(e) => {e.target.setAttribute( 'src', sandwich)}}
      onClick={() => {props.setTypeProduct("sandwich")}}   // función onclick para agregar tipo de producto
      /></button>

      <button><img className="menuImg" alt="hbmn" src={hamburger}
      onMouseEnter={(e) => {e.target.setAttribute( 'src',hamburgerColor)}}
      onMouseLeave={(e) => {e.target.setAttribute( 'src', hamburger)}}
      onClick={() => props.setTypeProduct("burger")}
      /></button>

      <button><img className="menuImg" alt="aside" src={aside}
      onMouseEnter={(e) => {e.target.setAttribute( 'src', asideColor)}}
      onMouseLeave={(e) => {e.target.setAttribute( 'src', aside)}}
      onClick={() => props.setTypeProduct("side dishes")}  
      /></button>
 
      <button>
      <img className="menuImg" alt="drinks"  src={drinks}
      onMouseEnter={(e) => {e.target.setAttribute( 'src', drinksColor)}}
      onMouseLeave={(e) => {e.target.setAttribute( 'src', drinks)}}
      onClick={() => props.setTypeProduct("drink")}  
      /></button>

    </nav>
);
}
  
export default MenuOrderProducts;