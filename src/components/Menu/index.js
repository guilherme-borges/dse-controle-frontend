import React from 'react';
import '../../global.css';
import './styles.css';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (

    <div className="menu-container">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <Link className="navbar-brand" to="/dashboard">Navbar</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Cadastros</a>
              <div className="dropdown-menu" aria-labelledby="dropdown01">
                <Link className="dropdown-item" to="/users">Usuários</Link>
                <Link className="dropdown-item" to="/projects">Projetos</Link>
                <Link className="dropdown-item" to="/clients">Clientes</Link>
                <Link className="dropdown-item" to="/sales">Vendas</Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}