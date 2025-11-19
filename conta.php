<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Conta - Init Store</title>
    <link rel="stylesheet" href="/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
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

        <!-- BOTÕES PARA TROCAR ENTRE LOGIN E CADASTRO -->
        <div class="toggle-buttons">
            <button class="toggle-btn active" onclick="mostrarLogin()">Login</button>
            <button class="toggle-btn" onclick="mostrarCadastro()">Cadastre-se</button>
        </div>

        <!-- CONTAINER DOS FORMULÁRIOS -->
        <div class="form-container">

            <!-- FORMULÁRIO DE LOGIN -->
            <div id="login-form" class="form-box active">
                <h3>Bem-vindo de volta!</h3>
                <form id="form-login" action="/api/login.php" method="POST">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="seu@email.com" required>
                    </div>
                    <div class="form-group">
                        <label>Senha</label>
                        <input type="password" name="senha" placeholder="••••••••" required>
                    </div>
                    <button type="submit" class="btn-principal">Entrar na Conta</button>
                    <p class="link-extra"><a href="#">Esqueceu a senha?</a></p>
                </form>
            </div>

            <!-- FORMULÁRIO DE CADASTRO -->
            <div id="cadastro-form" class="form-box">
                <h3>Crie sua conta grátis</h3>
                <form id="form-cadastro" action="/api/cadastro.php" method="POST">
                    <div class="form-group">
                        <label>Nome completo</label>
                        <input type="text" name="nome" placeholder="João Silva" required>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="joao@email.com" required>
                    </div>
                    <div class="form-group">
                        <label>Senha</label>
                        <input type="password" name="senha" placeholder="Mínimo 6 caracteres" required minlength="6">
                    </div>
                    <div class="form-group">
                        <label>Confirme a senha</label>
                        <input type="password" name="senha2" placeholder="Digite novamente" required>
                    </div>
                    <button type="submit" class="btn-principal">Criar Minha Conta</button>
                    <p class="termos">Ao criar a conta, você aceita nossos <a href="#">Termos de Uso</a>.</p>
                </form>
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
        // Atualiza contador do carrinho
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof atualizarContador === 'function') atualizarContador();
        });

        // Alternar entre Login e Cadastro
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

        // CADASTRO BEM-SUCEDIDO → VAI PRO LOGIN AUTOMATICAMENTE
        const formCadastro = document.getElementById('form-cadastro');
        formCadastro.addEventListener('submit', function(e) {
            // Aqui você pode adicionar validação extra se quiser
            // Por enquanto, só redireciona pro login após o envio
            setTimeout(() => {
                alert('Cadastro realizado com sucesso! Agora faça login.');
                mostrarLogin();
            }, 500);
        });

        // LOGIN BEM-SUCEDIDO → REDIRECIONA PRO INDEX
        const formLogin = document.getElementById('form-login');
        formLogin.addEventListener('submit', function(e) {
            // Se o seu backend retornar sucesso, ele vai redirecionar
            // Mas como backup, caso o PHP não redirecione, fazemos aqui:
            const originalAction = this.action;
            e.preventDefault();

            fetch(originalAction, {
                method: 'POST',
                body: new FormData(this)
            })
            .then(r => r.json())
            .then(res => {
                if (res.sucesso || res.status === 'success') {
                    alert('Login realizado com sucesso! Bem-vindo à Init Store!');
                    window.location.href = 'index.php';
                } else {
                    alert(res.mensagem || 'Email ou senha incorretos.');
                }
            })
            .catch(() => {
                alert('Erro no servidor. Tente novamente.');
            });
        });
    </script>
</body>
</html>