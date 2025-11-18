<?php
// 1. Inclui o arquivo de conexão e as configurações básicas
require_once '../configDB.php';

// Define o cabeçalho para indicar que a resposta será JSON
header('Content-Type: application/json');
// Permite que qualquer origem (seu frontend) acesse esta API durante o desenvolvimento
header('Access-Control-Allow-Origin: *'); 
// Permite os métodos HTTP que usaremos
header('Access-Control-Allow-Methods: POST'); 
header('Access-Control-Allow-Headers: Content-Type');

// Verifica se o método HTTP é POST, que é usado tanto para Login quanto para Cadastro
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Método Não Permitido
    echo json_encode(['status' => 'erro', 'mensagem' => 'Método não suportado.']);
    exit;
}

// 2. Recebe os dados brutos da requisição POST (JSON)
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['action'])) {
    http_response_code(400);
    echo json_encode(['status' => 'erro', 'mensagem' => 'Ação (action) não especificada.']);
    exit;
}

$action = $data['action'];

try {
    // ------------------------------------
    // LÓGICA DE CADASTRO (REGISTRO)
    // ------------------------------------
    if ($action === 'register') {
        if (empty($data['nome']) || empty($data['email']) || empty($data['senha'])) {
            http_response_code(400);
            echo json_encode(['status' => 'erro', 'mensagem' => 'Todos os campos (nome, email, senha) são obrigatórios.']);
            exit;
        }

        $nome = htmlspecialchars($data['nome']);
        $email = htmlspecialchars($data['email']);
        $senha = $data['senha'];

        // Criptografa a senha antes de salvar no banco de dados
        $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

        // Verifica se o email já existe
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM usuarios WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        if ($stmt->fetchColumn() > 0) {
            http_response_code(409); // Conflito
            echo json_encode(['status' => 'erro', 'mensagem' => 'Este email já está cadastrado.']);
            exit;
        }

        // Insere o novo usuário no banco de dados
        $stmt = $pdo->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (:nome, :email, :senha)");
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':senha', $senha_hash);
        $stmt->execute();

        http_response_code(201); // Criado
        echo json_encode(['status' => 'sucesso', 'mensagem' => 'Usuário cadastrado com sucesso!']);
        
    // ------------------------------------
    // LÓGICA DE LOGIN (AUTENTICAÇÃO)
    // ------------------------------------
    } elseif ($action === 'login') {
        if (empty($data['email']) || empty($data['senha'])) {
            http_response_code(400);
            echo json_encode(['status' => 'erro', 'mensagem' => 'Email e senha são obrigatórios.']);
            exit;
        }

        $email = htmlspecialchars($data['email']);
        $senha = $data['senha'];

        // Busca o usuário no banco de dados pelo email
        $stmt = $pdo->prepare("SELECT id, nome, senha FROM usuarios WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $usuario = $stmt->fetch();

        if ($usuario && password_verify($senha, $usuario['senha'])) {
            // Login bem-sucedido
            http_response_code(200);
            
            // Aqui, em um projeto real, você geraria e retornaria um JWT (JSON Web Token)
            // Por simplicidade, vamos retornar informações básicas e uma 'chave' de login
            echo json_encode([
                'status' => 'sucesso',
                'mensagem' => 'Login realizado com sucesso!',
                'usuario' => [
                    'id' => $usuario['id'],
                    'nome' => $usuario['nome'],
                    // Em produção, NUNCA retorne a senha ou hash!
                    'auth_token' => 'USER_LOGGED_IN_' . $usuario['id'] 
                ]
            ]);
        } else {
            // Falha na autenticação
            http_response_code(401); // Não Autorizado
            echo json_encode(['status' => 'erro', 'mensagem' => 'Email ou senha inválidos.']);
        }

    } else {
        http_response_code(400);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Ação desconhecida.']);
    }

} catch (PDOException $e) {
    // Erro genérico no banco de dados
    http_response_code(500);
    echo json_encode(['status' => 'erro', 'mensagem' => 'Erro interno do servidor: ' . $e->getMessage()]);
}

?>