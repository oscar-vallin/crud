import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';

const Empleados = () => {
   
      const [nombre, getNombre] = useState('');
      const [apellido, getApellido] = useState('');
      const [cargo, getCargo] = useState('');
      const [empleadoLista, getEmpleadoLista] =useState([]);

      const [nuevoCargo, updateCargo] = useState("");
      
    useEffect(() => {
        axios.get("http://localhost:4000/api/get").then(response => {
            getEmpleadoLista(response.data);
          })
    },[]);


    const submitReview = () => {
        axios.post('http://localhost:4000/api/insert', {
          nombre: nombre,
          apellido: apellido,
          cargo: cargo
        })
        getEmpleadoLista([...empleadoLista, {nombre: nombre, apellido: apellido, cargo: cargo}])
        
      };

      const deleteReview = empleado => {
        axios.delete(`http://localhost:4000/api/delete/${empleado}`)
      }

      const updateReview = nombre  => {
        axios.put("http://localhost:4000/api/update/",{
          nombre: nombre,
          apellido: apellido,
          cargo: nuevoCargo
        });
        updateCargo("")
      }
    return(
        <Fragment>
            <div>
                <label>Nombre</label>
                <input type="text" name="movieName" onChange={e => getNombre(e.target.value)}/>
                <label>Apellido</label>
                <input type="text" name="revie" onChange={e => getApellido(e.target.value)}/>
                <label>Cargo</label>
                <input type="text" name="revie" onChange={e => getCargo(e.target.value)}/>

                <button onClick={submitReview}>Submit</button>
            </div>

            <h2 className="text-center my-5">List of Products</h2>
          
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Cargo</th>
                        <th scope="col">Accion</th>
                    </tr>
                </thead>
                <tbody>

                        {empleadoLista.map(empleado => (
                            <tr>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.apellido}</td>
                                <td>{empleado.cargo}</td>
                                <td>
                                    <button onClick={() => deleteReview(empleado.nombre)}>Eliminar</button>
                                    <input type="text" onChange={e => {updateCargo(e.target.value)}}></input>
                                    <button onClick={() => updateReview(empleado.nombre)}>Editar</button>
                                </td>
                            </tr>
                        ))
                        }
                </tbody>
            </table>
        </Fragment>
    );
}

export default Empleados;