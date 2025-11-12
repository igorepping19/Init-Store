fetch('session.php').catch(() => {});
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
            opt.value = '/categorias/' + cat.slug.replace(/-/g, '_') + '.php';
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
    try {
        const res = await fetch('api_carrinho.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, acao: 'add' })
        });
        const data = await res.json();
        if (data.sucesso) {
            atualizarContador();
            alert("Adicionado ao carrinho!");
        } else {
            alert("Erro ao adicionar. Tente novamente.");
        }
    } catch (err) {
        console.error("Erro:", err);
        alert("Erro de conexão.");
    }

}

async function atualizarContador() {
    try {
        const res = await fetch('api_carrinho.php');
        const itens = await res.json();
        const total = Array.isArray(itens) ? itens.reduce((s, i) => s + i.qtd, 0) : 0;
        const badge = document.getElementById('contador-carrinho');
        if (badge) {
            badge.textContent = total;
            badge.style.display = total > 0 ? 'inline' : 'none';
        }
    } catch (err) {
        console.error("Erro ao atualizar contador:", err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarCategorias();
    atualizarContador();

    const pagina = location.pathname.split('/').pop().toLowerCase();

    // ACEITA .php e .html
    if (pagina === 'index.php' || pagina === '' || pagina === '/') {
        carregarProdutos({ destaque: 1 });
    } 
    else if (pagina === 'produtos.php') {
        carregarProdutos();
    } 
    else if ((pagina.endsWith('.php') || pagina.endsWith('.html')) && 
             !['index.php', 'produtos.php', 'famosos.php', 'famosospagina.php'].includes(pagina)) {
        
        // Remove .php ou .html e converte _ para -
        const slug = pagina.replace(/\.php$|\.html$/, '').replace(/_/g, '-');
        carregarProdutos({ categoria: slug });
    }
});