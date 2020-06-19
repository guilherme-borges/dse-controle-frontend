import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';
import Menu from '../../components/Menu';
import { FiTrash2 } from 'react-icons/fi';
import { FiEdit3 } from 'react-icons/fi';

const SaleRegister = () => {

  const [id, setId] = useState(0);
  const [hours_sold, setHoursSold] = useState(0);
  const [value, setValue] = useState(0);
  const [additional_sales, setAdditionalSales] = useState(null);
  const [client_id, setClientId] = useState(0);
  const [project_id, setProjectId] = useState(0);
  const [created_at, setCreatedAt] = useState('');
  const [updated_at, setUpdatedAt] = useState('');
  const [sales, setSales] = useState([]);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const token = "Bearer " + localStorage.getItem("Token");

  useEffect(() => {
    loadSales();
  }, []);

  async function loadSales() {
    const response = await api.get('/sales', {
      headers: {
        Authorization: token
      }
    });
    setSales(response.data);
  }

  async function loadClients() {
    const response = await api.get('/clients', {
      headers: {
        Authorization: token
      }
    });
    setClients(response.data);
  }

  async function loadProjects() {
    const response = await api.get('/projects', {
      headers: {
        Authorization: token
      }
    });
    setProjects(response.data);
  }

  async function addSale() {
    if (client_id === 0 || project_id === 0 || !hours_sold === 0 || value === 0) {
      alert('Preencha todos os campos corretamente!');
    } else {
      try {
        const response = await api.post('sales', { additional_sales, client_id, hours_sold, project_id, value }, {
          headers: {
            Authorization: token
          }
        });
        const newSales = [...sales, response.data];
        setSales(newSales);
        alert('Venda cadastrada.');
        clearFields();

      } catch (error) {
        console.log(error);
        alert('Erro ao cadastrar venda. Tente novamente.');
      }
    }
  }

  function saveSale(id) {
    if (id === 0) {
      addSale();
    }
  }

  function clearFields() {
    loadClients();
    loadProjects();
    setId(0);
    setHoursSold(0);
    setAdditionalSales(null);
    setClientId(0);
    setProjectId(0);
    setCreatedAt('');
    setUpdatedAt('');
  }

  return (
    <div className="sale-container">
      <Menu />

      <main>
        <div className="d-flex flex-row-reverse">
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop"  onClick={() => clearFields()}>
            Novo
          </button>
        </div>

        <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Cadastro de Projetos</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                    <label htmlFor="selectClient">Cliente</label>
                    <select class="custom-select mb-3" id="selectClient"
                      onChange={e => setClientId(e.target.value)}
                    >
                      <option selected>Selecione o cliente</option>
                      {clients.map(clients => (
                        <option key={clients.id} 
                          value={clients.id}
                        >
                          {clients.name}
                        </option>
                      ))}
                    </select>
                      <label htmlFor="selectProject">Projeto {project_id}</label>
                    <select class="custom-select mb-3" id="selectProject" 
                      onChange={e => setProjectId(e.target.value)}
                    >
                      <option selected>Selecione o projeto</option>
                      {projects.map(project => (
                        <option key={project.id} 
                          value={project.id} 
                        >
                          {project.name}
                        </option>
                      ))}
                    </select>
                  <label htmlFor="inputHoursSold">Horas vendidas</label>
                  <input type="number"
                    id="inputHoursSold"
                    className="form-control"
                    placeholder="Horas vendidas"
                    required
                    value={hours_sold}
                    onChange={e => setHoursSold(e.target.value)}
                  />
                  <label htmlFor="inputValue" >Valor Vendido</label>
                  <input type="number"
                    id="inputValue"
                    className="form-control"
                    placeholder="Valor Vendido"
                    required
                    value={value}
                    onChange={e => setValue(e.target.value)}
                  />
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" className="btn btn-primary" onClick={() => saveSale(id)}>Salvar</button>
              </div>
            </div>
          </div>
        </div>

        <table className="table table-hover mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cliente</th>
              <th scope="col">Projeto</th>
              <th scope="col">Horas Vendidas</th>
              <th scope="col">Valor</th>
              <th scope="col">Criado</th>
              <th scope="col">Editado</th>
              <th scope="col">Deletar</th>
              <th scope="col">Editar</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => (
              <tr key={sale.id}>
                <th scope="row">{sale.id}</th>
                <td>{sale.client}</td>
                <td>{sale.project}</td>
                <td>{sale.hours_sold}</td>
                <td>{sale.value}</td>
                <td>{sale.created_at}</td>
                <td>{sale.updated_at}</td>
                <td>
                  <button type="button"
                    className="btn btn-danger"
                  >
                    <FiTrash2 />
                  </button>
                </td>
                <td>
                  <button type="button"
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#staticBackdrop"
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

export default SaleRegister;