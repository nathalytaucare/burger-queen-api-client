import React, { useState } from 'react';
import '../style/main.scss'
import { Link } from 'react-router-dom';

function Dropdown(props) {

  // useState para desplegar el menú dropdown con hover

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
      <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
            <li key={props.title1}>
              <Link
                className='dropdown-link'
                to={props.to1}
                onClick={() => setClick(false)}
              >
                {props.title1}
              </Link>
            </li>
            <li key={props.title2}>
              <Link
                className='dropdown-link'
                to={props.to2}
                onClick={() => setClick(false)}
              >
                {props.title2}
              </Link>
            </li>

      </ul>
    </>
  );
}

export default Dropdown;