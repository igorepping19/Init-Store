<?php
// categorias/categorias.php (e todos os copiados)
$uri = $_SERVER['REQUEST_URI'];
$arquivo = basename(parse_url($uri, PHP_URL_PATH), '.php'); // Remove .php
$slug = str_replace('_', '-', $arquivo); // _ → -

// Validação do slug
if (empty($slug) || !preg_match('/^[a-z0-9-]+$/', $slug)) {
    http_response_code(404);
    die("Categoria não encontrada.");
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= ucfirst(str_replace('-', ' ', $slug)) ?> - Init Store</title>
    <link rel="stylesheet" href="/style.css">
    <link rel="icon" type="image/png" href="/icon.png">
</head>
<body>

    <!-- HEADER -->
    <header>
        <div class="container">
            <div class="cabecalho">
                <h1>Init Store</h1>
                <nav class="menu">
                    <ul>
                        <a href="/produtos.php">Produtos</a>
                        <select id="select-categorias" onchange="redirecionarCategoria(this.value)">
                            <option value="">Carregando...</option>
                        </select>
                        <a href="/famosospagina.php">Mais Vendidos</a>
                    </ul>
                </nav>
                <form action="/buscar.php" method="get">
                    <input type="text" name="q" placeholder="Buscar Produto..." required>
                </form>
                <nav class="carrinho">
                    <a href="/carrinho.php">
                        <img src="/carrinho.png" alt="Carrinho" style="width: 30px;">
                        <span id="contador-carrinho" class="badge">0</span>
                    </a>
                </nav>
                <nav class="conta">
                    <a href="/conta.php">
                        <img src="/user.png" alt="Conta" style="width: 30px;">
                    </a>
                </nav>
            </div>
        </div>
    </header>

    <!-- MAIN -->
    <main class="container">
        <h2 style="text-align:center; margin:40px 0; color:#173f5f;">
            Produtos em <?= ucfirst(str_replace('-', ' ', $slug)) ?>
        </h2>
        
        <div id="produtos-container" class="cards">
            <p class="text-center text-muted">Carregando produtos...</p>
        </div>
    </main>

    <!-- FOOTER -->
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

    <!-- SCRIPTS -->
    <script src="/script.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            carregarCategorias();
            atualizarContador();
            carregarProdutos({ categoria: '<?= addslashes($slug) ?>' });
        });
    </script>
</body>
</html>