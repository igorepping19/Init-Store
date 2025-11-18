<?php
// api_carrinho.php
session_start();
header("Content-Type: application/json; charset=utf-8");
require_once '../configDB.php';  // Ajuste o caminho se necessário

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

    if (!$id || !is_numeric($id)) {
        echo json_encode(['status' => 'erro', 'mensagem' => 'ID inválido']);
        exit;
    }

    $id = (string)$id; // garante que seja string

    if ($acao === 'add') {
        $carrinho[$id] = ($carrinho[$id] ?? 0) + 1;
    } elseif ($acao === 'remove') {
        unset($carrinho[$id]);
    } elseif ($acao === 'update' && isset($input['qtd'])) {
        $qtd = max(1, (int)$input['qtd']);
        $carrinho[$id] = $qtd;
    }

    echo json_encode([
        'status' => 'sucesso',
        'carrinho' => $carrinho,
        'total_itens' => array_sum($carrinho)
    ]);

} elseif ($method === 'GET') {
    echo json_encode([
        'status' => 'sucesso',
        'carrinho' => $carrinho
    ]);

} elseif ($method === 'DELETE') {
    if (empty($_GET['id'] ?? '')) {
        // Esvaziar carrinho completo
        $_SESSION['carrinho'] = [];
        $carrinho = [];
    } else {
        $id = (string)($_GET['id'] ?? '');
        unset($carrinho[$id]);
    }

    echo json_encode([
        'status' => 'sucesso',
        'carrinho' => $carrinho
    ]);

} else {
    http_response_code(405);
    echo json_encode(['status' => 'erro', 'mensagem' => 'Método não permitido']);
}
?>