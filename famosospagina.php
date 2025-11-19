<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mais Vendidos - Init Store</title>
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
            <img src="/img/carrinho.png" alt="Carrinho">
            <span id="contador-carrinho" class="badge">0</span>
          </a>
        </nav>
      </div>
    </div>
  </header>

  <main class="container">
    <section class="secao-titulo">
      <h2>Mais Vendidos da Init Store</h2>
      <p>Os produtos que todo mundo está levando!</p>
    </section>

    <div id="famosos-lista" class="grid-produtos">
      <p class="mensagem-carregando">Carregando os mais vendidos...</p>
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

  <script src="js/script.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const container = document.getElementById('famosos-lista');
      
      fetch('api/api_produtos.php?destaque')
        .then(r => r.json())
        .then(res => {
          const produtos = res.dados || [];
          
          if (produtos.length === 0) {
            container.innerHTML = '<p class="mensagem-vazio">Nenhum produto em destaque no momento.</p>';
            return;
          }

          container.innerHTML = produtos.map(p => `
            <div class="produto-card">
              <div class="produto-imagem">
                <img src="${p.imagem_url || 'https://placehold.co/300x200'}" 
                     alt="${p.nome}" 
                     onerror="this.src='https://placehold.co/300x200?text=Sem+Imagem'">
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
        })
        .catch(() => {
          container.innerHTML = '<p class="mensagem-erro">Erro ao carregar produtos.</p>';
        });

      if (typeof atualizarContador === 'function') atualizarContador();
    });
  </script>
</body>
</html>