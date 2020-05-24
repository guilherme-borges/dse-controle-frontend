import React from 'react';
import '../../global.css';
import './styles.css';
import { Link } from 'react-router-dom';

export default function Menu() {
    return (

        <div className="menu-container">
            <h1>Logo</h1>
            <nav>
                <Link className="link" to="/dashboard">Home</Link>
                <Link className="link" to="/">Sair</Link>
            </nav>
        </div>
    );
}