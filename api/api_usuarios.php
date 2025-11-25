<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
error_reporting(0);
ini_set('display_errors', 0);

require_once '../configDB.php';
global $db;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'erro', 'mensagem' => 'Método não permitido']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['action'])) {
    http_response_code(400);
    echo json_encode(['status' => 'erro', 'mensagem' => 'Ação não especificada']);
    exit;
}

try {
    if ($data['action'] === 'register') {
        if (empty($data['nome']) || empty($data['email']) || empty($data['senha'])) {
            echo json_encode(['status' => 'erro', 'mensagem' => 'Todos os campos são obrigatórios']);
            exit;
        }

        $nome  = htmlspecialchars(trim($data['nome']));
        $email = htmlspecialchars(trim($data['email']));
        $senha = password_hash($data['senha'], PASSWORD_DEFAULT);

        $check = $db->prepare("SELECT COUNT(*) FROM usuarios users WHERE email = ?");
        $check->execute([$email]);
        if ($check->fetchColumn() > 0) {
            echo json_encode(['status' => 'erro', 'mensagem' => 'Email já cadastrado']);
            exit;
        }

        $stmt = $db->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
        $stmt->execute([$nome, $email, $senha]);

        echo json_encode(['status' => 'sucesso', 'mensagem' => 'Cadastro realizado com sucesso!']);

    } elseif ($data['action'] === 'login') {
        if (empty($data['email']) || empty($data['senha'])) {
            echo json_encode(['status' => 'erro', 'mensagem' => 'Email e senha obrigatórios']);
            exit;
        }

        $email = htmlspecialchars(trim($data['email']));
        $stmt = $db->prepare("SELECT id, nome, senha FROM usuarios WHERE email = ?");
        $stmt->execute([$email]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($data['senha'], $usuario['senha'])) {
            echo json_encode([
                'status' => 'sucesso',
                'mensagem' => 'Login realizado com sucesso!',
                'usuario' => [
                    'id' => $usuario['id'],
                    'nome' => $usuario['nome'],
                    'auth_token' => 'USER_LOGGED_IN_' . $usuario['id']
                ]
            ]);
        } else {
            echo json_encode(['status' => 'erro', 'mensagem' => 'Email ou senha incorretos']);
        }
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'erro', 'mensagem' => 'Erro interno do servidor']);
}
?>