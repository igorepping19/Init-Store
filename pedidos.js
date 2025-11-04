/* pedidos.js – checkout + integração com login */
const API_PEDIDOS_URL = 'http://localhost:8000/api_pedidos.php';
const AUTH_KEY = 'init_store_user_auth';   // mesma chave usada em conta.js

/* -------------------------------------------------
   1. Preenche user_id a partir do localStorage
   ------------------------------------------------- */
function preencherUserId() {
    const auth = localStorage.getItem(AUTH_KEY);
    if (!auth) {
        mostrarMensagem('Você precisa estar logado para finalizar a compra.', 'erro');
        setTimeout(() => location.href = 'conta.html', 2000);
        return false;
    }

    let user;
    try { user = JSON.parse(auth).usuario; }
    catch (e) { user = null; }

    if (!user || !user.id) {
        mostrarMensagem('Sessão inválida. Faça login novamente.', 'erro');
        setTimeout(() => location.href = 'conta.html', 2000);
        return false;
    }

    document.getElementById('user-id').value = user.id;
    document.getElementById('auth-token').value = user.auth_token; // campo hidden novo
    return true;
}

/* -------------------------------------------------
   2. Mensagens de status (reutiliza estilo da conta)
   ------------------------------------------------- */
function mostrarMensagem(txt, tipo) {
    const el = document.getElementById('checkout-message');
    el.textContent = txt;
    el.className = `message ${tipo}`;
    el.style.display = 'block';
}

/* -------------------------------------------------
   3. Submissão do formulário
   ------------------------------------------------- */
document.getElementById('checkout-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. garante user_id
    if (!preencherUserId()) return;

    const form = e.target;
    const dados = {
        user_id:     form.user_id.value,
        auth_token:  form.auth_token.value,
        endereco:    form.endereco.value.trim(),
        cidade:      form.cidade.value.trim(),
        cep:         form.cep.value.trim(),
        pagamento:   form.pagamento.value
    };

    // Validação mínima no front
    if (!dados.endereco || !dados.cidade || !dados.cep || !dados.pagamento) {
        mostrarMensagem('Preencha todos os campos de entrega e pagamento.', 'erro');
        return;
    }

    try {
        const res = await fetch(API_PEDIDOS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        const result = await res.json();

        if (res.ok && result.status === 'sucesso') {
            mostrarMensagem(`Pedido #${result.pedido_id} criado com sucesso!`, 'sucesso');
            localStorage.removeItem(AUTH_KEY);           // opcional: logout após compra
            setTimeout(() => location.href = 'obrigado.html', 2000);
        } else {
            mostrarMensagem(result.mensagem || 'Erro ao finalizar.', 'erro');
        }
    } catch (err) {
        console.error(err);
        mostrarMensagem('Falha de conexão com o servidor.', 'erro');
    }
});

/* -------------------------------------------------
   4. Carrega resumo do carrinho (reaproveita carrinho.js)
   ------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    preencherUserId();               // tenta preencher logo ao carregar
    // O resumo já é carregado por carrinho.js (incluído no checkout.html)
});