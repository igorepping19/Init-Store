// script.js
async function carregarProdutos(filtro = {}) {
    let url = 'api_produtos.php';
    const params = new URLSearchParams(filtro);
    if (params.toString()) url += '?' + params;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Erro na API');
        const data = await res.json(); // AGORA TEM 'dados'

        const container = document.getElementById('produtos-container');
        if (!container) return;

        container.innerHTML = '';

        if (!data.dados || data.dados.length === 0) {
            container.innerHTML = '<p class="text-center text-muted">Nenhum produto encontrado.</p>';
            return;
        }

        data.dados.forEach(p => {
            const card = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100 shadow-sm">
                        <img src="${p.imagem_url || 'placeholder.jpg'}" class="card-img-top" alt="${p.nome}" style="height: 200px; object-fit: cover;">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${p.nome}</h5>
                            <p class="card-text text-success fw-bold">R$ ${parseFloat(p.preco).toFixed(2).replace('.', ',')}</p>
                            ${p.destaque == 1 ? '<span class="badge bg-danger mb-2">DESTAQUE</span>' : ''}
                            <button class="btn btn-primary mt-auto" onclick="alert('Adicionado!')">
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    </div>
                </div>`;
            container.innerHTML += card;
        });
    } catch (err) {
        console.error("Erro ao carregar produtos:", err);
        const container = document.getElementById('produtos-container');
        if (container) container.innerHTML = '<p class="text-danger">Erro ao carregar produtos.</p>';
    }
}

// NOVA FUNÇÃO: carregarCategorias()
async function carregarCategorias() {
    try {
        const res = await fetch('api_categorias.php');
        const categorias = await res.json();
        const select = document.getElementById('select-categorias');
        if (!select) return;

        select.innerHTML = '<option value="">Categorias</option>';
        categorias.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = `categoria-${cat.slug}.html`;
            opt.textContent = cat.nome;
            select.appendChild(opt);
        });
    } catch (err) {
        console.error("Erro ao carregar categorias:", err);
    }
}

// Carregar ao abrir a página
document.addEventListener('DOMContentLoaded', () => {
    carregarCategorias(); // ADICIONADO
    const pagina = window.location.pathname.split('/').pop();

    if (pagina === 'index.html') {
        carregarProdutos({ destaque: 1 });
    } else if (pagina === 'produtos.html') {
        carregarProdutos();
    } else if (pagina.startsWith('categoria-') || pagina.includes('.html')) {
        const slug = pagina.replace('categoria-', '').replace('.html', '');
        if (slug && slug !== 'index' && slug !== 'produtos') {
            carregarProdutos({ categoria: slug });
        }
    }
});