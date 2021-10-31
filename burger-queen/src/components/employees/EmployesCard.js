import Employ from "./Employes";

// PENDIENTE FUNCIONALIDAD

function Employees (props) {
    const employees = props.employees;
    return (
    employees.map((employee) => 
    <Employ
    key={employee._id}
    photoEmploy={employee.photoEmploy}
    _id={employee._id}
    email={employee.email}
    password = {employee.password}
    admin= {employee.roles.admin}
    />))
}
  
export default Employees;