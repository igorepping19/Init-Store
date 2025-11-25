<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Conta - Init Store</title>
    <link rel="stylesheet" href="/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
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
                        <a href="famosospagina.php">Mais Vendidos</a>
                    </ul>
                </nav>
                <form action="buscar.php" method="get">
                    <input type="text" name="q" placeholder="Buscar Produto..." required>
                </form>
                <nav class="carrinho">
                    <a href="carrinho.php">
                        <img src="/img/carrinho.png" alt="Carrinho">
                        <span id="contador-carrinho" class="badge">0</span>
                    </a>
                </nav>
                <nav class="conta">
                    <a href="conta.php">
                        <img src="/img/user.png" alt="Minha Conta">
                    </a>
                </nav>
            </div>
        </div>
    </header>

    <main class="container">
        <section class="secao-titulo">
            <h2>Minha Conta</h2>
            <p>Faça login ou crie sua conta para começar a comprar com os melhores preços!</p>
        </section>

        <div class="toggle-buttons">
            <button class="toggle-btn active" onclick="mostrarLogin()">Login</button>
            <button class="toggle-btn" onclick="mostrarCadastro()">Cadastre-se</button>
        </div>

        <div class="form-container">
            <!-- LOGIN -->
            <div id="login-form" class="form-box active">
                <h3>Bem-vindo de volta!</h3>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="login-email" placeholder="seu@email.com" required>
                </div>
                <div class="form-group">
                    <label>Senha</label>
                    <input type="password" id="login-senha" placeholder="••••••••" required>
                </div>
                <button type="button" onclick="fazerLogin()" class="btn-principal">Entrar na Conta</button>
            </div>

            <!-- CADASTRO -->
            <div id="cadastro-form" class="form-box">
                <h3>Crie sua conta grátis</h3>
                <div class="form-group">
                    <label>Nome completo</label>
                    <input type="text" id="cad-nome" placeholder="João Silva" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="cad-email" placeholder="joao@email.com" required>
                </div>
                <div class="form-group">
                    <label>Senha</label>
                    <input type="password" id="cad-senha" placeholder="Mínimo 6 caracteres" required minlength="6">
                </div>
                <button type="button" onclick="fazerCadastro()" class="btn-principal">Criar Minha Conta</button>
            </div>
        </div>
    </main>

    <footer>
        <div class="container">
            <div class="rodape">
                <div class="contatos">
                    <h4>Entre em Contato</h4>
                    <p>Email: intstore@gmail.com</p>
                </div>
                <div class="direitos">
                    <p>© 2025 Igor Epping. Todos os direitos reservados.</p>
                </div>
            </div>
        </div>
    </footer>

    <script src="/js/script.js"></script>
    <script>
        function mostrarLogin() {
            document.getElementById('login-form').classList.add('active');
            document.getElementById('cadastro-form').classList.remove('active');
            document.querySelectorAll('.toggle-btn')[0].classList.add('active');
            document.querySelectorAll('.toggle-btn')[1].classList.remove('active');
        }
        function mostrarCadastro() {
            document.getElementById('cadastro-form').classList.add('active');
            document.getElementById('login-form').classList.remove('active');
            document.querySelectorAll('.toggle-btn')[1].classList.add('active');
            document.querySelectorAll('.toggle-btn')[0].classList.remove('active');
        }

        async function fazerCadastro() {
            const nome = document.getElementById('cad-nome').value.trim();
            const email = document.getElementById('cad-email').value.trim();
            const senha = document.getElementById('cad-senha').value;

            if (!nome || !email || !senha) return Swal.fire('Erro', 'Preencha todos os campos', 'error');

            const res = await fetch('api/api_usuarios.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'register', nome, email, senha })
            });
            const data = await res.json();

            if (data.status === 'sucesso') {
                Swal.fire('Sucesso!', 'Cadastro realizado! Agora faça login.', 'success');
                mostrarLogin();
            } else {
                Swal.fire('Erro', data.mensagem || 'Erro no cadastro', 'error');
            }
        }

        async function fazerLogin() {
            const email = document.getElementById('login-email').value.trim();
            const senha = document.getElementById('login-senha').value;

            if (!email || !senha) return Swal.fire('Erro', 'Preencha email e senha', 'error');

            const res = await fetch('api/api_usuarios.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'login', email, senha })
            });
            const data = await res.json();

            if (data.status === 'sucesso') {
                localStorage.setItem('user', JSON.stringify(data.usuario));
                Swal.fire('Sucesso!', 'Login realizado! Bem-vindo!', 'success').then(() => {
                    window.location.href = 'index.php';
                });
            } else {
                Swal.fire('Erro', data.mensagem || 'Email ou senha incorretos', 'error');
            }
        }

        // Atualiza contador do carrinho
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof atualizarContador === 'function') atualizarContador();
        });
    </script>
</body>
</html>