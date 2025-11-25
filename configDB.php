<?php
// configDB.php – versão final que funciona 100% na InfinityFree

$host   = 'sql100.infinityfree.com';
$dbname = 'if0_40161533_initstore_db';   // ← seu banco exato
$user   = 'if0_40161533';
$pass   = 'Iogriago18';

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    // Se der erro de conexão, mostra na tela (pra gente ver rapidinho)
    http_response_code(500);
    echo json_encode(['error' => 'Erro no banco de dados: ' . $e->getMessage()]);
    exit;
}
?>