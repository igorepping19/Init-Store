// A URL onde o seu PHP de produtos está rodando
const API_PRODUTOS_URL = 'http://localhost:8000/api_produtos.php'; 
// A URL onde o seu PHP de carrinho está rodando (novo arquivo)
const API_CARRINHO_URL = 'http://localhost:8000/api_carrinho.php'; 

// ------------------------------------------------------------------
// 1. CARREGAR PRODUTOS (Leitura)
// ------------------------------------------------------------------

function carregarProdutos() {
    fetch(API_PRODUTOS_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro de rede ou servidor ao buscar produtos.');
            }
            return response.json(); 
        })
        .then(data => {
            if (data.status === 'sucesso') {
                const listaProdutos = document.getElementById('lista-produtos');
                if (!listaProdutos) return; // Garante que o elemento existe
                
                listaProdutos.innerHTML = ''; // Limpa a lista existente

                // Itera sobre o array de produtos e cria os elementos HTML
                data.dados.forEach(produto => {
                    // Replicando a estrutura de estilo do novo style.css
                    const produtoHTML = `
                        <div class="notebook">
                            <div class="card-image">
                                <!-- Usando um placeholder como fallback se a imagem real falhar -->
                                <img src="${produto.imagem_url || 'https://placehold.co/300x200/cccccc/333333?text=Init+Store'}" 
                                     alt="${produto.nome}" onerror="this.onerror=null;this.src='https://placehold.co/300x200/cccccc/333333?text=Sem+Imagem';">
                            </div>        
                            <div class="card-content">
                                <h2 class="product-title">${produto.nome}</h2>
                                <p class="product-specs">ID: ${produto.id}</p>
                                <p class="product-price">R$ ${parseFloat(produto.preco).toFixed(2).replace('.', ',')}</p>
                                <!-- Chamada para a nova função com o ID do produto -->
                                <button class="add-to-cart-btn" onclick="adicionarAoCarrinho(${produto.id})">
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    `;
                    listaProdutos.innerHTML += produtoHTML;
                });
                // Garante que o contador do carrinho seja carregado após o DOM estar pronto
                atualizarContadorCarrinho(); 
            } else {
                console.error("Erro da API de Produtos:", data.mensagem);
                const listaProdutos = document.getElementById('lista-produtos');
                 if (listaProdutos) listaProdutos.innerHTML = `<p style="text-align: center; color: red;">${data.mensagem}</p>`;
            }
        })
        .catch(error => {
            console.error("Houve um problema com a operação fetch:", error);
            const listaProdutos = document.getElementById('lista-produtos');
            if (listaProdutos) listaProdutos.innerHTML = `<p style="text-align: center; color: red;">Erro ao carregar produtos. Verifique o console e o ${API_PRODUTOS_URL}</p>`;
        });
}

// ------------------------------------------------------------------
// 2. ADICIONAR AO CARRINHO (Criação/Atualização)
// ------------------------------------------------------------------

function adicionarAoCarrinho(produtoId) {
    console.log(`Tentando adicionar o Produto ${produtoId}...`);
    
    // Faz a requisição POST para a nova API
    fetch(API_CARRINHO_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // Envia o ID do produto como JSON no corpo da requisição
        body: JSON.stringify({ id: produtoId }), 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro de rede ou servidor ao adicionar ao carrinho.');
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'sucesso') {
            console.log("Carrinho atualizado:", data.carrinho);
            // Atualiza o contador imediatamente após o sucesso
            atualizarContadorCarrinho(); 
            
            // Feedback visual (pode ser substituído por um modal elegante)
            alert(`"${produtoId}" adicionado ao carrinho! Total de itens: ${Object.keys(data.carrinho).length}`);
            
        } else {
            console.error("Erro da API do Carrinho:", data.mensagem);
            alert(`Erro: ${data.mensagem}`);
        }
    })
    .catch(error => {
        console.error("Houve um problema ao adicionar ao carrinho:", error);
        alert('Falha ao comunicar com o servidor. Tente novamente.');
    });
}

// ------------------------------------------------------------------
// 3. ATUALIZAR CONTADOR DO CARRINHO (Leitura da Sessão)
// ------------------------------------------------------------------

function atualizarContadorCarrinho() {
    fetch(API_CARRINHO_URL, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro de rede ou servidor ao buscar carrinho.');
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'sucesso') {
            const carrinho = data.carrinho || {};
            const totalItens = Object.keys(carrinho).length; // Conta quantos produtos diferentes existem
            const contadorElement = document.getElementById('carrinho-contador');
            
            if (contadorElement) {
                // Se você tiver um contador de badge no seu HTML, ele será atualizado
                contadorElement.textContent = totalItens;
                // Exemplo de como esconder o contador se estiver vazio (opcional)
                contadorElement.style.display = totalItens > 0 ? 'flex' : 'none'; 
            }
        }
    })
    .catch(error => {
        console.error("Erro ao carregar contador do carrinho:", error);
        // Em caso de erro, apenas deixa o contador zerado ou vazio
    });
}


// Inicializa o carregamento dos produtos ao carregar a página
document.addEventListener('DOMContentLoaded', carregarProdutos);
