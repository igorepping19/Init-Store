// script-novo.js — VERSÃO FINAL 100% LIMPA — 10/11/2025 21:25
async function carregarProdutos(filtro = {}) {
    let url = 'api_produtos.php';
    const params = new URLSearchParams(filtro);
    if (params.toString()) url += '?' + params;

    const container = document.getElementById('produtos-destaque') || 
                     document.getElementById('lista-produtos') || 
                     document.getElementById('produtos-container');

    if (!container) return;

    container.innerHTML = '<p class="text-center">Carregando...</p>';

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Erro na API');
        const data = await res.json();
        const produtos = data.dados || data;

        if (!produtos || produtos.length === 0) {
            container.innerHTML = '<p class="text-center text-muted">Nenhum produto encontrado.</p>';
            return;
        }

        container.innerHTML = produtos.map(p => `
            <div class="notebook">
                <div class="card-image">
                    <img src="${p.imagem_url || 'https://placehold.co/300x200?text=Sem+Imagem'}" alt="${p.nome}">
                </div>
                <div class="card-content">
                    <h2 class="product-title">${p.nome}</h2>
                    <p class="product-price">R$ ${parseFloat(p.preco).toFixed(2).replace('.', ',')}</p>
                    <button class="add-to-cart-btn" onclick="adicionarAoCarrinho(${p.id})">
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        `).join('');
    } catch (err) {
        container.innerHTML = '<p class="text-danger">Erro ao carregar produtos.</p>';
        console.error("Erro:", err);
    }
}

async function carregarCategorias() {
    const select = document.getElementById('select-categorias');
    if (!select) return;

    try {
        const res = await fetch('api_categorias.php');
        if (!res.ok) throw new Error('Erro na API');
        const categorias = await res.json();

        select.innerHTML = '<option value="">Categorias</option>';

        categorias.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat.slug.replace(/-/g, '_') + '.html';
            opt.textContent = cat.nome;
            select.appendChild(opt);
        });
    } catch (err) {
        console.error("Erro categorias:", err);
    }
}

function redirecionarCategoria(valor) {
    if (valor) location.href = valor;
}

async function adicionarAoCarrinho(id) {
    await fetch('api_carrinho.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, acao: 'add' })
    });
    atualizarContador();
    alert("Produto adicionado ao carrinho!");
}

function atualizarContador() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
    const total = carrinho.reduce((s, i) => s + i.qtd, 0);
    const badge = document.getElementById('contador-carrinho');
    if (badge) {
        badge.textContent = total;
        badge.style.display = total > 0 ? 'inline' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarCategorias();
    atualizarContador();

    const pagina = location.pathname.split('/').pop().toLowerCase();

    if (pagina === 'index.html' || pagina === '' || pagina === '/') {
        carregarProdutos({ destaque: 1 });
    } 
    else if (pagina === 'produtos.html') {
        carregarProdutos();
    } 
    else if (pagina.endsWith('.html') && !['index.html', 'produtos.html', 'famosos.html'].includes(pagina)) {
        const slug = pagina.replace('.html', '').replace(/_/g, '-');
        carregarProdutos({ categoria: slug });
    }
});