<?php
// Inicia a sessão. É essencial que isso seja a primeira coisa no script.
session_start();

// Define o cabeçalho para indicar que a resposta será JSON
header('Content-Type: application/json');

// Permite acesso de outras portas/domínios (CORS)
header('Access-Control-Allow-Origin: *'); // Altere * para o seu domínio em produção
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Se o método for OPTIONS, apenas retorna OK (necessário para pré-voo CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Inicializa o carrinho na sessão se ainda não existir
if (!isset($_SESSION['carrinho'])) {
    $_SESSION['carrinho'] = []; // Formato: ['produto_id' => quantidade]
}

$method = $_SERVER['REQUEST_METHOD'];

// Função auxiliar para retornar JSON
function retornarResposta($status, $mensagem, $carrinho = null) {
    if ($carrinho === null) {
        $carrinho = $_SESSION['carrinho'];
    }
    echo json_encode([
        'status' => $status,
        'mensagem' => $mensagem,
        'carrinho' => $carrinho
    ]);
    exit;
}

// ----------------------------------------------------
// GET: Listar o conteúdo do carrinho
// ----------------------------------------------------
if ($method === 'GET') {
    retornarResposta('sucesso', 'Conteúdo do carrinho listado.', $_SESSION['carrinho']);
}

// ----------------------------------------------------
// POST: Adicionar um produto ao carrinho
// O carrinho.js chama isso quando o usuário clica em "Adicionar ao Carrinho"
// ----------------------------------------------------
if ($method === 'POST') {
    // Lê o corpo da requisição JSON (espera-se: { "id": 123 })
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    if (empty($data) || !isset($data['id'])) {
        http_response_code(400);
        retornarResposta('erro', 'ID do produto não fornecido.');
    }

    $produto_id = (string)$data['id']; // Garante que seja string para usar como chave

    // Adiciona ou incrementa a quantidade
    if (isset($_SESSION['carrinho'][$produto_id])) {
        // Incrementa a quantidade
        $_SESSION['carrinho'][$produto_id]++; 
    } else {
        // Adiciona o produto pela primeira vez
        $_SESSION['carrinho'][$produto_id] = 1; 
    }

    retornarResposta('sucesso', "Produto {$produto_id} adicionado/incrementado ao carrinho.", $_SESSION['carrinho']);
}

// ----------------------------------------------------
// DELETE: Remover um produto ou esvaziar o carrinho
// O carrinho.js chama isso ao clicar em 'X' ou 'Esvaziar Carrinho'
// ----------------------------------------------------
if ($method === 'DELETE') {
    // DELETE pode vir com um corpo JSON para remover um item específico.
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    if (!empty($data) && isset($data['id'])) {
        // 1. Remover item específico
        $produto_id = (string)$data['id'];

        if (isset($_SESSION['carrinho'][$produto_id])) {
            // Remove o ID do array de carrinho
            unset($_SESSION['carrinho'][$produto_id]);
            retornarResposta('sucesso', "Produto {$produto_id} removido do carrinho.", $_SESSION['carrinho']);
        } else {
            http_response_code(404);
            retornarResposta('erro', 'Produto não encontrado no carrinho.');
        }

    } else {
        // 2. Esvaziar todo o carrinho (chamado pelo botão 'Esvaziar Carrinho')
        $_SESSION['carrinho'] = [];
        retornarResposta('sucesso', 'Carrinho esvaziado com sucesso.', $_SESSION['carrinho']);
    }
}

// ----------------------------------------------------
// Método não suportado
// ----------------------------------------------------
http_response_code(405); // Method Not Allowed
retornarResposta('erro', 'Método HTTP não permitido.');

?>
