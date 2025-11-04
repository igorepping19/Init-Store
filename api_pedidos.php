<?php
session_start();
require_once 'configDB.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status'=>'erro','mensagem'=>'Use POST']);
    exit;
}

/* ---------- 1. Lê JSON ---------- */
$json = file_get_contents('php://input');
$data = json_decode($json, true);

/* ---------- 2. Validação básica ---------- */
$required = ['user_id','auth_token','endereco','pagamento'];
foreach ($required as $k) {
    if (empty($data[$k])) {
        http_response_code(400);
        echo json_encode(['status'=>'erro','mensagem'=>"Campo $k obrigatório."]);
        exit;
    }
}

/* ---------- 3. Verifica token ---------- */
$expected_token = 'USER_LOGGED_IN_' . $data['user_id'];   // mesmo padrão do login
if ($data['auth_token'] !== $expected_token) {
    http_response_code(401);
    echo json_encode(['status'=>'erro','mensagem'=>'Token de autenticação inválido.']);
    exit;
}

/* ---------- 4. Dados seguros ---------- */
$user_id   = (int)$data['user_id'];
$endereco  = htmlspecialchars($data['endereco']);
$cidade    = htmlspecialchars($data['cidade'] ?? '');
$cep       = htmlspecialchars($data['cep'] ?? '');
$pagamento = htmlspecialchars($data['pagamento']);

/* ---------- 5. Carrinho ---------- */
$carrinho = $_SESSION['carrinho'] ?? [];
if (empty($carrinho)) {
    http_response_code(400);
    echo json_encode(['status'=>'erro','mensagem'=>'Carrinho vazio.']);
    exit;
}

/* ---------- 6. Transação ---------- */
try {
    $pdo->beginTransaction();

    /* ---- cálculo total + detalhes ---- */
    $total_pedido = 0;
    $detalhes = [];   // id => ['quantidade'=> , 'preco'=> ]

    $stmtProd = $pdo->prepare("SELECT id, preco, estoque FROM produtos WHERE id = ?");
    foreach ($carrinho as $prod_id => $qtd) {
        $stmtProd->execute([$prod_id]);
        $p = $stmtProd->fetch();
        if (!$p) throw new Exception("Produto $prod_id não encontrado.");

        $qtd = (int)$qtd;
        if ($qtd <= 0) continue;

        // ---- baixa de estoque (agora IMPLEMENTADA) ----
        if ($p['estoque'] < $qtd) {
            throw new Exception("Estoque insuficiente para produto ID $prod_id.");
        }
        $pdo->prepare("UPDATE produtos SET estoque = estoque - ? WHERE id = ?")
            ->execute([$qtd, $prod_id]);

        $sub = $p['preco'] * $qtd;
        $total_pedido += $sub;
        $detalhes[$prod_id] = ['quantidade'=>$qtd, 'preco'=>$p['preco']];
    }

    /* ---- inserção do pedido ---- */
    $sqlPedido = "INSERT INTO pedidos 
                  (usuario_id, data_pedido, total, endereco, cidade, cep, forma_pagamento, status)
                  VALUES (?, NOW(), ?, ?, ?, ?, ?, 'Pendente')";
    $stmtPedido = $pdo->prepare($sqlPedido);
    $stmtPedido->execute([$user_id, $total_pedido, $endereco, $cidade, $cep, $pagamento]);
    $pedido_id = $pdo->lastInsertId();

    /* ---- itens do pedido ---- */
    $sqlItem = "INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario)
                VALUES (?,?,?,?)";
    $stmtItem = $pdo->prepare($sqlItem);
    foreach ($detalhes as $pid => $i) {
        $stmtItem->execute([$pedido_id, $pid, $i['quantidade'], $i['preco']]);
    }

    $pdo->commit();

    /* ---- limpa carrinho ---- */
    unset($_SESSION['carrinho']);

    echo json_encode([
        'status' => 'sucesso',
        'mensagem' => "Pedido #$pedido_id criado!",
        'pedido_id' => $pedido_id
    ]);

} catch (Exception $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['status'=>'erro','mensagem'=>$e->getMessage()]);
}
?>