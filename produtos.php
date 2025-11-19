<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todos os Produtos - Init Store</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <header>
        <div class="container">
            <div class="cabecalho">
                <h1>Init Store</h1>
                <nav class="menu">
                    <ul>
                        <a href="index.php">Início</a>
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
            <h2>Todos os Produtos</h2>
            <p>Confira nosso catálogo completo com os melhores preços!</p>
        </section>

        <div style="margin:30px 0; display:flex; gap:12px; flex-wrap:wrap;">
            <input type="text" id="busca" placeholder="Digite o nome do produto..." style="padding:14px; flex:1; min-width:250px; border:1px solid #ddd; border-radius:8px; font-size:1em;">
            <button onclick="filtrarProdutos()" style="padding:14px 28px; background:#007bff; color:white; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">
                Buscar
            </button>
        </div>

        <div id="lista-produtos" class="grid-produtos">
            <p class="mensagem-carregando">Carregando produtos...</p>
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
        document.addEventListener('DOMContentLoaded', () => {
            carregarTodosProdutos();
            atualizarContador(); // Agora o contador aparece!
        });

        function carregarTodosProdutos() {
            const container = document.getElementById('lista-produtos');
            container.innerHTML = '<p class="mensagem-carregando">Carregando produtos...</p>';

            fetch('/api/api_produtos.php')
                .then(r => r.json())
                .then(res => {
                    const produtos = res.dados || [];
                    if (produtos.length === 0) {
                        container.innerHTML = '<p class="mensagem-vazio">Nenhum produto cadastrado ainda.</p>';
                        return;
                    }

                    container.innerHTML = produtos.map(p => `
                        <div class="produto-card">
                            <div class="produto-imagem">
                                <img src="${p.imagem_url || 'https://placehold.co/600x400'}" 
                                     alt="${p.nome}" 
                                     onerror="this.src='https://placehold.co/600x400?text=Sem+Imagem'">
                            </div>
                            <div class="produto-info">
                                <h3 class="produto-nome">${p.nome}</h3>
                                <p class="produto-descricao">${p.descricao || 'Sem descrição disponível.'}</p>
                                <p class="produto-preco">R$ ${parseFloat(p.preco).toFixed(2).replace('.', ',')}</p>
                                <button class="btn-add-carrinho" onclick="adicionarAoCarrinho(${p.id})">
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    `).join('');
                })
                .catch(err => {
                    console.error(err);
                    container.innerHTML = '<p class="mensagem-erro">Erro ao carregar produtos. Tente novamente.</p>';
                });
        }

        function filtrarProdutos() {
            const termo = document.getElementById('busca').value.trim().toLowerCase();
            if (!termo) {
                carregarTodosProdutos();
                return;
            }

            fetch('/api/api_produtos.php')
                .then(r => r.json())
                .then(res => {
                    const produtos = (res.dados || []).filter(p => 
                        p.nome.toLowerCase().includes(termo) || 
                        (p.descricao && p.descricao.toLowerCase().includes(termo))
                    );

                    const container = document.getElementById('lista-produtos');
                    if (produtos.length === 0) {
                        container.innerHTML = '<p class="mensagem-vazio">Nenhum produto encontrado para "<strong>${termo}</strong>".</p>';
                        return;
                    }

                    container.innerHTML = produtos.map(p => `
                        <div class="produto-card">
                            <div class="produto-imagem">
                                <img src="${p.imagem_url || 'https://placehold.co/600x400'}" alt="${p.nome}">
                            </div>
                            <div class="produto-info">
                                <h3 class="produto-nome">${p.nome}</h3>
                                <p class="produto-preco">R$ ${parseFloat(p.preco).toFixed(2).replace('.', ',')}</p>
                                <button class="btn-add-carrinho" onclick="adicionarAoCarrinho(${p.id})">
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    `).join('');
                });
        }

        // Busca com Enter
        document.getElementById('busca').addEventListener('keypress', e => {
            if (e.key === 'Enter') filtrarProdutos();
        });
    </script>
</body>
</html>