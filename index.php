<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Init Store</title>
    <link rel="icon" type="image/png" href="/img/icon.png">
    <link rel="stylesheet" href="/css/style.css">
</head>

<body>
    <header>
        <div class="container">
            <div class="cabecalho">
                <h1>Init Store</h1>
                <nav class="menu">
                    <ul>
                        <a href="produtos.php">Produtos</a>
                        <!--<select id="select-categorias" onchange="redirecionarCategoria(this.value)">
                            <option value="">Carregando...</option>
                        </select> -->
                        <a href="famosospagina.php">Mais Vendidos</a>
                    </ul>
                </nav>
                <form action="buscar.php" method="get">
                    <input type="text" name="q" placeholder="Buscar Produto..." required>
                </form>
                <nav class="carrinho">
                    <a href="carrinho.php">
                        <img src="/img/carrinho.png" alt="Meu Carrinho" style="width: 30px; height: 30px;">
                        <span id="contador-carrinho" class="badge">0</span>
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

    <main>
        <div class="container">
            <div class="apresentacao">
                <div class="paragrafo">
                    <h2>Init Store!!! A sua loja de Tecnologia.</h2>
                    <p>Encontre os melhores notebooks, desktops, periféricos e componentes com preços imbatíveis e
                        entrega rápida.</p>
                </div>
                <img src="/img/desktop.jpg" alt="Imagem Desktop">
            </div>

            <div class="destaques">
                <h3>Produtos em Destaque</h3>
                <div class="cards" id="produtos-destaque">
                    <p class="text-center">Carregando produtos...</p>
                </div>
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

    <!-- SCRIPT.JS COM CARRINHO E CATEGORIAS -->
    <script src="/js/script.js"></script>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
           // carregarCategorias();
            carregarProdutos({ destaque: 1 });
            atualizarContador();
        });
    </script>
</body>

</html>