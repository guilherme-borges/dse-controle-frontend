import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';
import Menu from '../../components/Menu';
import { FiTrash2 } from 'react-icons/fi';

export default function UserRegister() {

    const [name, setName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);
    
    async function loadUsers() {
        const response = await api.get('/users');
        setUsers(response.data);
    }

    async function handleSignUp(e) {
        e.preventDefault();

        if (!name || !last_name || !email || !username || !password) {
            alert('Preencha todos os campos corretamente!');
        } else {
            try {
                const response = await api.post('users', { name, last_name, username, email, password });
                const newUsers = [...users, response.data];
                setUsers(newUsers);
                alert('Usuário cadastrado com sucesso!');
                
            } catch (error) {
                console.log(error);
                alert('Erro ao fazer se registrar tente novamente.');
            }
        }
    }

    function deleteUser() {
        alert('Deletado!!!');
    }

    return (

        <div className="users-container">
            <Menu />
            <main>
                <div className="d-flex flex-row-reverse">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
                        Novo Usuário
                    </button>
                </div>

                <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSignUp}>
                                    <label htmlFor="inputName" className="sr-only">Nome</label>
                                    <input type="text"
                                        id="inputName"
                                        className="form-control"
                                        placeholder="Nome"
                                        required
                                        autoFocus
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                    <label htmlFor="inputLastName" className="sr-only">Sobrenome</label>
                                    <input type="text"
                                        id="inputLastName"
                                        className="form-control"
                                        placeholder="Sobrenome"
                                        required
                                        value={last_name}
                                        onChange={e => setLastName(e.target.value)}
                                    />
                                    <label htmlFor="inputEmail" className="sr-only">E-mail</label>
                                    <input type="email"
                                        id="inputEmail"
                                        className="form-control"
                                        placeholder="E-mail"
                                        required
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <label htmlFor="inputUsername" className="sr-only">Nome de Usuário</label>
                                    <input type="text"
                                        id="inputUsername"
                                        className="form-control"
                                        placeholder="Nome de Usuário"
                                        required
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                    <label htmlFor="inputPassword" className="sr-only">Senha</label>
                                    <input type="password"
                                        id="inputPassword"
                                        className="form-control"
                                        placeholder="Senha"
                                        required
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                <button type="button" className="btn btn-primary" onClick={handleSignUp}>Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <table className="table table-hover mt-4">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Nome de Usuário</th>
                            <th scope="col">Criado</th>
                            <th scope="col">Editado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.username}</td>
                                <td>{user.created_at}</td>
                                <td>{user.updated_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}