// assets/js/ai-agent.js
// Simulação de IA para custo zero (pode conectar API depois)

const responses = {
    'preço': 'Nossas diárias começam a partir de R$ 150,00 no quarto Standard.',
    'pix': 'Aceitamos Pix! A chave é o CNPJ do hotel.',
    'check-in': 'O check-in é a partir das 14h e o check-out até 12h.',
    'default': 'Olá! Sou a IA do Manzuá. Posso ajudar com reservas e preços.'
};

export function sendMessage() {
    const input = document.getElementById('chatInput');
    const msg = input.value.toLowerCase();
    if (!msg) return;

    addMessage(input.value, 'user');
    input.value = '';

    // Simula "digitando..."
    setTimeout(() => {
        let reply = responses.default;
        if (msg.includes('preço') || msg.includes('valor')) reply = responses['preço'];
        if (msg.includes('pix') || msg.includes('pagar')) reply = responses['pix'];
        
        addMessage(reply, 'bot');
    }, 1000);
}

function addMessage(text, type) {
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.innerText = text;
    document.getElementById('chatMessages').appendChild(div);
    // Auto scroll
    const container = document.getElementById('chatMessages');
    container.scrollTop = container.scrollHeight;
}