import logoBurgerQueen from '../images/BQ-logo.svg';
import '../style/main.scss';
import Employees from '../components/employees/EmployesCard'
import { getUsers} from '../Services/users';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; 
import {postUser} from '../Services/users'


function AdminEmployees(){

    const history =  useHistory();

    const [ createUser, setCreateUser] = useState('')
    const [newUser, setNewUser] = useState(false);

    const [employees, setEmployees] = useState([]);
    // const [admin, setAdmin] = useState(true)
    const fxNexUser = () => newUser ? setNewUser(false) : setNewUser(true);
    
    const handleInputChange = (event) => {
        setCreateUser({
            ...createUser,
            [event.target.name] : event.target.value
        })
      }

    const objEmployee = {
        email: createUser.email,
        password:createUser.password,
        roles:{
            admin: createUser.cargo === "admin" ? true : false,
        }
    }

    const fxpostUser = async () =>{
        await postUser(objEmployee)
        fxNexUser()
    }


    useEffect(()=> { 
        let componentMounted = true;
        const getData = async () =>{
            let res = await getUsers()
            const data = res.data.filter(userType => !userType.roles.admin)
            if(componentMounted) {
            setEmployees(data)}
        }
        getData()
        return () => componentMounted = false;
           
    },[employees]); 


    return(
    <section className="CardEmployees">
        <img src={ logoBurgerQueen } className="logoBQ" alt="logo"></img>
        <section>
            <h1 className="name"> Admin </h1>
            <p className="addCard" onClick={() => fxNexUser()}> + Agregar Empleado</p>
        </section>
            <section className="newUserWrapper" hidden= {newUser ? false : true}>
                    <p>Email: <input 
                    type="email"
                    name="email"
                    onChange={handleInputChange}/></p>
                    <p>Password: <input 
                    name="password"
                    type="text"
                    onChange={handleInputChange}/></p>
                    <p> Cargo: 
                    <select name="cargo" defaultValue="servicio" onChange={handleInputChange}>
                        <option value="admin">Admin</option>
                        <option value="servicio">Servicio</option>
                    </select>
                  </p>
                    <button onClick={()=>{fxpostUser()}}> Crear Usuario</button>
                    <button  onClick={() => fxNexUser()} > Cancelar </button>
            </section>
            <Employees employees={employees} />
    </section>
)
};

export default AdminEmployees;
