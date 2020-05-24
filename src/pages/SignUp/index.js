import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import '../../global.css';
import api from '../../services/api';


export default function SignUp() {

    const [name, setName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleSignUp(e) {
        e.preventDefault();

        if (!name || !last_name || !email || !username || !password) {
            alert('Preencha todos os campos corretamente!');
        } else {
            try {
                await api.post('users', { name, last_name, username, email, password });
                history.push('/');
            } catch (error) {
                alert('Erro ao fazer se registrar tente novamente.');
            }
        }
    }

    return (

        <div className="signin-container">
            <form className="form-signin" onSubmit={handleSignUp}>
                <h1 className="h3 mb-3 font-weight-normal">Registrar-se</h1>
                <label for="inputName" className="sr-only">Nome</label>
                <input type="text" 
                    id="inputName" 
                    className="form-control" 
                    placeholder="Nome" 
                    required 
                    autofocus 
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <label for="inputLastName" className="sr-only">Sobrenome</label>
                <input type="text" 
                    id="inputLastName" 
                    className="form-control" 
                    placeholder="Sobrenome" 
                    required 
                    autofocus 
                    value={last_name}
                    onChange={e => setLastName(e.target.value)}
                />
                <label for="inputEmail" className="sr-only">E-mail</label>
                <input type="email" 
                    id="inputEmail" 
                    className="form-control" 
                    placeholder="E-mail" 
                    required 
                    autofocus 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label for="inputUsername" className="sr-only">Nome de Usuário</label>
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
                <button className="btn btn-lg btn-primary btn-block mb-3" type="submit">Registrar</button>
            </form>
        </div>
    );
}