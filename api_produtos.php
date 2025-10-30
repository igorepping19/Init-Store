<?php
// 1. Inclui o arquivo de conexão
require_once 'configDB.php';

// 2. Define o cabeçalho para indicar que a resposta será JSON
header('Content-Type: application/json');

// Opcional, mas altamente recomendado para desenvolvimento Frontend/Backend
// Isso permite que o seu JavaScript puro (em outro domínio ou porta) acesse a API
header('Access-Control-Allow-Origin: http://localhost:8000'); // Mude * para o domínio do seu Frontend em produção

// 3. Verifica o método HTTP (para uma API RESTful)
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // 4. Lógica para listar todos os produtos
    try {
        // Prepara a consulta SQL
        $stmt = $pdo->prepare("SELECT id, nome, preco, imagem_url FROM produtos WHERE estoque > 0 ORDER BY nome ASC");
        
        // Executa a consulta
        $stmt->execute();
        
        // Obtém todos os resultados como um array associativo
        $produtos = $stmt->fetchAll();
        
        // 5. Retorna o array de produtos como JSON e termina o script
        echo json_encode([
            'status' => 'sucesso',
            'dados' => $produtos
        ]);
        
    } catch (PDOException $e) {
        // Em caso de erro na consulta, retorna uma resposta de erro JSON
        http_response_code(500); // Internal Server Error
        echo json_encode([
            'status' => 'erro',
            'mensagem' => 'Erro ao buscar produtos: ' . $e->getMessage()
        ]);
    }

} else {
    // Se o método HTTP não for GET (nesta API simples)
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        'status' => 'erro',
        'mensagem' => 'Método não permitido.'
    ]);
}
?>