// URL da API de Usuários. Use a mesma porta do seu servidor PHP.
const API_USUARIOS_URL = 'api/api_usuarios.php';

// Chave para armazenar o token de autenticação ou ID do usuário no localStorage
const AUTH_KEY = 'init_store_user_auth';

// ----------------------------------------------------
// FUNÇÕES DE INTERFACE (UI)
// ----------------------------------------------------

/**
 * Exibe uma mensagem de status para o usuário, limpando após 3 segundos.
 * @param {string} message - A mensagem a ser exibida.
 * @param {string} type - O tipo de mensagem ('sucesso' ou 'erro').
 */
function showStatusMessage(message, type) {
    const statusDiv = document.getElementById('status-message');
    statusDiv.textContent = message;
    statusDiv.className = `message ${type}`;

    setTimeout(() => {
        statusDiv.textContent = '';
        statusDiv.className = 'message';
    }, 3000);
}

/**
 * Troca a aba ativa entre "Login" e "Cadastro".
 * @param {string} tabId - O ID da aba a ser ativada ('login-tab' ou 'register-tab').
 */
function switchTab(tabId) {
    // Esconde todos os formulários e desativa todos os botões
    document.getElementById('login-form-container').style.display = 'none';
    document.getElementById('register-form-container').style.display = 'none';
    document.getElementById('login-btn').classList.remove('active');
    document.getElementById('register-btn').classList.remove('active');

    // Mostra o formulário correspondente e ativa o botão
    if (tabId === 'login-tab') {
        document.getElementById('login-form-container').style.display = 'block';
        document.getElementById('login-btn').classList.add('active');
    } else if (tabId === 'register-tab') {
        document.getElementById('register-form-container').style.display = 'block';
        document.getElementById('register-btn').classList.add('active');
    }
}

// ----------------------------------------------------
// FUNÇÕES DE COMUNICAÇÃO COM A API (BACK-END)
// ----------------------------------------------------

/**
 * Envia dados para a API para realizar o Login.
 */
async function handleLogin() {
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    if (!email || !senha) {
        showStatusMessage('Por favor, preencha todos os campos.', 'erro');
        return;
    }

    try {
        const response = await fetch(API_USUARIOS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                action: 'login', // Ação esperada pelo api_usuarios.php
                email: email, 
                senha: senha 
            })
        });

        const data = await response.json();

        if (response.ok && data.status === 'sucesso') {
            // Sucesso no Login
            showStatusMessage(`Bem-vindo, ${data.usuario.nome}!`, 'sucesso');
            
            // Armazena o token de autenticação (ou ID)
            localStorage.setItem(AUTH_KEY, JSON.stringify(data));
            
            // Redireciona para a página principal ou para o checkout
            setTimeout(() => {
                window.location.href = 'index.php'; 
            }, 1000);

        } else {
            // Erro na API (e.g., senha incorreta, email não encontrado)
            showStatusMessage(data.mensagem || 'Erro ao fazer login.', 'erro');
        }

    } catch (error) {
        console.error('Erro de rede:', error);
        showStatusMessage('Erro de comunicação com o servidor.', 'erro');
    }
}

/**
 * Envia dados para a API para realizar o Cadastro de um novo usuário.
 */
async function handleRegister() {
    const nome = document.getElementById('register-nome').value;
    const email = document.getElementById('register-email').value;
    const senha = document.getElementById('register-senha').value;
    const confirmaSenha = document.getElementById('register-confirma-senha').value;

    if (!nome || !email || !senha || !confirmaSenha) {
        showStatusMessage('Por favor, preencha todos os campos.', 'erro');
        return;
    }

    if (senha !== confirmaSenha) {
        showStatusMessage('As senhas não coincidem.', 'erro');
        return;
    }
    
    // Opcional: validação de formato de email mais robusta
    if (!/\S+@\S+\.\S+/.test(email)) {
        showStatusMessage('Formato de e-mail inválido.', 'erro');
        return;
    }

    try {
        const response = await fetch(API_USUARIOS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                action: 'register', // Ação esperada pelo api_usuarios.php
                nome: nome,
                email: email, 
                senha: senha 
            })
        });

        const data = await response.json();

        if (response.ok && data.status === 'sucesso') {
            // Sucesso no Cadastro
            showStatusMessage(data.mensagem, 'sucesso');
            
            // Opcional: troca para a aba de login após o cadastro
            setTimeout(() => {
                switchTab('login-tab');
                document.getElementById('login-email').value = email; // Preenche o email automaticamente
            }, 1000);

        } else {
            // Erro na API (e.g., email já cadastrado)
            showStatusMessage(data.mensagem || 'Erro ao realizar cadastro.', 'erro');
        }

    } catch (error) {
        console.error('Erro de rede:', error);
        showStatusMessage('Erro de comunicação com o servidor.', 'erro');
    }
}

/**
 * Função para sair da conta (limpar o localStorage e redirecionar).
 */
function logout() {
    localStorage.removeItem(AUTH_KEY);
    // Adicione aqui qualquer outra limpeza de sessão necessária
    showStatusMessage('Sessão encerrada com sucesso.', 'sucesso');
    setTimeout(() => {
        window.location.href = 'index.php'; 
    }, 1000);
}

// ----------------------------------------------------
// INICIALIZAÇÃO E LISTENERS
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Configura os ouvintes de eventos para os botões de Login e Cadastro
    const loginButton = document.getElementById('login-submit-btn');
    if (loginButton) {
        loginButton.addEventListener('click', handleLogin);
    }
    
    const registerButton = document.getElementById('register-submit-btn');
    if (registerButton) {
        registerButton.addEventListener('click', handleRegister);
    }

    // Inicializa a página mostrando a aba de Login por padrão
    switchTab('login-tab');

    // Expõe a função logout globalmente para ser chamada por um botão (se existir)
    window.logout = logout;
});