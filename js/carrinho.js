// js/carrinho.js — FINAL E 100% FUNCIONAL
const API_PRODUTOS = 'api/api_produtos.php';
const API_CARRINHO = 'api/api_carrinho.php';

async function carregarCarrinho() {
  const container = document.getElementById('itens-carrinho');
  const btn = document.getElementById('finalizar-compra');
  
  container.innerHTML = '<p style="text-align:center; color:#666;">Carregando...</p>';

  try {
    const [carrinhoRes, produtosRes] = await Promise.all([
      fetch(API_CARRINHO),
      fetch(API_PRODUTOS)
    ]);

    const carrinhoData = await carrinhoRes.json();
    const produtos = (await produtosRes.json()).dados || [];

    const carrinho = carrinhoData.carrinho || {};
    const itens = Object.keys(carrinho);

    if (itens.length === 0) {
      container.innerHTML = '<p style="text-align:center; padding:60px; color:#666;">Seu carrinho está vazio.<br><a href="index.php">Continuar comprando →</a></p>';
      btn.style.display = 'none';
      atualizarBadge(0);
      return;
    }

    let html = '';
    let total = 0;
    let totalItens = 0;

    produtos.forEach(p => {
      const qtd = carrinho[p.id] || 0;
      if (qtd > 0) {
        totalItens += qtd;
        const subtotal = p.preco * qtd;
        total += subtotal;
        html += `
          <div style="display:flex; align-items:center; gap:20px; padding:20px; border:1px solid #eee; border-radius:10px; margin:15px 0; background:#fff;">
            <img src="${p.imagem_url || 'https://placehold.co/80x80'}" width="80" style="border-radius:8px;">
            <div style="flex:1;">
              <h4 style="margin:0;">${p.nome}</h4>
              <p style="margin:5px 0; color:#555;">R$ ${parseFloat(p.preco).toFixed(2).replace('.', ',')} × ${qtd}</p>
            </div>
            <div style="font-weight:bold; font-size:1.3em;">
              R$ ${subtotal.toFixed(2).replace('.', ',')}
            </div>
            <button onclick="remover(${p.id})" style="background:#dc3545; color:white; border:none; padding:10px 15px; border-radius:50%; font-size:1.5em; cursor:pointer;">×</button>
          </div>`;
      }
    });

    container.innerHTML = html + 
      `<div style="text-align:right; padding:25px; background:#f8f9fa; border-radius:10px; font-size:1.6em; margin-top:20px;">
        <strong>Total: R$ ${total.toFixed(2).replace('.', ',')}</strong>
       </div>`;

    btn.style.display = 'inline-block';
    atualizarBadge(totalItens);

  } catch (err) {
    container.innerHTML = '<p style="text-align:center; color:red;">Erro ao carregar o carrinho.</p>';
  }
}

function remover(id) {
  if (confirm("Remover este item?")) {
    fetch(API_CARRINHO + '?id=' + id, { method: 'DELETE' })
      .then(() => carregarCarrinho());
  }
}

function atualizarBadge(n) {
  const badge = document.getElementById('contador-carrinho');
  if (badge) {
    badge.textContent = n;
    badge.style.display = n > 0 ? 'flex' : 'none';
  }
}