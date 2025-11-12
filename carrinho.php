<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Carrinho - Init Store</title>
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
            <a href="famosos.php">Mais Vendidos</a>
          </ul>
        </nav>
        <form action="buscar.php" method="get">
          <input type="text" name="q" placeholder="Buscar Produto..." required>
        </form>
        <nav class="carrinho">
          <a href="carrinho.php">
            <img src="carrinho.png" alt="Carrinho" style="width: 30px;">
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

    <div style="text-align:center; margin:30px 0;">
      <button id="finalizar-compra" class="btn-verde" onclick="location.href='checkout.html'" style="display:none;">
        Finalizar Compra
      </button>
    </div>
  </main>

  <footer>
    <div class="container">
      <div class="rodape">
        <div class="contatos">
          <h4>Entre em Contato</h4>
          <p>Email: initstore@gmail.com</p>
        </div>
        <div class="direitos">
          <p>© 2025 Igor Epping. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  </footer>

  <script src="script.js"></script>
  <script>
    async function atualizarContador() {
      const res = await fetch('api_carrinho.php');
      const itens = await res.json();
      const total = itens.reduce((s, i) => s + i.qtd, 0);
      const badge = document.getElementById('contador-carrinho');
      badge.textContent = total;
      badge.style.display = total > 0 ? 'inline' : 'none';
    }

    async function carregarCarrinho() {
      const resCarrinho = await fetch('api_carrinho.php');
      const carrinho = await resCarrinho.json();
      const resProdutos = await fetch('api_produtos.php');
      const todos = await resProdutos.json();
      const produtos = (todos.dados || todos);

      const container = document.getElementById('itens-carrinho');
      const btn = document.getElementById('finalizar-compra');

      if (carrinho.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#666;">Seu carrinho está vazio.</p>';
        btn.style.display = 'none';
        return;
      }

      btn.style.display = 'inline-block';

      let html = '<div class="carrinho-grid">';
      carrinho.forEach(item => {
        const p = produtos.find(x => x.id == item.id);
        if (p) {
          html += `
            <div class="carrinho-item">
              <img src="${p.imagem_url || 'https://placehold.co/100x100'}" alt="${p.nome}">
              <div class="carrinho-info">
                <h3>${p.nome}</h3>
                <p>R$ ${parseFloat(p.preco).toFixed(2).replace('.', ',')}</p>
              </div>
              <div class="carrinho-qtd">
                <button onclick="mudarQtd(${item.id}, -1)">-</button>
                <span>${item.qtd}</span>
                <button onclick="mudarQtd(${item.id}, 1)">+</button>
              </div>
              <button class="remover-item" onclick="removerItem(${item.id})">×</button>
            </div>
          `;
        }
      });
      html += '</div>';
      container.innerHTML = html;
    }

    async function mudarQtd(id, delta) {
      const res = await fetch('api_carrinho.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, acao: delta < 0 ? 'update' : 'update', qtd: delta < 0 ? 1 : null })
      });
      if (delta < 0) {
        const resCarrinho = await fetch('api_carrinho.php');
        const itens = await resCarrinho.json();
        const item = itens.find(i => i.id == id);
        if (item && item.qtd + delta <= 0) {
          removerItem(id);
          return;
        }
      }
      await atualizarContador();
      carregarCarrinho();
    }

    async function removerItem(id) {
      await fetch('api_carrinho.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, acao: 'remove' })
      });
      atualizarContador();
      carregarCarrinho();
    }

    document.addEventListener('DOMContentLoaded', () => {
      carregarCategorias();
      atualizarContador();
      carregarCarrinho();
    });
  </script>
</body>
</html>