<?php
// api_categorias.php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once 'db.php';

try {
    $stmt = $pdo->query("SELECT id, nome, slug FROM categorias ORDER BY nome");
    $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC); // ARRAY DE OBJETOS
    echo json_encode($categorias);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao carregar categorias']);
}
?>