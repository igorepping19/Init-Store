<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Conta - Init Store</title>
    <link rel="icon" type="image/x-icon" href="icon.png">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <div class="container">
            <div class="cabecalho">
                <h1>Init Store</h1>
                <nav class="menu">
                    <ul>
                        <a href="index.php">Início</a>
                        <a href="produtos.php">Produtos</a>
                        <select id="select-categorias" onchange="redirecionarCategoria(this.value)">
                            <option value="">Categorias</option>
                        </select>
                    </ul>
                </nav>
                <form action="" method="get" target="_blank">
                    <input type="text" name="q" placeholder="Buscar Produto..." required>
                </form>
                <nav class="carrinho">
                    <a href="carrinho.php">
                        <img src="carrinho.png" alt="Meu Carrinho" style="width: 30px; height: 30px;">
                    </a>
                </nav>
                <nav class="conta">
                    <a href="conta.php">
                        <img src="user.png" alt="Minha Conta" style="width: 30px; height: 30px;">
                    </a>
                </nav>
            </div>
        </div>
    </header>

    <main class="container page-content">
        <section class="account-section">
            <h2>Acesse sua conta ou Cadastre-se</h2>
            
            <div class="tabs-container">
                <button id="login-btn" class="tab-btn active" onclick="switchTab('login-tab')">Login</button>
                <button id="register-btn" class="tab-btn" onclick="switchTab('register-tab')">Cadastre-se</button>
            </div>
            
            <div id="status-message" class="message"></div>

            <!-- Formulário de LOGIN -->
            <div id="login-form-container" class="form-container" style="display: block;">
                <form id="login-form" onsubmit="event.preventDefault(); handleLogin();">
                    <label for="login-email">Email:</label>
                    <input type="email" id="login-email" name="email" required>

                    <label for="login-senha">Senha:</label>
                    <input type="password" id="login-senha" name="senha" required>

                    <button type="submit" id="login-submit-btn">Entrar</button>
                </form>
            </div>

            <!-- Formulário de CADASTRO -->
            <div id="register-form-container" class="form-container" style="display: none;">
                <form id="register-form" onsubmit="event.preventDefault(); handleRegister();">
                    <label for="register-nome">Nome:</label>
                    <input type="text" id="register-nome" name="nome" required>

                    <label for="register-email">Email:</label>
                    <input type="email" id="register-email" name="email" required>

                    <label for="register-senha">Senha:</label>
                    <input type="password" id="register-senha" name="senha" required>

                    <label for="register-confirma-senha">Confirmar Senha:</label>
                    <input type="password" id="register-confirma-senha" name="confirmaSenha" required>

                    <button type="submit" id="register-submit-btn">Cadastrar</button>
                </form>
            </div>

        </section>
    </main>
    
    <footer>
        <div class="container">
            <div class="rodape">
                <div class="contatos">
                    <h4>Entre em Contato</h4>
                    <p>Email: intstore@gmail.com</p>
                </div>
                <div class="direitos">
                    <p>&copy; 2024 Igor Epping. Todos os direitos reservados.</p>
                </div>
            </div>
        </div>
    </footer>
    
    <script src="teste.js"></script> <!-- Mantém o contador do carrinho -->
    <script src="conta.js"></script>
</body>
</html>
