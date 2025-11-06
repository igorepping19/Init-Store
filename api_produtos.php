<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once 'db.php';

$sql = "SELECT id, nome, preco, imagem_url, categoria_slug, destaque FROM produtos WHERE 1=1";
$params = [];

if (isset($_GET['destaque'])) {
    $sql .= " AND destaque = 1";
}
if (isset($_GET['categoria'])) {
    $sql .= " AND categoria_slug = ?";
    $params[] = $_GET['categoria'];
}

$sql .= " ORDER BY id DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);

// ALTERAÇÃO AQUI: envolver em 'dados'
echo json_encode(['dados' => $produtos]);
?>