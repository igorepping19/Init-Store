<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout - Init Store</title>
    <link rel="icon" type="icon" href="icon.png">
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
                        <a href="famosos.php">Mais Vendidos</a>
                    </ul>
                </nav>
                <form action="" method="get" target="_blank">
                    <input type="text" name="q" placeholder="Buscar Produto..." required>
                </form>
                <nav class="carrinho">
                    <a href="carrinho.php">
                        <img src="carrinho.png" alt="Meu Carrinho" style="width: 30px; height: 30px;">
                    </a>
                </nav>
                <nav class="conta">
                    <a href="conta.php">
                        <img src="user.png" alt="Minha Conta" style="width: 30px; height: 30px;">
                    </a>
                </nav>
            </div>
        </div>
    </header>

    <main>
        <div class="container checkout-page">
            <h2 class="title-main">Finalizar Pedido</h2>
            <div class="checkout-grid">
                
                <!-- Coluna 1: Informações de Entrega e Pagamento -->
                <div class="checkout-form-container">
                    
                    <h3>1. Informações de Entrega</h3>
                    <!-- Este formulário será preenchido pelo usuário logado e enviado ao api_pedidos.php -->
                    <form id="checkout-form" class="form-style-1">
                        <!-- O ID do usuário logado será injetado pelo JavaScript -->
                        <input type="hidden" id="user-id" name="user_id" required>
                        <input type="hidden" id="auth-token"  name="auth_token"  required>
                        
                        <label for="nome">Nome Completo:</label>
                        <input type="text" id="nome" name="nome" placeholder="Seu nome completo" required>
                        
                        <label for="email">E-mail:</label>
                        <input type="email" id="email" name="email" placeholder="Seu e-mail cadastrado" disabled>
                        
                        <label for="endereco">Endereço:</label>
                        <input type="text" id="endereco" name="endereco" placeholder="Rua, número e complemento" required>

                        <label for="cidade">Cidade:</label>
                        <input type="text" id="cidade" name="cidade" required>
                        
                        <label for="cep">CEP:</label>
                        <input type="text" id="cep" name="cep" placeholder="00000-000" required>

                        <h3 style="margin-top: 30px;">2. Forma de Pagamento</h3>
                        <select id="pagamento" name="pagamento" required>
                            <option value="">Selecione...</option>
                            <option value="cartao">Cartão de Crédito/Débito</option>
                            <option value="pix">PIX</option>
                            <option value="boleto">Boleto Bancário</option>
                        </select>
                        
                        <!-- Mensagens de Erro/Sucesso -->
                        <div id="checkout-message" class="message" style="display:none; margin-top:15px;"></div>
                        
                        <button type="submit" class="button-primary finalize-btn">
                            Finalizar Pedido
                        </button>
                    </form>
                </div>
                
                <!-- Coluna 2: Resumo do Pedido -->
                <div class="order-summary-container">
                    <h3>3. Resumo da Compra</h3>
                    <div id="checkout-items" class="checkout-items">
                        <!-- Itens do Carrinho serão carregados aqui pelo JS -->
                        <p>Seu carrinho está vazio.</p>
                    </div>

                    <div class="summary-totals">
                        <div class="summary-line">
                            <span>Subtotal:</span>
                            <span id="summary-subtotal">R$ 0,00</span>
                        </div>
                        <div class="summary-line">
                            <span>Frete:</span>
                            <span id="summary-frete">Grátis</span>
                        </div>
                        <div class="summary-total-line">
                            <strong>Total:</strong>
                            <strong id="summary-total">R$ 0,00</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer>
        <div class="container">
            <div class="rodape">
                <div class="contatos">
                    <h4>Entre em Contato</h4>
                    <p>Email: intstore@gmail.com</p>
                </div>
                <div class="direitos">
                    <p>&copy; 2024 Igor Epping. Todos os direitos reservados.</p>
                </div>
            </div>
        </div>
    </footer>
    <script src="carrinho.js"></script>
    <script src="pedidos.js"></script> 
</body>
</html>
