<?php
// api_carrinho.php
session_start();
header("Content-Type: application/json");
require_once 'db.php';

// Inicializa carrinho na sessão
if (!isset($_SESSION['carrinho'])) {
    $_SESSION['carrinho'] = [];
}

$carrinho = &$_SESSION['carrinho'];
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? null;
    $acao = $input['acao'] ?? 'add';

    if (!$id) {
        echo json_encode(['erro' => 'ID inválido']);
        exit;
    }

    if ($acao === 'add') {
        if (isset($carrinho[$id])) {
            $carrinho[$id]['qtd'] += 1;
        } else {
            $carrinho[$id] = ['id' => $id, 'qtd' => 1];
        }
    } elseif ($acao === 'remove') {
        unset($carrinho[$id]);
    } elseif ($acao === 'update') {
        $qtd = max(1, (int)($input['qtd'] ?? 1));
        $carrinho[$id]['qtd'] = $qtd;
    }

    echo json_encode(['sucesso' => true, 'total_itens' => array_sum(array_column($carrinho, 'qtd'))]);

} elseif ($method === 'GET') {
    echo json_encode(array_values($carrinho));
}
?>