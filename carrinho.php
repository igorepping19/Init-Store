<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Carrinho - Init Store</title>
  <link rel="icon" type="image/x-icon" href="/img/icon.png">
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <header>
    <div class="container">
      <div class="cabecalho">
        <h1>Init Store</h1>
        <nav class="menu">
          <ul>
            <a href="/index.php">Início</a>
            <a href="/produtos.php">Produtos</a>
            <a href="/famosospagina.php">Mais Vendidos</a>
          </ul>
        </nav>
        <form action="/buscar.php" method="get">
          <input type="text" name="q" placeholder="Buscar Produto..." required>
        </form>
        <nav class="carrinho">
          <a href="/carrinho.php">
            <img src="/img/carrinho.png" alt="Carrinho" style="width: 30px;">
            <span id="contador-carrinho" class="badge">0</span>
          </a>
        </nav>
      </div>
    </div>
  </header>

  <main class="container">
    <h2 style="text-align:center; margin:40px 0; color:#173f5f;">Seu Carrinho</h2>
    
    <div id="itens-carrinho">
      <p style="text-align:center; color:#666;">Carregando carrinho...</p>
    </div>

    <div style="text-align:center; margin:40px 0;">
      <button id="finalizar-compra" class="btn-verde" onclick="location.href='/checkout.php'" style="display:none; padding:12px 30px; font-size:18px;">
        Finalizar Compra
      </button>
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

  <script src="js/carrinho.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      carregarCarrinho();
  });
</script>
</body>
</html>