import React, {useState, useEffect} from 'react'
require('dotenv').config();
const API = process.env.REACT_APP_API;
const API2 = 'http://localhost:5000'
//console.log(API)
//console.log(API2)
export const Users = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [users, setUsers] = useState([])

    const [update, setUpdate] = useState(false)
    const [id, setId] = useState('')
    const handleSubmit = async(e) => {
    if(!update) {
        e.preventDefault();
        const respuesta = await fetch(/*API+'/users'*/API2+'/users', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                pass
            })
        })
        console.log(respuesta)
        //console.log(data);
    }
    else {
        const respuesta = await fetch(API2+'/users/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            pass
        })
    })
        console.log(respuesta)
        setUpdate(false)
        setId('')
    }    
        await getUsers(); 
        setName('')
        setEmail('')
        setPass('')        
    }

    //Obtener todos los usuarios y mostralos en la tabla
    const getUsers = async() => {
        const respuesta = await fetch(API2+'/users')
        const data = await respuesta.json();
        setUsers(data)
    }

    //Actualizar un usuario
    const updateUser = async (id) =>{
        const respuesta = await fetch(API2+'/users/'+id)
        const data = await respuesta.json()   
        setUpdate(true)
        setId(id)


        setName(data.name)
        setEmail(data.email) 
        setPass(data.pass)
        
    }

    //Eliminar un usuario
    const deleteUser = async (id) =>{
        const resdelete = window.confirm('Estas seguro de querer eliminarlo?')
        if(resdelete) {
            const respuesta = await fetch(API2+'/users/'+id, {
                method: 'DELETE'
            });
            await respuesta.json();
            await getUsers();
        }        
    }

    //useEffect es para cargar los datos sin refrescar
    useEffect(() => {
        getUsers();
    }, [])


    
    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input 
                        type="text" 
                        onChange={e => setName(e.target.value)} 
                        value={name}
                        className="form-control"
                        placeholder="Name"
                        autoFocus>
                        </input>
                    </div>
                    <div className="form-group">
                        <input 
                        type="email" 
                        onChange={e => setEmail(e.target.value)} 
                        value={email}
                        className="form-control"
                        placeholder="Email">
                        </input>
                    </div>
                    <div className="form-group">
                        <input 
                        type="password" 
                        onChange={e => setPass(e.target.value)} 
                        value={pass}
                        className="form-control"
                        placeholder="Password">
                        </input>
                    </div>
                    <button className="btn btn-primary btn-block">
                        {update ? 'Edit' : 'Crear'}
                    </button>
                </form>
            </div>
            <div className="col-md-6">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Pass</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.pass}</td>
                                <td>
                                <button 
                                className="btn btn-secondary btn-sm btn-block"
                                onClick={() => updateUser(user._id)}>
                                    Edit
                                </button>
                                <button 
                                className="btn btn-danger btn-sm btn-block"
                                onClick={() => deleteUser(user._id)}>
                                    Delete
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}