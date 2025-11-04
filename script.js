// script.js – Funções globais: redirecionar + carregar categorias
const API_CATEGORIAS = 'http://localhost:8000/api_categorias.php';

// 1. Redireciona para categoria
function redirecionarCategoria(url) {
    if (url) window.location.href = url;
}

// 2. Carrega categorias dinamicamente no <select>
function carregarCategorias() {
    const select = document.getElementById('select-categorias');
    if (!select) return;

    fetch(API_CATEGORIAS)
        .then(r => r.json())
        .then(data => {
            if (data.status !== 'sucesso') return;

            // Limpa opções (exceto a primeira)
            select.innerHTML = '<option value="">Categorias</option>';

            data.dados.forEach(cat => {
                const opt = document.createElement('option');
                opt.value = `categorias/${cat.slug}.html`;
                opt.textContent = cat.nome;
                select.appendChild(opt);
            });
        })
        .catch(() => {
            select.innerHTML += '<option value="">Erro ao carregar</option>';
        });
}

// 3. Executa ao carregar a página
document.addEventListener('DOMContentLoaded', carregarCategorias);