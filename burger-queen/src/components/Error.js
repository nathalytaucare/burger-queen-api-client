import {useHistory} from 'react-router-dom';
import '../style/main.scss'

function Error(props) {

    // History para enviar del menu al login
    const history = useHistory();

    return (
        <section className="Error">
            <section className="errorLogIn">
                <section id="errorMessage"> MENSAJE </section>
                <section id="errorBody"> 
                    {props.message1} <br></br>{props.message2} <br></br>
                    <button onClick ={()=> history.go(-1)}>ACEPTAR</button>
                </section>
            </section>
        </section>
    );
}
  
export default Error;
