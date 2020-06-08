import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';
import Menu from '../../components/Menu';
import { FiTrash2 } from 'react-icons/fi';
import { FiEdit3 } from 'react-icons/fi';

export default function UserRegister() {

  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [created_at, setCreatedAt] = useState('');
  const [updated_at, setUpdatedAt] = useState('');
  const [users, setUsers] = useState([]);
  const token = "Bearer " + localStorage.getItem("Token");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const response = await api.get('/users', {
      headers: {
        Authorization: token
      }
    });
    setUsers(response.data);
  }

  async function addUser() {
    if (!name || !last_name || !email || !username || !password) {
      alert('Preencha todos os campos corretamente!');
    } else {
      try {
        const response = await api.post('users', { name, last_name, username, email, password }, {
          headers: {
            Authorization: token
          }
        });
        const newUsers = [...users, response.data];
        setUsers(newUsers);
        alert('Usuário cadastrado com sucesso!');
        clearFields();

      } catch (error) {
        console.log(error);
        alert('Erro ao cadastrar usuário. Tente novamente.');
      }
    }
  }

  async function updateUser(id) {
    try {
      await api.put(`users/${id}`, { name, last_name, username, email, password }, {
        headers: {
          Authorization: token
        }
      });
      loadUsers();
      alert('Usuário editado com sucesso!');
    } catch (error) {
      console.log(error);
      alert('Erro ao editar usuário. Tente novamente.');
    }
  }

  function saveUser(id) {
    if (id === 0) {
      addUser();
    } else {
      updateUser(id);
    }
  }

  async function deleteUser(id) {
    try {
      await api.delete(`/users/${id}`, {
        headers: {
          Authorization: token
        }
      });
      setUsers(users.filter(user => user.id !== id));
      alert('Usuário deletado com sucesso!');
    } catch (error) {
      console.log(error);
      alert('Erro ao tentar deletar registro');
    }
  }

  function clearFields() {
    setId(0);
    setName('');
    setLastName('');
    setEmail('');
    setUsername('');
    setPassword('');
    setCreatedAt('');
    setUpdatedAt('');
  }

  function loadFields(user) {
    setId(user.id);
    setName(user.name);
    setLastName(user.last_name);
    setEmail(user.email);
    setUsername(user.username);
    setPassword(user.password);
    setCreatedAt(user.created_at);
    setUpdatedAt(user.updated_at);
  }

  return (

    <div className="users-container">
      <Menu />
      <main>
        <div className="d-flex flex-row-reverse">
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop" onClick={() => clearFields()}>
            Novo Usuário
          </button>
        </div>

        <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Cadastro de Usuário</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
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
                <button type="button" className="btn btn-primary" onClick={() => saveUser(id)}>Salvar</button>
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
              <th scope="col">Deletar</th>
              <th scope="col">Editar</th>
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
                <td><button className="btn btn-danger" onClick={() => deleteUser(user.id)}><FiTrash2 /></button></td>
                <td>
                  <button type="button"
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#staticBackdrop"
                    onClick={() => loadFields(user)}
                  >
                    <FiEdit3 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}