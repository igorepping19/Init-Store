// A URL onde o seu PHP está rodando
const API_URL = 'http://localhost:8000/api_produtos.php'; 

function carregarProdutos() {
    fetch(API_URL)
        .then(response => {
            // Verifica se a resposta HTTP foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro de rede ou servidor.');
            }
            // Converte a resposta JSON em um objeto JavaScript
            return response.json(); 
        })
        .then(data => {
            if (data.status === 'sucesso') {
                const listaProdutos = document.getElementById('lista-produtos');
                listaProdutos.innerHTML = ''; // Limpa a lista existente

                // Itera sobre o array de produtos e cria os elementos HTML
                data.dados.forEach(produto => {
                    const produtoHTML = `
                        <div class="produto-card">
                            <img src="${produto.imagem_url}" alt="${produto.nome}">
                            <h3>${produto.nome}</h3>
                            <p>R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
                            <button onclick="adicionarAoCarrinho(${produto.id})">Comprar</button>
                        </div>
                    `;
                    listaProdutos.innerHTML += produtoHTML;
                });
            } else {
                console.error("Erro da API:", data.mensagem);
            }
        })
        .catch(error => {
            console.error("Houve um problema com a operação fetch:", error);
            // Mostrar uma mensagem de erro na interface, se desejar
        });
}

// Inicializa o carregamento dos produtos ao carregar a página
document.addEventListener('DOMContentLoaded', carregarProdutos);

// Função placeholder para o próximo passo (carrinho)
function adicionarAoCarrinho(produtoId) {
    console.log(`Produto ${produtoId} adicionado ao carrinho.`);
    // A lógica de carrinho virá aqui!
}