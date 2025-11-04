<?php
require_once 'configDB.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:8000');

try {
    $stmt = $pdo->query("SELECT id, nome, slug FROM categorias ORDER BY nome");
    $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'status' => 'sucesso',
        'dados' => $categorias
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'erro',
        'mensagem' => 'Erro ao carregar categorias: ' . $e->getMessage()
    ]);
}
?>