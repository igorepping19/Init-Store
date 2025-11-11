<?php
// famosos.php - VERSÃO CORRIGIDA E FUNCIONAL (10/11/2025)

header('Content-Type: application/json');
require_once 'db.php';

try {
    // 1. Verifica se a coluna 'destaque' existe
    $stmt = $pdo->query("SHOW COLUMNS FROM produtos LIKE 'destaque'");
    $colunaExiste = $stmt->rowCount() > 0;

    // 2. Monta a query correta
    if ($colunaExiste) {
        $sql = "SELECT id, nome, preco, imagem_url FROM produtos WHERE destaque = 1 ORDER BY id DESC LIMIT 12";
    } else {
        // Se não tiver coluna destaque, pega os últimos 12 produtos
        $sql = "SELECT id, nome, preco, imagem_url FROM produtos ORDER BY id DESC LIMIT 12";
    }

    $stmt = $pdo->query($sql);
    $produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 3. Garante que os campos existem
    foreach ($produtos as &$p) {
        $p['nome'] = $p['nome'] ?? 'Produto sem nome';
        $p['preco'] = $p['preco'] ?? 0;
        $p['imagem_url'] = $p['imagem_url'] ?? 'https://placehold.co/300x200?text=Sem+Imagem';
    }

    echo json_encode(['dados' => $produtos]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'erro' => 'Erro no servidor',
        'mensagem' => $e->getMessage()
    ]);
}
?>