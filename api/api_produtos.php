<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Desabilita exibição de erros pra não quebrar o JSON
error_reporting(0);
ini_set('display_errors', 0);

require_once '../configDB.php';

// Agora a variável correta é $db (não $pdo)
global $db;

$where  = " WHERE 1=1";
$params = [];

if (isset($_GET['destaque']) && $_GET['destaque'] == 1) {
    $where .= " AND p.destaque = 1";
}

if (isset($_GET['categoria'])) {
    $slug = trim($_GET['categoria']);
    $stmt = $db->prepare("SELECT id FROM categorias WHERE slug = ?");
    $stmt->execute([$slug]);
    $cat = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$cat) {
        echo json_encode(['dados' => []]);
        exit;
    }
    $where .= " AND p.categoria_id = ?";
    $params[] = $cat['id'];
}

$sql = "SELECT
            p.id,
            p.nome,
            p.preco,
            p.imagem_url,
            c.slug AS categoria_slug,
            p.destaque
        FROM produtos p
        JOIN categorias c ON p.categoria_id = c.id
        $where
        ORDER BY p.id DESC";

$stmt = $db->prepare($sql);
$stmt->execute($params);
$produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['dados' => $produtos]);
?>