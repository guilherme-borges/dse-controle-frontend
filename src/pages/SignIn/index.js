import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
            <form onSubmit={handleSignIn}>
                <input type="text" 
                    placeholder="Digite o nome de usuário"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input type="text" 
                    placeholder="Digite a senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="button">Entrar</button>
            </form>
        </div>
    );
}