import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import '../../global.css';
import api from '../../services/api';


export default function SignIn() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleSignIn(e) {
        e.preventDefault();

        if (!username || !password) {
            alert('Preencha todos os campos corretamente!');
        } else {
            try {
                await api.post('sessions', { username, password });
                history.push('/dashboard');
            } catch (error) {
                alert('Erro ao fazer login tente novamente.');
            }
        }
    }

    return (

        <div className="signin-container">
            <form className="form-signin" onSubmit={handleSignIn}>
                <h1 className="h3 mb-3 font-weight-normal">Por favor faça login</h1>
                <label for="inputUsername" className="sr-only">Nome de usuário</label>
                <input type="text" 
                    id="inputUsername" 
                    className="form-control" 
                    placeholder="Nome de Usuário" 
                    required 
                    autofocus 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <label for="inputPassword" className="sr-only">Senha</label>
                <input type="password" 
                    id="inputPassword" 
                    className="form-control" 
                    placeholder="Senha" 
                    required 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="btn btn-lg btn-primary btn-block mb-3" type="submit">Entrar</button>
                <Link to="/signup">Não tem uma conta? Registre-se</Link>
            </form>
        </div>
    );
}