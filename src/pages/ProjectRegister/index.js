import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';
import Menu from '../../components/Menu';
import { FiTrash2 } from 'react-icons/fi';
import { FiEdit3 } from 'react-icons/fi';

export default function ProjectRegister() {

  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [created_at, setCreatedAt] = useState('');
  const [updated_at, setUpdatedAt] = useState('');
  const [projects, setProjects] = useState([]);
  const token = "Bearer " + localStorage.getItem("Token");

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const response = await api.get('/projects', {
      headers: {
        Authorization: token
      }
    });
    setProjects(response.data);
  }

  async function addProject() {
    if (!name) {
      alert('Preencha todos os campos corretamente!');
    } else {
      try {
        const response = await api.post('projects', { name }, {
          headers: {
            Authorization: token
          }
        });
        const newProjects = [...projects, response.data];
        setProjects(newProjects);
        alert('Projeto cadastrado.');
        clearFields();

      } catch (error) {
        console.log(error);
        alert('Erro ao cadastrar projeto. Tente novamente.');
      }
    }
  }

  async function updateProject(id) {
    try {
      await api.put(`projects/${id}`, { name }, {
        headers: {
          Authorization: token
        }
      });
      loadProjects();
      alert('Projeto editado.');
    } catch (error) {
      console.log(error);
      alert('Erro ao editar projeto. Tente novamente.');
    }
  }

  function saveProject(id) {
    if (id === 0) {
      addProject();
    } else {
      updateProject(id);
    }
  }

  function clearFields() {
    setId(0);
    setName('');
    setCreatedAt('');
    setUpdatedAt('');
  }

  function loadFields(project) {
    setId(project.id);
    setName(project.name);
    setCreatedAt(project.created_at);
    setUpdatedAt(project.updated_at);
  }

  return (
    <div className="project-container" >
      <Menu />
      <main>
        <div className="d-flex flex-row-reverse">
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop" onClick={() => clearFields()}>
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
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" className="btn btn-primary" onClick={() => saveProject(id)}>Salvar</button>
              </div>
            </div>
          </div>
        </div>

        <table className="table table-hover mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Criado</th>
              <th scope="col">Editado</th>
              <th scope="col">Deletar</th>
              <th scope="col">Editar</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <th scope="row">{project.id}</th>
                <td>{project.name}</td>
                <td>{project.created_at}</td>
                <td>{project.updated_at}</td>
                <td><button className="btn btn-danger"><FiTrash2 /></button></td>
                <td>
                  <button type="button"
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#staticBackdrop"
                    onClick={() => loadFields(project)}
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