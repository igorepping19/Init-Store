<?php
// 1. Inclui o arquivo de conexão
require_once 'configDB.php';

// 2. Define o cabeçalho para JSON e CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:8000'); // Ajuste em produção

// 3. Verifica o método HTTP
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        $categoria_slug = $_GET['categoria'] ?? null;

        $sql = "SELECT p.id, p.nome, p.preco, p.imagem_url, c.slug as categoria_slug 
                FROM produtos p 
                LEFT JOIN categorias c ON p.categoria_id = c.id 
                WHERE p.estoque > 0";

        if ($categoria_slug) {
            $sql .= " AND c.slug = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$categoria_slug]);
        } else {
            $sql .= " ORDER BY p.nome ASC";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
        }

        $produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'status' => 'sucesso',
            'dados' => $produtos
        ]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'status' => 'erro',
            'mensagem' => 'Erro ao buscar produtos: ' . $e->getMessage()
        ]);
    }

} else {
    http_response_code(405);
    echo json_encode([
        'status' => 'erro',
        'mensagem' => 'Método não permitido. Use GET.'
    ]);
}
?>