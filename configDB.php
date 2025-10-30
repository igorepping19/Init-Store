<?php
// Configurações do Banco de Dados
$host = '127.0.0.1'; // Seu host do MySQL
$dbname = 'init_store'; // Nome do seu banco de dados
$user = 'root'; // Seu usuário do MySQL
$password = ''; // Sua senha do MySQL
$url = 'http://localhost:8000';

try {
    // Cria uma nova instância de PDO para a conexão
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    
    // Define o modo de erro para Exceptions, o que é útil para depuração
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Opcional: define o modo de fetch padrão para que os resultados sejam arrays associativos
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // echo "Conexão estabelecida com sucesso!"; // Remova em produção
    
} catch (PDOException $e) {
    // Em caso de erro, exibe a mensagem de erro e interrompe a execução
    die("Erro na conexão com o banco de dados: " . $e->getMessage());
}
?>