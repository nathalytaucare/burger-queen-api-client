import '../../style/main.scss';
import {deleteUsers, putUsers} from '../../Services/users'
import Modal from 'react-modal';
import { useState } from 'react';

import waiterGirl from '../../images/waiterGirl.svg'

function Employ(props){

    const deleteUsersFx = async (uid) =>{
        await deleteUsers(uid)
        setBoxModalIsOpen(false)
    }

    Modal.setAppElement('#root')

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [boxModalOpen, setBoxModalIsOpen] = useState(false)
    const [ editUser, setEditUser] = useState('')

    const updateUser = async(obj, uid) =>{
      await putUsers(obj, uid)
      setModalIsOpen(false)
    };
    

    const handleInputChange = (event) => {
      setEditUser({
          ...editUser,
          [event.target.name] : event.target.value
      })
    }


    // console.log(props._id);
    // console.log(props.admin);
    return (
        <section>
        <section className="CardEmploy" key={props._id}>
            <img src={waiterGirl} className="img" alt="persona random" />
            <section className="userWrapper">
                <h3>{props.email}</h3>
                <p>Cargo: Servicio</p>
            </section>
            <section className="editAndDelete">
                <i className="fas fa-edit" alt="Editar" onClick={() => setModalIsOpen(true)}></i>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                  className="Modal"
                >
                <i className="far fa-window-close" onClick={() => setModalIsOpen(false)}></i>
                <section className="productsInfo">
                <form className="form-modal">
                <div className="form-container">
                <p>Email:  <input
                  defaultValue={props.email}
                  data-testid="email"
                  id="input-email"
                  name="email"
                  type="email"
                  onChange={handleInputChange}
                  //placeholder={error.email ? 'Campo requerido' : 'Ingrese el email'}
                  // className={error.email ? 'input-modal error' : 'input-modal'}
                  /></p>
                  <p>Contraseña:  <input
                  defaultValue={props.password}
                  data-testid="password"
                  id="input-password"
                  name="password"
                  onChange={handleInputChange}
                  //placeholder={error.email ? 'Campo requerido' : 'Ingrese el email'}
                  // className={error.email ? 'input-modal error' : 'input-modal'}
                  /></p>
                  <p> Admin: 
                  <select id="input-admin" className="select-modal"
                  defaultValue={props.admin ? 'SI' : 'NO'}
                  name="admin"
                  onChange={handleInputChange}
                   // defaultValue={props.roles.admin ? 'SI' : 'NO'}
                   >
                    <option value="NO">NO</option>
                    <option value="SI">SI</option>
                  </select>
                  </p>
                    </div>
                  </form>
                    <button onClick={()=> {
                      updateUser(editUser,props._id)
                      }}>Guardar</button>
                  </section>
                </Modal>

                <i className="fas fa-trash-alt"
                onClick={e => setBoxModalIsOpen(true)}
                alt="Eliminar"></i>
                
                <Modal isOpen={boxModalOpen}
                onRequestClose={() => setBoxModalIsOpen(false)}
                className="Modal">
                  <i className="far fa-window-close" onClick={() => setBoxModalIsOpen(false)}></i>
                  <h3> ¿Segur@ que desea eliminar al usuario? </h3>
                  <p> Esta acción será irreversible</p>
                  <button className="btnDelete" onClick={() => {deleteUsersFx(props._id)}}> Eliminar </button>
                  <button className="cancel" onClick={() => setBoxModalIsOpen(false)} > Cancelar </button>
                </Modal>
            </section>
        </section>
        </section>
    )

}

export default Employ;

