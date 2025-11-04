// Redireciona ao mudar categoria
function redirecionarCategoria(url) {
    if (url) {
        window.location.href = url;
    }
}

// Carrega categorias no <select>
function carregarCategorias() {
    const select = document.getElementById('select-categorias');
    if (!select) {
        console.log('select-categorias não encontrado na página');
        return;
    }

    // Limpa tudo
    select.innerHTML = '<option value="">Carregando...</option>';

    fetch('http://localhost:8000/api_categorias.php')
        .then(r => r.json())
        .then(data => {
            if (data.status !== 'sucesso' || !data.dados) {
                select.innerHTML = '<option value="">Erro</option>';
                return;
            }

            // Limpa e adiciona padrão
            select.innerHTML = '<option value="">Categorias</option>';

            // Adiciona opções
            data.dados.forEach(cat => {
                const opt = document.createElement('option');
                opt.value = `/categorias/${cat.slug}.html`;
                opt.textContent = cat.nome;
                select.appendChild(opt);
            });

            // Marca a categoria atual
            const currentFile = window.location.pathname.split('/').pop();
            const currentSlug = currentFile.replace('.html', '');
            const currentOption = Array.from(select.options).find(opt => 
                opt.value.includes(currentSlug)
            );
            if (currentOption) {
                currentOption.selected = true;
            }
        })
        .catch(err => {
            console.error('Erro ao carregar categorias:', err);
            select.innerHTML = '<option value="">Erro</option>';
        });
}

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarCategorias();
    console.log('carregarCategorias() executado');
});