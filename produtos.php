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
                        <a href="index.php">Inicio</a>
                        <!--<select id="select-categorias" onchange="redirecionarCategoria(this.value)">
                            <option value="">Carregando...</option>
                        </select>   -->                 
                        <a href="famosospagina.php">Mais Vendidos</a>
                    </ul>
                </nav>
                <form action="buscar.php" method="get">
                    <input type="text" name="q" placeholder="Buscar Produto..." required>
                </form>
                <nav class="carrinho">
                    <a href="carrinho.php">
                        <img src="/img/carrinho.png" alt="Meu Carrinho" style="width: 30px; height: 30px;">
                    </a>
                </nav>
                <nav class="conta">
                    <a href="conta.php">
                        <img src="/img/user.png" alt="Minha Conta" style="width: 30px; height: 30px;">
                    </a>
                </nav>
            </div>
        </div>
    </header>
    <main class="container">
        <h2>Todos os Produtos</h2>

        <div style="margin:20px 0; display:flex; gap:10px; flex-wrap:wrap;">
            <input type="text" id="busca" placeholder="Buscar produto..." style="padding:10px; flex:1; min-width:200px;">
            <button onclick="filtrarProdutos()" style="padding:10px 20px; background:#007bff; color:white; border:none; border-radius:5px;">
                Buscar
            </button>
        </div>

        <div id="lista-produtos" class="cards">
            Carregando produtos...
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
                    <p>&copy; 2025 Igor Epping. Todos os direitos reservados.</p>
                </div>
            </div>
        </div>
    </footer>

    <script src="/js/script.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            carregarCategorias();
            carregarTodosProdutos();
        });

        function carregarTodosProdutos() {
            const url = '/api/api_produtos.php';
            fetch(url)
                .then(r => r.json())
                .then(data => {
                    const container = document.getElementById('lista-produtos');
                    if (!data.dados || data.dados.length === 0) {
                        container.innerHTML = '<p style="text-align:center; color:#666;">Nenhum produto encontrado.</p>';
                        return;
                    }

                    container.innerHTML = data.dados.map(p => `
                        <div class="notebook">
                            <div class="card-image">
                                <img src="${p.imagem_url || 'https://placehold.co/300x200'}" 
                                     alt="${p.nome}" 
                                     onerror="this.src='https://placehold.co/300x200?text=Sem+Imagem'">
                            </div>
                            <div class="card-content">
                                <h2 class="product-title">${p.nome}</h2>
                                <p class="product-specs">${p.descricao || ''}</p>
                                <p class="product-price">R$ ${parseFloat(p.preco).toFixed(2).replace('.', ',')}</p>
                                <button class="add-to-cart-btn" onclick="adicionarAoCarrinho(${p.id})">
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    `).join('');
                })
                .catch(() => {
                    document.getElementById('lista-produtos').innerHTML = '<p style="color:red;">Erro ao carregar produtos.</p>';
                });
        }

        function filtrarProdutos() {
            const termo = document.getElementById('busca').value.trim();
            if (!termo) {
                carregarTodosProdutos();
                return;
            }

            fetch(`/api/api_produtos.php`)
                .then(r => r.json())
                .then(data => {
                    const filtrados = data.dados.filter(p => 
                        p.nome.toLowerCase().includes(termo.toLowerCase())
                    );

                    const container = document.getElementById('lista-produtos');
                    if (filtrados.length === 0) {
                        container.innerHTML = '<p style="text-align:center; color:#666;">Nenhum produto encontrado.</p>';
                        return;
                    }

                    container.innerHTML = filtrados.map(p => `
                        <div class="notebook">
                            <div class="card-image">
                                <img src="${p.imagem_url || 'https://placehold.co/300x200'}" alt="${p.nome}">
                            </div>
                            <div class="card-content">
                                <h2 class="product-title">${p.nome}</h2>
                                <p class="product-price">R$ ${parseFloat(p.preco).toFixed(2).replace('.', ',')}</p>
                                <button class="add-to-cart-btn" onclick="adicionarAoCarrinho(${p.id})">
                                    Adicionar
                                </button>
                            </div>
                        </div>
                    `).join('');
                });
        }

        // Busca ao pressionar Enter
        document.getElementById('busca').addEventListener('keypress', e => {
            if (e.key === 'Enter') filtrarProdutos();
        });
    </script>
</body>
</html>