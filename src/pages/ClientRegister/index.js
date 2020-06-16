import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';
import Menu from '../../components/Menu';
import { FiTrash2 } from 'react-icons/fi';
import { FiEdit3 } from 'react-icons/fi';

export default function ClientRegister() {

  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [created_at, setCreatedAt] = useState('');
  const [updated_at, setUpdatedAt] = useState('');
  const [clients, setClients] = useState([]);
  const token = "Bearer " + localStorage.getItem("Token");

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    const response = await api.get('/clients', {
      headers: {
        Authorization: token
      }
    });
    setClients(response.data);
  }

  async function addClient() {

    try {
      if (!name || !cnpj || !email || !phone) {
        alert('Preencha todos os campos corretamente!');
      } else {

        const response = await api.post('/clients', {
          name,
          cnpj,
          email,
          phone
        }, {
          headers: {
            Authorization: token
          }
        });

        const newClients = [...clients, response.data];
        setClients(newClients);
        alert('Cliente cadastrado.');
        clearFields();
      }
    } catch (error) {
      console.log(error);
      alert('Erro ao cadastrar cliente. Tente novamente.');
    }
  }

  async function updateClient(id) {
    try {
      await api.put(`clients/${id}`, {
        name,
        cnpj,
        email,
        phone
      }, {
        headers: {
          Authorization: token
        }
      });
      loadClients();
      alert('Cliente editado.');
    } catch (error) {
      console.log(error);
      alert('Erro ao editar cliente. Tente novamente.');
    }
  }

  function saveClient(id) {
    if (id === 0) {
      addClient();
    } else {
      updateClient(id);
    }
  }

  async function deleteClient(id) {
    try {
      await api.delete(`/clients/${id}`, {
        headers: {
          Authorization: token
        }
      });
      setClients(clients.filter(client => client.id !== id));
      alert('Cliente deletado.');
    } catch (error) {
      console.log(error);
      alert('Erro ao tentar deletar registro.');
    }
  }

  function clearFields() {
    setId(0);
    setName('');
    setCnpj('');
    setEmail('');
    setPhone('');
    setCreatedAt('');
    setUpdatedAt('');
  }

  function loadFields(client) {
    setId(client.id);
    setName(client.name);
    setCnpj(client.cnpj);
    setEmail(client.email);
    setPhone(client.phone);
    setCreatedAt(client.created_at);
    setUpdatedAt(client.updated_at);
  }

  return (
    <div className="client-container">
      <Menu />
      <main>
        <div className="d-flex flex-row-reverse">
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
            Novo
          </button>
        </div>

        <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Cadastro de Clientes</h5>
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
                  <label htmlFor="inputCnpj" className="sr-only">CNPJ</label>
                  <input type="text"
                    id="inputCnpj"
                    className="form-control"
                    placeholder="CNPJ"
                    required
                    autoFocus
                    value={cnpj}
                    onChange={e => setCnpj(e.target.value)}
                  />
                  <label htmlFor="inputEmail" className="sr-only">E-mail</label>
                  <input type="text"
                    id="inputEmail"
                    className="form-control"
                    placeholder="E-mail"
                    required
                    autoFocus
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <label htmlFor="inputPhone" className="sr-only">Telefone</label>
                  <input type="text"
                    id="inputPhone"
                    className="form-control"
                    placeholder="Telefone"
                    required
                    autoFocus
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" className="btn btn-primary" onClick={() => saveClient(id)}>Salvar</button>
              </div>
            </div>
          </div>
        </div>

        <table className="table table-hover mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">CNPJ</th>
              <th scope="col">E-mail</th>
              <th scope="col">Telefone</th>
              <th scope="col">Criado</th>
              <th scope="col">Editado</th>
              <th scope="col">Deletar</th>
              <th scope="col">Editar</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <th scope="row">{client.id}</th>
                <td>{client.name}</td>
                <td>{client.cnpj}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.created_at}</td>
                <td>{client.updated_at}</td>
                <td>
                  <button type="button"
                    className="btn btn-danger"
                    onClick={() => deleteClient(client.id)}
                  >
                    <FiTrash2 />
                  </button>
                </td>
                <td>
                  <button type="button"
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#staticBackdrop"
                    onClick={() => loadFields(client)}
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