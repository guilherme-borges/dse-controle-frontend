import React from 'react';
import '../../global.css';
import './styles.css';
import { Link } from 'react-router-dom';

export default function Menu() {
    return (

        <div className="menu-container">
            <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <Link class="navbar-brand" to="/dashboard">Navbar</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <Link class="nav-link" to="/dashboard">Home</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Cadastros</a>
                            <div class="dropdown-menu" aria-labelledby="dropdown01">
                                <Link class="dropdown-item" href="#">Usuários</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}