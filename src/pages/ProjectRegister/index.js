import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';
import Menu from '../../components/Menu';
import { FiTrash2 } from 'react-icons/fi';
import { FiEdit3 } from 'react-icons/fi';

export default function ProjectRegister() {

  const [id, setId] = useState(0);
  const [name, setName] = useState('');
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
  
  return(
    <div className="project-container" >
      <Menu />
      <main>
        <div className="d-flex flex-row-reverse">
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
              Novo Usuário
            </button>
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