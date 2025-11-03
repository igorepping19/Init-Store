// URLs das APIs
const API_PRODUTOS_URL = 'http://localhost:8000/api_produtos.php'; 
const API_CARRINHO_URL = 'http://localhost:8000/api_carrinho.php'; 

// ------------------------------------------------------------------
// FUNÇÕES DE UTILIDADE
// ------------------------------------------------------------------

// Função para formatar o preço para BRL
const formatarPreco = (valor) => `R$ ${parseFloat(valor).toFixed(2).replace('.', ',')}`;

// ------------------------------------------------------------------
// 1. CARREGAR E EXIBIR O CARRINHO
// ------------------------------------------------------------------

async function carregarCarrinho() {
    const listaItensElement = document.getElementById('lista-itens-carrinho');
    const subtotalElement = document.getElementById('carrinho-subtotal');
    const totalElement = document.getElementById('carrinho-total');
    
    // Zera os totais no início do carregamento
    let subtotalGeral = 0;
    
    try {
        // 1. CHAMA API DO CARRINHO (Obtém IDs e Quantidades)
        const carrinhoResponse = await fetch(API_CARRINHO_URL, { method: 'GET' });
        const carrinhoData = await carrinhoResponse.json();

        if (carrinhoData.status !== 'sucesso') {
            listaItensElement.innerHTML = `<p style="color: red;">Erro ao carregar dados do carrinho.</p>`;
            return;
        }

        const itensCarrinho = carrinhoData.carrinho; // Ex: { '1': 2, '3': 1 }
        const listaIds = Object.keys(itensCarrinho);

        if (listaIds.length === 0) {
            listaItensElement.innerHTML = `<p style="text-align: center; padding: 20px;">Seu carrinho está vazio. <a href="index.html">Voltar às compras</a>.</p>`;
            // Atualiza contador para 0
            atualizarContadorCarrinho(0); 
            subtotalElement.textContent = formatarPreco(0);
            totalElement.textContent = formatarPreco(0);
            return;
        }
        
        // 2. CHAMA API DE PRODUTOS (Obtém Detalhes dos Produtos)
        // Idealmente, você chamaria uma API que retorna APENAS os produtos com esses IDs,
        // mas para manter a simplicidade, chamamos todos e filtramos/buscamos aqui.
        const produtosResponse = await fetch(API_PRODUTOS_URL, { method: 'GET' });
        const produtosData = await produtosResponse.json();

        if (produtosData.status !== 'sucesso') {
            listaItensElement.innerHTML = `<p style="color: red;">Erro ao carregar detalhes dos produtos.</p>`;
            return;
        }

        const produtosCompletos = produtosData.dados;
        listaItensElement.innerHTML = ''; // Limpa o "Carregando..."

        // 3. MONTA O HTML E CALCULA TOTAIS
        produtosCompletos.forEach(produto => {
            const id = String(produto.id); // Converte para string para a busca no objeto
            const quantidade = itensCarrinho[id];

            if (quantidade > 0) {
                const precoUnitario = parseFloat(produto.preco);
                const subtotalItem = precoUnitario * quantidade;
                subtotalGeral += subtotalItem;
                
                const itemHTML = `
                    <div class="item-carrinho" data-produto-id="${id}">
                        <div class="item-imagem">
                            <img src="${produto.imagem_url || 'https://placehold.co/80x80/cccccc/333333?text=Sem+Imagem'}" 
                                 alt="${produto.nome}">
                        </div>
                        <div class="item-detalhes">
                            <h5>${produto.nome}</h5>
                            <p style="font-size: 0.9em; color: #666;">Preço Unitário: ${formatarPreco(precoUnitario)}</p>
                        </div>
                        <div class="item-quantidade">
                            <!-- Por simplicidade, a edição de quantidade não será implementada agora -->
                            <span>Qtd: ${quantidade}</span>
                        </div>
                        <div class="item-preco">
                            ${formatarPreco(subtotalItem)}
                        </div>
                        <div class="item-remover">
                            <button class="btn-remover" onclick="removerItemCarrinho(${id})">
                                &times; <!-- Ícone 'x' -->
                            </button>
                        </div>
                    </div>
                `;
                listaItensElement.innerHTML += itemHTML;
            }
        });

        // 4. ATUALIZA O RESUMO
        subtotalElement.textContent = formatarPreco(subtotalGeral);
        // O frete é "Grátis" por enquanto.
        const totalGeral = subtotalGeral; 
        totalElement.textContent = formatarPreco(totalGeral);
        
        // 5. ATUALIZA CONTADOR NO HEADER
        // Como estamos na página do carrinho, a contagem final é mais precisa aqui.
        atualizarContadorCarrinho(listaIds.length);

    } catch (error) {
        console.error("Erro fatal ao carregar o carrinho:", error);
        listaItensElement.innerHTML = `<p style="color: red;">Erro de comunicação com o servidor.</p>`;
        subtotalElement.textContent = formatarPreco(0);
        totalElement.textContent = formatarPreco(0);
    }
}

// ------------------------------------------------------------------
// 2. REMOVER ITEM DO CARRINHO (Deleção)
// ------------------------------------------------------------------

function removerItemCarrinho(produtoId) {
    if (!confirm("Tem certeza que deseja remover este item?")) {
        return;
    }
    
    fetch(API_CARRINHO_URL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        // Envia o ID do produto a ser removido
        body: JSON.stringify({ id: produtoId }), 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro de rede ou servidor ao remover item.');
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'sucesso') {
            console.log(`Produto ${produtoId} removido.`, data.carrinho);
            // Recarrega o carrinho para atualizar a lista e os totais
            carregarCarrinho(); 
        } else {
            alert(`Erro ao remover: ${data.mensagem}`);
        }
    })
    .catch(error => {
        console.error("Houve um problema ao remover do carrinho:", error);
        alert('Falha ao comunicar com o servidor.');
    });
}

// ------------------------------------------------------------------
// 3. ESVAZIAR CARRINHO
// ------------------------------------------------------------------

function esvaziarCarrinho() {
    if (!confirm("Tem certeza que deseja ESVAZIAR todo o carrinho?")) {
        return;
    }
    
    fetch(API_CARRINHO_URL, {
        method: 'DELETE'
        // Não envia 'body' nem 'id', o PHP entenderá que é para esvaziar.
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro de rede ou servidor ao esvaziar carrinho.');
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'sucesso') {
            console.log("Carrinho esvaziado.", data.carrinho);
            carregarCarrinho(); // Recarrega para mostrar a mensagem de carrinho vazio
        } else {
            alert(`Erro ao esvaziar: ${data.mensagem}`);
        }
    })
    .catch(error => {
        console.error("Houve um problema ao esvaziar o carrinho:", error);
        alert('Falha ao comunicar com o servidor.');
    });
}

// ------------------------------------------------------------------
// 4. ATUALIZAR CONTADOR NO HEADER (Reuso da lógica)
// ------------------------------------------------------------------

function atualizarContadorCarrinho(totalItens) {
    const contadorElement = document.getElementById('carrinho-contador');
    
    if (contadorElement) {
        if (typeof totalItens === 'number') {
            // Se o total foi passado como argumento (usado após carregar/remover)
             contadorElement.textContent = totalItens;
             contadorElement.style.display = totalItens > 0 ? 'flex' : 'none'; 
        } else {
            // Se chamado sem argumento (busca o total na API)
             fetch(API_CARRINHO_URL, { method: 'GET' })
                .then(r => r.json())
                .then(data => {
                    if (data.status === 'sucesso') {
                        const total = Object.keys(data.carrinho || {}).length;
                        contadorElement.textContent = total;
                        contadorElement.style.display = total > 0 ? 'flex' : 'none'; 
                    }
                })
                .catch(e => console.error("Erro ao carregar contador:", e));
        }
    }
}


// Inicializa o carregamento do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', carregarCarrinho);

// Garante que o contador do header é atualizado, mesmo se vier de outra página
document.addEventListener('DOMContentLoaded', () => atualizarContadorCarrinho());
